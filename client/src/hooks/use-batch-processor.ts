import { useState, useCallback, useRef } from 'react';

interface BatchProcessorState {
  processing: string[];
  completed: string[];
  failed: string[];
  isRunning: boolean;
  concurrency: number;
}

export function useBatchProcessor() {
  const [state, setState] = useState<BatchProcessorState>({
    processing: [],
    completed: [],
    failed: [],
    isRunning: false,
    concurrency: 3,
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const activeProcesses = useRef<Set<string>>(new Set());

  const processBatch = useCallback(async (
    fileIds: string[],
    compressFunction: (fileId: string) => Promise<void>
  ) => {
    if (fileIds.length === 0) return;

    setState(prev => ({ ...prev, isRunning: true, processing: [], completed: [], failed: [] }));
    abortControllerRef.current = new AbortController();

    const queue = [...fileIds];
    let processedCount = 0;

    const processFile = async (fileId: string) => {
      if (abortControllerRef.current?.signal.aborted) return;

      setState(prev => ({
        ...prev,
        processing: [...prev.processing.filter(id => id !== fileId), fileId]
      }));

      try {
        await compressFunction(fileId);
        setState(prev => ({
          ...prev,
          processing: prev.processing.filter(id => id !== fileId),
          completed: [...prev.completed, fileId]
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          processing: prev.processing.filter(id => id !== fileId),
          failed: [...prev.failed, fileId]
        }));
      }

      activeProcesses.current.delete(fileId);
      processedCount++;
    };

    // Process files with concurrency limit
    while (queue.length > 0 || activeProcesses.current.size > 0) {
      if (abortControllerRef.current?.signal.aborted) break;

      // Start new processes up to concurrency limit
      while (queue.length > 0 && activeProcesses.current.size < state.concurrency) {
        const fileId = queue.shift()!;
        activeProcesses.current.add(fileId);
        processFile(fileId);
      }

      // Wait a bit before checking again
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setState(prev => ({ ...prev, isRunning: false }));
  }, [state.concurrency]);

  const stopBatch = useCallback(() => {
    abortControllerRef.current?.abort();
    setState(prev => ({ ...prev, isRunning: false }));
    activeProcesses.current.clear();
  }, []);

  const retryFailed = useCallback(async (compressFunction: (fileId: string) => Promise<void>) => {
    const failedIds = [...state.failed];
    setState(prev => ({ ...prev, failed: [] }));
    await processBatch(failedIds, compressFunction);
  }, [state.failed, processBatch]);

  const setConcurrency = useCallback((concurrency: number) => {
    setState(prev => ({ ...prev, concurrency: Math.max(1, Math.min(concurrency, 6)) }));
  }, []);

  const getStats = useCallback(() => {
    const total = state.processing.length + state.completed.length + state.failed.length;
    return {
      pending: state.processing.length,
      processing: activeProcesses.current.size,
      completed: state.completed.length,
      failed: state.failed.length,
      total,
      progress: total > 0 ? (state.completed.length / total) * 100 : 0
    };
  }, [state]);

  const reset = useCallback(() => {
    stopBatch();
    setState({
      processing: [],
      completed: [],
      failed: [],
      isRunning: false,
      concurrency: 3,
    });
  }, [stopBatch]);

  return {
    ...state,
    processBatch,
    stopBatch,
    retryFailed,
    setConcurrency,
    getStats,
    reset,
  };
}