import { useState, useCallback, useRef } from 'react';
import { UploadedFile } from '@shared/schema';

interface QueueItem {
  fileId: string;
  priority: 'high' | 'normal' | 'low';
  retryCount: number;
  maxRetries: number;
}

interface BatchQueueState {
  queue: QueueItem[];
  processing: Set<string>;
  completed: Set<string>;
  failed: Set<string>;
  isRunning: boolean;
  concurrency: number;
}

export function useBatchQueue() {
  const [state, setState] = useState<BatchQueueState>({
    queue: [],
    processing: new Set(),
    completed: new Set(),
    failed: new Set(),
    isRunning: false,
    concurrency: 3, // Process 3 files simultaneously
  });

  const processingRef = useRef<Set<string>>(new Set());
  const abortControllerRef = useRef<AbortController | null>(null);

  const addToQueue = useCallback((fileIds: string[], priority: 'high' | 'normal' | 'low' = 'normal') => {
    setState(prev => ({
      ...prev,
      queue: [
        ...prev.queue,
        ...fileIds.map(fileId => ({
          fileId,
          priority,
          retryCount: 0,
          maxRetries: 2,
        }))
      ].sort((a, b) => {
        const priorityOrder = { high: 3, normal: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      })
    }));
  }, []);

  const removeFromQueue = useCallback((fileId: string) => {
    setState(prev => {
      const newProcessing = new Set(prev.processing);
      newProcessing.delete(fileId);
      const newCompleted = new Set(prev.completed);
      newCompleted.delete(fileId);
      const newFailed = new Set(prev.failed);
      newFailed.delete(fileId);
      
      return {
        ...prev,
        queue: prev.queue.filter(item => item.fileId !== fileId),
        processing: newProcessing,
        completed: newCompleted,
        failed: newFailed,
      };
    });
  }, []);

  const retryFailed = useCallback((fileId: string) => {
    setState(prev => {
      const failedItem = prev.queue.find(item => item.fileId === fileId);
      if (!failedItem) return prev;

      const newFailed = new Set(prev.failed);
      newFailed.delete(fileId);

      return {
        ...prev,
        queue: prev.queue.map(item => 
          item.fileId === fileId 
            ? { ...item, retryCount: 0 }
            : item
        ),
        failed: newFailed,
      };
    });
  }, []);

  const processNext = useCallback(async (
    compressFunction: (fileId: string) => Promise<void>
  ) => {
    if (processingRef.current.size >= state.concurrency) return;
    
    const nextItem = state.queue.find(item => 
      !state.processing.has(item.fileId) && 
      !state.completed.has(item.fileId) &&
      !state.failed.has(item.fileId)
    );

    if (!nextItem) return;

    processingRef.current.add(nextItem.fileId);
    setState(prev => ({
      ...prev,
      processing: new Set([...prev.processing, nextItem.fileId])
    }));

    try {
      await compressFunction(nextItem.fileId);
      
      setState(prev => {
        const newProcessing = new Set(prev.processing);
        newProcessing.delete(nextItem.fileId);
        
        return {
          ...prev,
          processing: newProcessing,
          completed: new Set([...prev.completed, nextItem.fileId])
        };
      });
      
    } catch (error) {
      setState(prev => {
        const newProcessing = new Set(prev.processing);
        newProcessing.delete(nextItem.fileId);
        
        const shouldRetry = nextItem.retryCount < nextItem.maxRetries;
        
        if (shouldRetry) {
          return {
            ...prev,
            processing: newProcessing,
            queue: prev.queue.map(item => 
              item.fileId === nextItem.fileId 
                ? { ...item, retryCount: item.retryCount + 1 }
                : item
            )
          };
        } else {
          return {
            ...prev,
            processing: newProcessing,
            failed: new Set([...prev.failed, nextItem.fileId])
          };
        }
      });
    } finally {
      processingRef.current.delete(nextItem.fileId);
    }
  }, [state.concurrency, state.queue, state.processing, state.completed, state.failed]);

  const startBatch = useCallback(async (
    compressFunction: (fileId: string) => Promise<void>
  ) => {
    setState(prev => ({ ...prev, isRunning: true }));
    abortControllerRef.current = new AbortController();

    const processQueue = async () => {
      while (
        state.isRunning && 
        (state.queue.length > 0) &&
        !abortControllerRef.current?.signal.aborted
      ) {
        const promises = [];
        
        for (let i = 0; i < state.concurrency; i++) {
          promises.push(processNext(compressFunction));
        }
        
        await Promise.all(promises);
        
        // Small delay to prevent overwhelming the system
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      setState(prev => ({ ...prev, isRunning: false }));
    };

    await processQueue();
  }, [state.isRunning, state.queue.length, state.concurrency, processNext]);

  const pauseBatch = useCallback(() => {
    setState(prev => ({ ...prev, isRunning: false }));
    abortControllerRef.current?.abort();
  }, []);

  const clearQueue = useCallback(() => {
    setState({
      queue: [],
      processing: new Set(),
      completed: new Set(),
      failed: new Set(),
      isRunning: false,
      concurrency: 3,
    });
    processingRef.current.clear();
    abortControllerRef.current?.abort();
  }, []);

  const setConcurrency = useCallback((concurrency: number) => {
    setState(prev => ({ ...prev, concurrency: Math.max(1, Math.min(concurrency, 6)) }));
  }, []);

  const getQueueStats = useCallback(() => {
    const pending = state.queue.filter(item => 
      !state.processing.has(item.fileId) && 
      !state.completed.has(item.fileId) &&
      !state.failed.has(item.fileId)
    ).length;

    return {
      pending,
      processing: state.processing.size,
      completed: state.completed.size,
      failed: state.failed.size,
      total: state.queue.length,
      progress: state.queue.length > 0 ? (state.completed.size / state.queue.length) * 100 : 0
    };
  }, [state]);

  return {
    ...state,
    addToQueue,
    removeFromQueue,
    retryFailed,
    startBatch,
    pauseBatch,
    clearQueue,
    setConcurrency,
    getQueueStats,
  };
}