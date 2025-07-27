import { useState, useCallback } from 'react';
import { Upload, Download, FileText, Image as ImageIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { downloadBlob } from '@/lib/image-utils';
import { useToast } from '@/hooks/use-toast';

interface ConversionFile {
  id: string;
  name: string;
  originalType: string;
  targetType: string;
  originalUrl: string;
  convertedUrl?: string;
  status: 'pending' | 'converting' | 'complete' | 'error';
  progress: number;
}

interface FileConverterProps {
  title: string;
  description: string;
  acceptedTypes: { [key: string]: string[] };
  targetFormat: string;
  converter: (file: File) => Promise<Blob>;
}

export function FileConverter({ title, description, acceptedTypes, targetFormat, converter }: FileConverterProps) {
  const [files, setFiles] = useState<ConversionFile[]>([]);
  const { toast } = useToast();

  const convertFile = async (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    setFiles(prev => prev.map(f => 
      f.id === fileId 
        ? { ...f, status: 'converting' as const, progress: 0 }
        : f
    ));

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setFiles(prev => prev.map(f => 
          f.id === fileId 
            ? { ...f, progress: Math.min(f.progress + 10, 90) }
            : f
        ));
      }, 200);

      // Get original file
      const response = await fetch(file.originalUrl);
      const blob = await response.blob();
      const originalFile = new File([blob], file.name, { type: blob.type });

      const convertedBlob = await converter(originalFile);
      const convertedUrl = URL.createObjectURL(convertedBlob);

      clearInterval(progressInterval);

      setFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { 
              ...f, 
              status: 'complete' as const, 
              progress: 100,
              convertedUrl 
            }
          : f
      ));

      toast({
        title: "Conversion complete",
        description: `${file.name} has been converted to ${targetFormat.toUpperCase()}.`,
      });

    } catch (error) {
      setFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'error' as const }
          : f
      ));

      toast({
        title: "Conversion failed",
        description: `Failed to convert ${file.name}`,
        variant: "destructive",
      });
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: ConversionFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      originalType: file.type,
      targetType: targetFormat,
      originalUrl: URL.createObjectURL(file),
      status: 'pending',
      progress: 0,
    }));

    setFiles(prev => [...prev, ...newFiles]);
  }, [targetFormat]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    multiple: true,
  });

  const handleDownload = (file: ConversionFile) => {
    if (file.convertedUrl) {
      fetch(file.convertedUrl)
        .then(response => response.blob())
        .then(blob => {
          const fileName = file.name.replace(/\.[^/.]+$/, '') + `.${targetFormat}`;
          downloadBlob(blob, fileName);
        });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>

      {/* Upload Zone */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop your files here, or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Convert to {targetFormat.toUpperCase()} format
            </p>
          </div>
        </CardContent>
      </Card>

      {/* File Conversion Cards */}
      {files.length > 0 && (
        <div className="space-y-4">
          {files.map((file) => (
            <Card key={file.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded">
                      {file.originalType.startsWith('image/') ? (
                        <ImageIcon className="w-6 h-6 text-blue-600" />
                      ) : (
                        <FileText className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">
                        {file.originalType.split('/')[1]?.toUpperCase()} → {targetFormat.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {file.status === 'converting' && (
                      <div className="flex items-center space-x-2">
                        <Progress value={file.progress} className="w-32" />
                        <span className="text-sm text-gray-500">{file.progress}%</span>
                      </div>
                    )}

                    {file.status === 'pending' && (
                      <Button onClick={() => convertFile(file.id)}>
                        Convert
                      </Button>
                    )}

                    {file.status === 'complete' && (
                      <Button onClick={() => handleDownload(file)}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    )}

                    {file.status === 'error' && (
                      <span className="text-red-600 text-sm">Error</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
