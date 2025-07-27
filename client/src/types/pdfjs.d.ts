declare module 'pdfjs-dist' {
  export interface PDFDocumentProxy {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPageProxy>;
    getMetadata(): Promise<PDFMetadata>;
    destroy(): void;
  }

  export interface PDFPageProxy {
    getViewport(params: { scale: number }): PDFPageViewport;
    render(params: PDFRenderParams): PDFRenderTask;
    cleanup(): void;
  }

  export interface PDFPageViewport {
    width: number;
    height: number;
    scale: number;
    rotation: number;
    transform: number[];
  }

  export interface PDFRenderParams {
    canvasContext: CanvasRenderingContext2D;
    viewport: PDFPageViewport;
    intent?: string;
    transform?: number[];
  }

  export interface PDFRenderTask {
    promise: Promise<void>;
    cancel(): void;
  }

  export interface PDFInfo {
    Title?: string;
    Subject?: string;
    Author?: string;
    Creator?: string;
    Producer?: string;
    CreationDate?: string;
    ModDate?: string;
    Keywords?: string;
    PDFFormatVersion?: string;
  }

  export interface PDFMetadata {
    info: PDFInfo;
    metadata: any;
    contentDispositionFilename?: string;
    contentLength?: number;
  }

  export interface PDFLoadingTask {
    promise: Promise<PDFDocumentProxy>;
    destroy(): void;
  }

  export interface GlobalWorkerOptions {
    workerSrc: string;
    workerPort?: any;
  }

  export const GlobalWorkerOptions: GlobalWorkerOptions;

  export function getDocument(src: any): PDFLoadingTask;
}
