import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, Download, X, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { usePdfConverter } from '@/hooks/use-pdf-converter';
import { cn } from '@/lib/utils';

interface PdfToImageProps {
  onImagesGenerated?: (images: string[]) => void;
}

export function PdfToImage({ onImagesGenerated }: PdfToImageProps) {
  const { isConverting, progress, pages, error, convertPdf, clearPages } = usePdfConverter();
  const [selectedFormat, setSelectedFormat] = useState<'jpeg' | 'png' | 'webp'>('jpeg');
  const [quality, setQuality] = useState(90);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const pdfFile = acceptedFiles.find(file => file.type === 'application/pdf');
    
    if (!pdfFile) {
      return;
    }

    try {
      const convertedPages = await convertPdf(pdfFile, {
        format: selectedFormat,
        quality: quality / 100,
        scale: 2.0
      });

      if (onImagesGenerated) {
        onImagesGenerated(convertedPages.map(page => page.dataUrl));
      }
    } catch (error) {
      console.error('Conversion failed:', error);
    }
  }, [convertPdf, selectedFormat, quality, onImagesGenerated]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    multiple: false,
    disabled: isConverting
  });

  const downloadAll = useCallback(() => {
    pages.forEach((page, index) => {
      const link = document.createElement('a');
      link.href = page.dataUrl;
      link.download = `page-${page.pageNumber}.${selectedFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }, [pages, selectedFormat]);

  const downloadPage = useCallback((page: typeof pages[0]) => {
    const link = document.createElement('a');
    link.href = page.dataUrl;
    link.download = `page-${page.pageNumber}.${selectedFormat}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [selectedFormat]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            PDF to Image Converter
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Output Format</label>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value as 'jpeg' | 'png' | 'webp')}
                className="w-full px-3 py-2 border rounded-md"
                disabled={isConverting}
              >
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Quality: {quality}%
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full"
                disabled={isConverting || selectedFormat === 'png'}
              />
            </div>

            <div className="flex items-end">
              {pages.length > 0 && (
                <Button
                  onClick={clearPages}
                  variant="outline"
                  disabled={isConverting}
                  className="w-full"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Drop Zone */}
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300",
              isConverting && "opacity-50 cursor-not-allowed"
            )}
          >
            <input {...getInputProps()} />
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            
            {isDragActive ? (
              <p className="text-blue-600">Drop the PDF file here...</p>
            ) : (
              <div>
                <p className="text-gray-600 mb-2">
                  Drag & drop a PDF file here, or click to select
                </p>
                <p className="text-sm text-gray-400">
                  Maximum file size: 50MB
                </p>
              </div>
            )}
          </div>

          {/* Progress */}
          {isConverting && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Converting PDF...</span>
                <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results */}
      {pages.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5" />
                Generated Images ({pages.length})
              </CardTitle>
              <Button onClick={downloadAll} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pages.map((page) => (
                <div key={page.pageNumber} className="border rounded-lg overflow-hidden">
                  <div className="aspect-[3/4] bg-gray-100">
                    <img
                      src={page.dataUrl}
                      alt={`Page ${page.pageNumber}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <Badge variant="secondary">
                      Page {page.pageNumber}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() => downloadPage(page)}
                      className="flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
