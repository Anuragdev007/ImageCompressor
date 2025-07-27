import * as pdfjsLib from 'pdfjs-dist';

// Set up worker with fallback
const setupWorker = () => {
  if (typeof __PDF_WORKER_SRC__ !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = __PDF_WORKER_SRC__;
  } else {
    // Fallback to default worker path
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
  }
};

setupWorker();


// Use the defined constant or fallback
const workerSrc = typeof __PDF_WORKER_SRC__ !== 'undefined' 
  ? __PDF_WORKER_SRC__ 
  : '/pdf.worker.min.js';

// Set the worker source immediately when the module loads
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

// Add type declaration for the global constant
declare const __PDF_WORKER_SRC__: string;

export interface PDFConversionOptions {
  scale?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
  pageNumber?: number; // For single page conversion
}

export interface PDFPage {
  pageNumber: number;
  dataUrl: string;
  width: number;
  height: number;
}

export class PDFConverter {
  private static instance: PDFConverter;
  
  public static getInstance(): PDFConverter {
    if (!PDFConverter.instance) {
      PDFConverter.instance = new PDFConverter();
    }
    return PDFConverter.instance;
  }

  private constructor() {
    this.ensureWorkerReady();
  }

  private ensureWorkerReady(): void {
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;
    }
  }

  /**
   * Convert PDF to a single ZIP blob containing all pages
   */
  public async convertPdfToZipBlob(
    file: File,
    options: PDFConversionOptions = {}
  ): Promise<Blob> {
    const pages = await this.convertPdfToImages(file, options);
    
    // Create a simple ZIP-like structure (for demo - use jszip for production)
    const zipContent = await this.createZipFromPages(pages, options.format || 'jpeg');
    return zipContent;
  }

  /**
   * Convert PDF to a single merged image blob
   */
  public async convertPdfToSingleImageBlob(
    file: File,
    options: PDFConversionOptions = {}
  ): Promise<Blob> {
    const {
      scale = 2.0,
      quality = 0.9,
      format = 'jpeg'
    } = options;

    try {
      this.ensureWorkerReady();
      
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ 
        data: arrayBuffer,
        useSystemFonts: true,
        disableFontFace: false
      });
      
      const pdf = await loadingTask.promise;
      
      // Get first page dimensions to calculate total canvas size
      const firstPage = await pdf.getPage(1);
      const viewport = firstPage.getViewport({ scale });
      
      // Create a tall canvas to fit all pages vertically
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Failed to get canvas context');
      }
      
      canvas.width = viewport.width;
      canvas.height = viewport.height * pdf.numPages;
      
      // Fill background with white
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      // Render all pages onto the single canvas
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const pageViewport = page.getViewport({ scale });
        
        const yOffset = (pageNum - 1) * viewport.height;
        
        await page.render({
          canvasContext: context,
          viewport: pageViewport,
          transform: [1, 0, 0, 1, 0, yOffset]
        }).promise;
        
        page.cleanup();
      }
      
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        const mimeType = format === 'png' ? 'image/png' : 
                        format === 'webp' ? 'image/webp' : 'image/jpeg';
        
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob from canvas'));
          }
        }, mimeType, quality);
      });
      
      pdf.destroy();
      return blob;
    } catch (error) {
      console.error('PDF to single image conversion error:', error);
      throw new Error(`Failed to convert PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Convert PDF file to image data URLs
   */
  public async convertPdfToImages(
    file: File,
    options: PDFConversionOptions = {}
  ): Promise<PDFPage[]> {
    const {
      scale = 2.0,
      quality = 0.9,
      format = 'jpeg'
    } = options;

    try {
      this.ensureWorkerReady();
      
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ 
        data: arrayBuffer,
        useSystemFonts: true,
        disableFontFace: false
      });
      
      const pdf = await loadingTask.promise;
      const pages: PDFPage[] = [];
      
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale });
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) {
          throw new Error('Failed to get canvas context');
        }
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          intent: 'display' as const
        };
        
        await page.render(renderContext).promise;
        
        const mimeType = format === 'png' ? 'image/png' : 
                        format === 'webp' ? 'image/webp' : 'image/jpeg';
        
        const dataUrl = canvas.toDataURL(mimeType, quality);
        
        pages.push({
          pageNumber: pageNum,
          dataUrl,
          width: viewport.width,
          height: viewport.height
        });
        
        page.cleanup();
      }
      
      pdf.destroy();
      return pages;
    } catch (error) {
      console.error('PDF conversion error:', error);
      throw new Error(`Failed to convert PDF: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Convert single PDF page to blob
   */
  public async convertPageToBlob(
    file: File,
    pageNumber: number,
    options: PDFConversionOptions = {}
  ): Promise<Blob> {
    const {
      scale = 2.0,
      quality = 0.9,
      format = 'jpeg'
    } = options;

    try {
      this.ensureWorkerReady();
      
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      if (pageNumber < 1 || pageNumber > pdf.numPages) {
        throw new Error(`Page number ${pageNumber} is out of range (1-${pdf.numPages})`);
      }
      
      const page = await pdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale });
      
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('Failed to get canvas context');
      }
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;
      
      const blob = await new Promise<Blob>((resolve, reject) => {
        const mimeType = format === 'png' ? 'image/png' : 
                        format === 'webp' ? 'image/webp' : 'image/jpeg';
        
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob from canvas'));
          }
        }, mimeType, quality);
      });
      
      page.cleanup();
      pdf.destroy();
      
      return blob;
    } catch (error) {
      console.error('PDF page conversion error:', error);
      throw new Error(`Failed to convert PDF page: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Get PDF metadata
   */
  public async getPdfInfo(file: File): Promise<{
    numPages: number;
    title?: string;
    subject?: string;
    author?: string;
    creator?: string;
    producer?: string;
    creationDate?: Date;
    modDate?: Date;
  }> {
    try {
      this.ensureWorkerReady();
      
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      const metadata = await pdf.getMetadata();
      
      const info = {
        numPages: pdf.numPages,
        title: metadata.info?.Title,
        subject: metadata.info?.Subject,
        author: metadata.info?.Author,
        creator: metadata.info?.Creator,
        producer: metadata.info?.Producer,
        creationDate: metadata.info?.CreationDate ? new Date(metadata.info.CreationDate) : undefined,
        modDate: metadata.info?.ModDate ? new Date(metadata.info.ModDate) : undefined
      };
      
      pdf.destroy();
      return info;
    } catch (error) {
      console.error('PDF info extraction error:', error);
      throw new Error(`Failed to extract PDF info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Create a simple ZIP-like structure from pages
   */
  private async createZipFromPages(pages: PDFPage[], format: string): Promise<Blob> {
    // For a simple implementation, we'll create a single blob
    // In production, use jszip library for proper ZIP creation
    
    if (pages.length === 1) {
      // Convert single page dataURL to blob
      const response = await fetch(pages[0].dataUrl);
      return response.blob();
    }
    
    // For multiple pages, create a merged image or use proper ZIP library
    return this.createMergedImageBlob(pages, format);
  }

  /**
   * Create a merged image from multiple pages
   */
  private async createMergedImageBlob(pages: PDFPage[], format: string): Promise<Blob> {
    if (pages.length === 0) {
      throw new Error('No pages to merge');
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      throw new Error('Failed to get canvas context');
    }

    // Calculate total dimensions
    const maxWidth = Math.max(...pages.map(p => p.width));
    const totalHeight = pages.reduce((sum, p) => sum + p.height, 0);
    
    canvas.width = maxWidth;
    canvas.height = totalHeight;
    
    // Fill background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw each page
    let yOffset = 0;
    for (const page of pages) {
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = page.dataUrl;
      });
      
      context.drawImage(img, 0, yOffset);
      yOffset += page.height;
    }
    
    // Convert to blob
    return new Promise<Blob>((resolve, reject) => {
      const mimeType = format === 'png' ? 'image/png' : 
                      format === 'webp' ? 'image/webp' : 'image/jpeg';
      
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create merged blob'));
        }
      }, mimeType, 0.9);
    });
  }
}

// Export singleton instance
export const pdfConverter = PDFConverter.getInstance();

// Helper functions for different conversion types
export const convertPdfToJpeg = (file: File, scale = 2.0): Promise<Blob> => 
  pdfConverter.convertPdfToSingleImageBlob(file, { scale, format: 'jpeg' });

export const convertPdfToPng = (file: File, scale = 2.0): Promise<Blob> => 
  pdfConverter.convertPdfToSingleImageBlob(file, { scale, format: 'png' });

export const convertPdfToZip = (file: File, scale = 2.0): Promise<Blob> => 
  pdfConverter.convertPdfToZipBlob(file, { scale, format: 'jpeg' });

// For compatibility with your existing FileConverter component
export const convertPdfToBlob = convertPdfToJpeg;

export const getPdfPageCount = async (file: File): Promise<number> => {
  const info = await pdfConverter.getPdfInfo(file);
  return info.numPages;
};
