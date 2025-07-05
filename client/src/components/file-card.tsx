import { Eye, Download, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { UploadedFile } from '@shared/schema';
import { formatFileSize, calculateSavings, downloadBlob } from '@/lib/image-utils';
import { getRecommendationText, getRecommendationColor } from '@/lib/quality-assessment';

interface FileCardProps {
  file: UploadedFile;
  onRemove: (id: string) => void;
  onPreview: (file: UploadedFile) => void;
}

export function FileCard({ file, onRemove, onPreview }: FileCardProps) {
  const handleDownload = () => {
    if (file.compressedBlob) {
      const extension = file.name.split('.').pop();
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      downloadBlob(file.compressedBlob, `${baseName}_compressed.${extension}`);
    }
  };

  const getStatusDisplay = () => {
    switch (file.status) {
      case 'pending':
        return <span className="text-xs text-secondary bg-slate-100 px-2 py-1 rounded">Pending</span>;
      case 'processing':
        return <span className="text-xs text-primary bg-blue-100 px-2 py-1 rounded">Processing</span>;
      case 'complete':
        return <span className="text-xs text-white bg-green-500 px-2 py-1 rounded">Complete</span>;
      case 'error':
        return <span className="text-xs text-white bg-red-500 px-2 py-1 rounded">Error</span>;
    }
  };

  const savings = file.compressedSize ? calculateSavings(file.originalSize, file.compressedSize) : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-4 shadow-sm hover:shadow-md transition-shadow duration-200 file-card">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <img
              src={file.previewUrl}
              alt="Image thumbnail"
              className="w-16 h-16 object-cover rounded-lg"
            />
          </div>

          {/* File Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-slate-900 truncate">{file.name}</h4>
              {getStatusDisplay()}
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <Progress 
                value={file.progress} 
                className="h-2"
              />
            </div>

            {/* File Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <p className="text-slate-500">Original</p>
                <p className="font-medium text-slate-900">{formatFileSize(file.originalSize)}</p>
              </div>
              <div>
                <p className="text-slate-500">Compressed</p>
                <p className="font-medium text-slate-900">
                  {file.compressedSize ? formatFileSize(file.compressedSize) : '--'}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Savings</p>
                <p className="font-medium text-green-600">
                  {file.compressedSize ? `${savings}%` : '--'}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Quality</p>
                <p className="font-medium text-slate-900">{file.quality}%</p>
              </div>
            </div>

            {/* Quality Assessment */}
            {file.qualityMetrics && (
              <div className="mt-3 p-2 rounded-lg border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-slate-700">Quality Assessment</span>
                  <Badge className={`text-xs ${getRecommendationColor(file.qualityMetrics.recommendation)}`}>
                    {file.qualityMetrics.recommendation}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">Quality Score:</span>
                    <span className="ml-1 font-medium">{file.qualityMetrics.qualityScore}%</span>
                  </div>
                  <div>
                    <span className="text-slate-500">File Reduction:</span>
                    <span className="ml-1 font-medium text-green-600">{file.qualityMetrics.fileReduction}%</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-1">{getRecommendationText(file.qualityMetrics.recommendation)}</p>
              </div>
            )}

            {file.error && (
              <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                {file.error}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              onClick={() => onPreview(file)}
              title="Preview"
            >
              <Eye size={16} />
            </Button>
            {file.compressedBlob && (
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                onClick={handleDownload}
                title="Download"
              >
                <Download size={16} />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50"
              onClick={() => onRemove(file.id)}
              title="Remove"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
