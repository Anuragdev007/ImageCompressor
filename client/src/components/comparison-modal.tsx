import { X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { UploadedFile } from '@shared/schema';
import { formatFileSize, calculateSavings, downloadBlob } from '@/lib/image-utils';

interface ComparisonModalProps {
  file: UploadedFile | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ComparisonModal({ file, isOpen, onClose }: ComparisonModalProps) {
  if (!file) return null;

  const handleDownload = () => {
    if (file.compressedBlob) {
      const extension = file.name.split('.').pop();
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      downloadBlob(file.compressedBlob, `${baseName}_compressed.${extension}`);
    }
  };

  const compressedUrl = file.compressedBlob ? URL.createObjectURL(file.compressedBlob) : null;
  const savings = file.compressedSize ? calculateSavings(file.originalSize, file.compressedSize) : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full max-h-[90vh] overflow-hidden p-0">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-xl font-semibold text-slate-900">Before / After Comparison</h3>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            onClick={onClose}
          >
            <X size={20} />
          </Button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original Image */}
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-3">
                Original ({formatFileSize(file.originalSize)})
              </h4>
              <div className="bg-slate-100 rounded-lg overflow-hidden">
                <img 
                  src={file.previewUrl} 
                  alt="Original image" 
                  className="w-full h-auto max-h-96 object-contain"
                />
              </div>
            </div>
            
            {/* Compressed Image */}
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-3">
                {file.compressedSize ? (
                  `Compressed (${formatFileSize(file.compressedSize)}, ${savings}% savings)`
                ) : (
                  'Not compressed yet'
                )}
              </h4>
              <div className="bg-slate-100 rounded-lg overflow-hidden">
                {compressedUrl ? (
                  <img 
                    src={compressedUrl} 
                    alt="Compressed image" 
                    className="w-full h-auto max-h-96 object-contain"
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center text-slate-500">
                    Image not compressed yet
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {file.compressedBlob && (
            <div className="flex justify-center mt-6">
              <Button 
                className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                onClick={handleDownload}
              >
                <Download className="mr-2" size={16} />
                Download Compressed
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
