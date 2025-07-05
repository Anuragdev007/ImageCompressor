export interface CompressionOptions {
  quality: number;
  resizeWidth?: number;
  outputFormat: 'jpeg' | 'webp';
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function calculateSavings(originalSize: number, compressedSize: number): number {
  if (originalSize === 0) return 0;
  return Math.round(((originalSize - compressedSize) / originalSize) * 100);
}

export function isJpegFile(file: File): boolean {
  return file.type === 'image/jpeg' || file.type === 'image/jpg' || 
         file.name.toLowerCase().endsWith('.jpg') || 
         file.name.toLowerCase().endsWith('.jpeg');
}

export function createImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function compressImage(
  file: File, 
  options: CompressionOptions,
  onProgress?: (progress: number) => void
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      try {
        onProgress?.(25);
        
        let { width, height } = img;
        
        // Resize if specified
        if (options.resizeWidth && width > options.resizeWidth) {
          const ratio = options.resizeWidth / width;
          width = options.resizeWidth;
          height = height * ratio;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        onProgress?.(50);
        
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);
        
        onProgress?.(75);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              onProgress?.(100);
              resolve(blob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          options.outputFormat === 'webp' ? 'image/webp' : 'image/jpeg',
          options.quality / 100
        );
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadMultipleFiles(files: { blob: Blob; filename: string }[]): void {
  files.forEach(({ blob, filename }) => {
    downloadBlob(blob, filename);
  });
}
