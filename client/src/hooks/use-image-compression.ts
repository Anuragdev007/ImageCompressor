import { useState, useCallback } from 'react';
import { UploadedFile, CompressionSettings, SessionStats } from '@shared/schema';
import { compressImage, createImagePreview, formatFileSize, calculateSavings, isJpegFile } from '@/lib/image-utils';
import { calculateQualityMetrics } from '@/lib/quality-assessment';
import { useBatchProcessor } from '@/hooks/use-batch-processor';
import { useToast } from '@/hooks/use-toast';

export function useImageCompression() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [settings, setSettings] = useState<CompressionSettings>({
    quality: 80,
    outputFormat: 'jpeg',
  });
  const [stats, setStats] = useState<SessionStats>({
    totalFiles: 0,
    processedFiles: 0,
    totalSaved: 0,
    averageReduction: 0,
  });
  const { toast } = useToast();
  const batchProcessor = useBatchProcessor();

  const addFiles = useCallback(async (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      if (!isJpegFile(file)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a JPEG file.`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const uploadedFiles: UploadedFile[] = await Promise.all(
      validFiles.map(async (file) => {
        const previewUrl = await createImagePreview(file);
        return {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          originalSize: file.size,
          quality: settings.quality,
          progress: 0,
          status: 'pending' as const,
          originalBlob: file,
          previewUrl,
        };
      })
    );

    setFiles(prev => [...prev, ...uploadedFiles]);
    setStats(prev => ({
      ...prev,
      totalFiles: prev.totalFiles + uploadedFiles.length,
    }));
  }, [settings.quality, toast]);

  const compressFile = useCallback(async (fileId: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'processing' as const, progress: 0 } : f
    ));

    try {
      const file = files.find(f => f.id === fileId);
      if (!file) return;

      const compressedBlob = await compressImage(
        file.originalBlob,
        settings,
        (progress) => {
          setFiles(prev => prev.map(f => 
            f.id === fileId ? { ...f, progress } : f
          ));
        }
      );

      setFiles(prev => prev.map(f => {
        if (f.id === fileId) {
          const qualityMetrics = calculateQualityMetrics(
            f.originalSize,
            compressedBlob.size,
            settings.quality
          );
          
          const updated = {
            ...f,
            compressedBlob,
            compressedSize: compressedBlob.size,
            status: 'complete' as const,
            progress: 100,
            qualityMetrics,
          };
          return updated;
        }
        return f;
      }));

      // Update stats
      setStats(prev => {
        const newProcessed = prev.processedFiles + 1;
        const newSaved = prev.totalSaved + (file.originalSize - compressedBlob.size);
        const avgReduction = files.reduce((acc, f) => {
          if (f.compressedSize) {
            return acc + calculateSavings(f.originalSize, f.compressedSize);
          }
          return acc;
        }, calculateSavings(file.originalSize, compressedBlob.size)) / newProcessed;

        return {
          ...prev,
          processedFiles: newProcessed,
          totalSaved: newSaved,
          averageReduction: Math.round(avgReduction),
        };
      });

    } catch (error) {
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { 
          ...f, 
          status: 'error' as const, 
          error: error instanceof Error ? error.message : 'Compression failed' 
        } : f
      ));
      
      toast({
        title: "Compression failed",
        description: `Failed to compress ${files.find(f => f.id === fileId)?.name}`,
        variant: "destructive",
      });
    }
  }, [files, settings, toast]);

  const compressAllFiles = useCallback(async () => {
    const pendingFiles = files.filter(f => f.status === 'pending');
    if (pendingFiles.length === 0) return;
    
    await batchProcessor.processBatch(
      pendingFiles.map(f => f.id),
      compressFile
    );
  }, [files, compressFile, batchProcessor]);

  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
        setStats(prevStats => ({
          ...prevStats,
          totalFiles: prevStats.totalFiles - 1,
          processedFiles: fileToRemove.status === 'complete' ? prevStats.processedFiles - 1 : prevStats.processedFiles,
        }));
      }
      return prev.filter(f => f.id !== fileId);
    });
  }, []);

  const clearAllFiles = useCallback(() => {
    files.forEach(file => URL.revokeObjectURL(file.previewUrl));
    setFiles([]);
    setStats({
      totalFiles: 0,
      processedFiles: 0,
      totalSaved: 0,
      averageReduction: 0,
    });
  }, [files]);

  const updateSettings = useCallback((newSettings: Partial<CompressionSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  return {
    files,
    settings,
    stats,
    addFiles,
    compressFile,
    compressAllFiles,
    removeFile,
    clearAllFiles,
    updateSettings,
    batchProcessor,
  };
}
