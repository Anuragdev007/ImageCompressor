import { downloadBlob } from './image-utils';

export interface ConversionOptions {
  quality?: number;
  width?: number;
  height?: number;
  maintainAspectRatio?: boolean;
}

export async function convertImageFormat(
  file: File, 
  targetFormat: 'jpeg' | 'png' | 'webp', 
  options: ConversionOptions = {}
): Promise<Blob> {
  const {
    quality = 0.9,
    width,
    height,
    maintainAspectRatio = true
  } = options;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      try {
        let newWidth = width || img.width;
        let newHeight = height || img.height;

        // Maintain aspect ratio if requested
        if (maintainAspectRatio && (width || height)) {
          const aspectRatio = img.width / img.height;
          
          if (width && !height) {
            newHeight = width / aspectRatio;
          } else if (height && !width) {
            newWidth = height * aspectRatio;
          } else if (width && height) {
            // Fit within bounds while maintaining aspect ratio
            const targetRatio = width / height;
            if (aspectRatio > targetRatio) {
              newHeight = width / aspectRatio;
            } else {
              newWidth = height * aspectRatio;
            }
          }
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }

        // Set white background for JPEG conversion from PNG/transparent
        if (targetFormat === 'jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Draw and resize image
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convert to target format
        const mimeType = `image/${targetFormat}`;
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error(`Failed to convert to ${targetFormat}`));
          }
        }, mimeType, quality);

      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
}

// Specific converters
export async function pngToJpg(file: File, quality: number = 0.9): Promise<Blob> {
  return convertImageFormat(file, 'jpeg', { quality });
}

export async function jpgToPng(file: File): Promise<Blob> {
  return convertImageFormat(file, 'png');
}

export async function jpgToWebp(file: File, quality: number = 0.9): Promise<Blob> {
  return convertImageFormat(file, 'webp', { quality });
}

export async function pngToWebp(file: File, quality: number = 0.9): Promise<Blob> {
  return convertImageFormat(file, 'webp', { quality });
}

export async function webpToJpg(file: File, quality: number = 0.9): Promise<Blob> {
  return convertImageFormat(file, 'jpeg', { quality });
}

export async function webpToPng(file: File): Promise<Blob> {
  return convertImageFormat(file, 'png');
}

// Batch conversion helper
export async function convertMultipleImages(
  files: File[],
  targetFormat: 'jpeg' | 'png' | 'webp',
  options: ConversionOptions = {}
): Promise<{ blob: Blob; filename: string }[]> {
  const results = await Promise.all(
    files.map(async (file) => {
      const blob = await convertImageFormat(file, targetFormat, options);
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      const extension = targetFormat === 'jpeg' ? 'jpg' : targetFormat;
      const filename = `${baseName}.${extension}`;
      return { blob, filename };
    })
  );
  
  return results;
}
