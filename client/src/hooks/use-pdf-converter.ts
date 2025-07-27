import { useState, useCallback } from 'react';
import { pdfConverter, PDFPage, PDFConversionOptions } from '@/lib/pdf-converter';
import { useToast } from '@/hooks/use-toast';

export interface PDFConversionState {
  isConverting: boolean;
  progress: number;
  pages: PDFPage[];
  error: string | null;
}

export function usePdfConverter() {
  const [state, setState] = useState<PDFConversionState>({
    isConverting: false,
    progress: 0,
    pages: [],
    error: null
  });

  const { toast } = useToast();

  const convertPdf = useCallback(async (
    file: File,
    options?: PDFConversionOptions
  ) => {
    setState(prev => ({
      ...prev,
      isConverting: true,
      progress: 0,
      error: null,
      pages: []
    }));

    try {
      // Get PDF info first to show progress
      const info = await pdfConverter.getPdfInfo(file);
      
      setState(prev => ({ ...prev, progress: 10 }));

      // Convert pages with progress updates
      const pages: PDFPage[] = [];
      const totalPages = info.numPages;
      
      for (let i = 1; i <= totalPages; i++) {
        const pageData = await pdfConverter.convertPageToBlob(file, i, options);
        const dataUrl = URL.createObjectURL(pageData);
        
        pages.push({
          pageNumber: i,
          dataUrl,
          width: 0, // Will be set when image loads
          height: 0
        });
        
        const progress = 10 + (i / totalPages) * 80;
        setState(prev => ({ ...prev, progress }));
      }

      setState(prev => ({
        ...prev,
        isConverting: false,
        progress: 100,
        pages
      }));

      toast({
        title: "PDF Converted",
        description: `Successfully converted ${totalPages} pages`,
      });

      return pages;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      setState(prev => ({
        ...prev,
        isConverting: false,
        progress: 0,
        error: errorMessage
      }));

      toast({
        title: "Conversion Failed",
        description: errorMessage,
        variant: "destructive",
      });

      throw error;
    }
  }, [toast]);

  const reset = useCallback(() => {
    setState({
      isConverting: false,
      progress: 0,
      pages: [],
      error: null
    });
  }, []);

  const clearPages = useCallback(() => {
    // Revoke object URLs to free memory
    state.pages.forEach(page => {
      if (page.dataUrl.startsWith('blob:')) {
        URL.revokeObjectURL(page.dataUrl);
      }
    });
    
    setState(prev => ({ ...prev, pages: [] }));
  }, [state.pages]);

  return {
    ...state,
    convertPdf,
    reset,
    clearPages
  };
}
