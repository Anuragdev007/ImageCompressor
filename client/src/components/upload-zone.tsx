import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudUpload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isJpegFile } from '@/lib/image-utils';

interface UploadZoneProps {
  onFilesAdded: (files: File[]) => void;
  hasFiles: boolean;
}

export function UploadZone({ onFilesAdded, hasFiles }: UploadZoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const jpegFiles = acceptedFiles.filter(isJpegFile);
    onFilesAdded(jpegFiles);
  }, [onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/jpg': ['.jpg', '.jpeg'],
    },
    multiple: true,
  });

  if (hasFiles) return null;

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed border-slate-300 rounded-xl bg-white hover:border-primary hover:bg-blue-50 transition-all duration-200 cursor-pointer group ${
        isDragActive ? 'border-primary bg-blue-50' : ''
      }`}
    >
      <input {...getInputProps()} />
      <div className="p-12 text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-slate-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors duration-200">
          <CloudUpload className="text-2xl text-slate-400 group-hover:text-primary transition-colors duration-200" size={32} />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          {isDragActive ? 'Drop your files here' : 'Drop your JPEG files here'}
        </h3>
        <p className="text-slate-500 mb-4">or click to browse and select multiple files</p>
        <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-500 mb-6">
          <span className="bg-slate-100 px-2 py-1 rounded">.jpg</span>
          <span className="bg-slate-100 px-2 py-1 rounded">.jpeg</span>
        </div>
        <Button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
          Select Files
        </Button>
      </div>
    </div>
  );
}
