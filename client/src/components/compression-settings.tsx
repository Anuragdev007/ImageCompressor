import { Combine, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CompressionSettings, SessionStats } from '@shared/schema';
import { formatFileSize } from '@/lib/image-utils';

interface CompressionSettingsProps {
  settings: CompressionSettings;
  stats: SessionStats;
  onSettingsChange: (settings: Partial<CompressionSettings>) => void;
  onCompressAll: () => void;
  onResetSettings: () => void;
  hasFiles: boolean;
}

export function CompressionSettingsPanel({ 
  settings, 
  stats, 
  onSettingsChange, 
  onCompressAll,
  onResetSettings,
  hasFiles 
}: CompressionSettingsProps) {
  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ quality: parseInt(e.target.value) });
  };

  const handleResizeChange = (value: string) => {
    const resizeWidth = value === 'none' ? undefined : parseInt(value);
    onSettingsChange({ resizeWidth });
  };

  const handleFormatChange = (value: string) => {
    onSettingsChange({ outputFormat: value as 'jpeg' | 'webp' });
  };

  const handleReset = () => {
    onSettingsChange({ 
      quality: 80, 
      resizeWidth: undefined, 
      outputFormat: 'jpeg' 
    });
    onResetSettings();
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Compression Settings</h3>
      
      {/* Quality Slider */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <Label className="text-sm font-medium text-slate-700">Quality</Label>
          <span className="text-sm font-medium text-slate-900">{settings.quality}%</span>
        </div>
        <input
          type="range"
          min="10"
          max="100"
          value={settings.quality}
          onChange={handleQualityChange}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer compression-slider"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Small</span>
          <span>High Quality</span>
        </div>
      </div>

      {/* Resize Options */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-slate-700 mb-3 block">Resize Options</Label>
        <RadioGroup 
          value={settings.resizeWidth?.toString() || 'none'} 
          onValueChange={handleResizeChange}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none" className="text-sm text-slate-700">Original size</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1920" id="1920" />
            <Label htmlFor="1920" className="text-sm text-slate-700">1920px width</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1280" id="1280" />
            <Label htmlFor="1280" className="text-sm text-slate-700">1280px width</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="800" id="800" />
            <Label htmlFor="800" className="text-sm text-slate-700">800px width</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Output Format */}
      <div className="mb-6">
        <Label className="text-sm font-medium text-slate-700 mb-3 block">Output Format</Label>
        <Select value={settings.outputFormat} onValueChange={handleFormatChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jpeg">JPEG</SelectItem>
            <SelectItem value="webp">WebP (smaller)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Batch Actions */}
      <div className="pt-4 border-t border-slate-200">
        <Button 
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-3"
          onClick={onCompressAll}
          disabled={!hasFiles}
        >
          <Combine className="mr-2" size={16} />
          Combine All
        </Button>
        <Button 
          variant="outline"
          className="w-full border border-slate-300 text-slate-700 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          onClick={handleReset}
        >
          <RotateCcw className="mr-2" size={16} />
          Reset Settings
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <h4 className="text-sm font-medium text-slate-700 mb-3">Session Summary</h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Files processed:</span>
            <span className="font-medium">{stats.processedFiles}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Total saved:</span>
            <span className="font-medium text-green-600">{formatFileSize(stats.totalSaved)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Avg. reduction:</span>
            <span className="font-medium text-green-600">{stats.averageReduction}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
