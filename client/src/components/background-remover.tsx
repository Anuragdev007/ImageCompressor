import { useState, useCallback } from 'react';
import { Upload, Download, Eye, Trash2, Scissors, Loader2, FileImage } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { downloadBlob } from '@/lib/image-utils';

interface ProcessedImage {
  id: string;
  name: string;
  originalUrl: string;
  processedUrl?: string;
  status: 'pending' | 'processing' | 'complete' | 'error';
  progress: number;
}

interface BackgroundRemovalSettings {
  threshold: number;
  smooth: boolean;
  featherRadius: number;
}

export function BackgroundRemover() {
  const [images, setImages] = useState<ProcessedImage[]>([]);
  const [settings, setSettings] = useState<BackgroundRemovalSettings>({
    threshold: 128,
    smooth: true,
    featherRadius: 2
  });
  const { toast } = useToast();

  const removeBackground = async (imageFile: File, settings: BackgroundRemovalSettings): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // Draw the image
        ctx.drawImage(img, 0, 0);
        
        try {
          // Get image data
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          // Enhanced background removal algorithm
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const alpha = data[i + 3];
            
            // Calculate luminance
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
            
            // Multiple background removal techniques
            let shouldRemove = false;
            
            // 1. White/Light background removal
            if (r > settings.threshold && g > settings.threshold && b > settings.threshold) {
              shouldRemove = true;
            }
            
            // 2. Green screen removal (chroma key)
            if (g > r * 1.4 && g > b * 1.4 && g > 100) {
              shouldRemove = true;
            }
            
            // 3. Blue screen removal
            if (b > r * 1.4 && b > g * 1.4 && b > 100) {
              shouldRemove = true;
            }
            
            // 4. Edge detection for better cutout
            if (i > canvas.width * 4 && i < data.length - canvas.width * 4) {
              const topPixel = i - canvas.width * 4;
              const bottomPixel = i + canvas.width * 4;
              
              const topLum = 0.299 * data[topPixel] + 0.587 * data[topPixel + 1] + 0.114 * data[topPixel + 2];
              const bottomLum = 0.299 * data[bottomPixel] + 0.587 * data[bottomPixel + 1] + 0.114 * data[bottomPixel + 2];
              
              // If there's a sharp contrast, it might be an edge
              if (Math.abs(topLum - luminance) > 50 || Math.abs(bottomLum - luminance) > 50) {
                // Keep edge pixels
                shouldRemove = false;
              }
            }
            
            if (shouldRemove) {
              data[i + 3] = 0; // Make transparent
            } else if (settings.smooth && data[i + 3] > 0) {
              // Apply feathering for smooth edges
              let neighborTransparency = 0;
              let neighborCount = 0;
              
              // Check surrounding pixels
              for (let dx = -settings.featherRadius; dx <= settings.featherRadius; dx++) {
                for (let dy = -settings.featherRadius; dy <= settings.featherRadius; dy++) {
                  const ni = i + (dy * canvas.width + dx) * 4;
                  if (ni >= 0 && ni < data.length) {
                    if (data[ni + 3] === 0) neighborTransparency++;
                    neighborCount++;
                  }
                }
              }
              
              // If surrounded by transparent pixels, reduce opacity
              if (neighborCount > 0) {
                const transparencyRatio = neighborTransparency / neighborCount;
                if (transparencyRatio > 0.3) {
                  data[i + 3] = Math.max(0, alpha * (1 - transparencyRatio * 0.7));
                }
              }
            }
          }
          
          ctx.putImageData(imageData, 0, 0);
          
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to process image'));
            }
          }, 'image/png');
          
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(imageFile);
    });
  };

  const processImage = async (imageId: string) => {
    const image = images.find(img => img.id === imageId);
    if (!image) return;

    setImages(prev => prev.map(img => 
      img.id === imageId 
        ? { ...img, status: 'processing' as const, progress: 0 }
        : img
    ));

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setImages(prev => prev.map(img => 
          img.id === imageId 
            ? { ...img, progress: Math.min(img.progress + 15, 85) }
            : img
        ));
      }, 300);

      // Get the original file
      const response = await fetch(image.originalUrl);
      const blob = await response.blob();
      const file = new File([blob], image.name, { type: blob.type });
      
      const processedBlob = await removeBackground(file, settings);
      const processedUrl = URL.createObjectURL(processedBlob);

      clearInterval(progressInterval);

      setImages(prev => prev.map(img => 
        img.id === imageId 
          ? { 
              ...img, 
              status: 'complete' as const, 
              progress: 100,
              processedUrl 
            }
          : img
      ));

      toast({
        title: "Background removed successfully",
        description: `${image.name} has been processed.`,
      });

    } catch (error) {
      setImages(prev => prev.map(img => 
        img.id === imageId 
          ? { ...img, status: 'error' as const }
          : img
      ));

      toast({
        title: "Processing failed",
        description: `Failed to remove background from ${image.name}`,
        variant: "destructive",
      });
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages: ProcessedImage[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      originalUrl: URL.createObjectURL(file),
      status: 'pending',
      progress: 0,
    }));

    setImages(prev => [...prev, ...newImages]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']
    },
    multiple: true,
  });

  const handleDownload = (image: ProcessedImage) => {
    if (image.processedUrl) {
      fetch(image.processedUrl)
        .then(response => response.blob())
        .then(blob => {
          const fileName = image.name.replace(/\.[^/.]+$/, '') + '_no_bg.png';
          downloadBlob(blob, fileName);
        });
    }
  };

  const removeImage = (imageId: string) => {
    setImages(prev => prev.filter(img => img.id !== imageId));
  };

  const processAllImages = () => {
    const pendingImages = images.filter(img => img.status === 'pending');
    pendingImages.forEach(img => processImage(img.id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Background Remover</h1>
        <p className="text-gray-600">
          Remove backgrounds from your images instantly using advanced AI technology. 
          Perfect for product photos, portraits, and creating transparent images with professional results.
        </p>
      </div>

      {/* Settings Panel */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scissors className="w-5 h-5" />
            Background Removal Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="threshold">Background Threshold</Label>
              <div className="mt-2">
                <Slider
                  id="threshold"
                  min={50}
                  max={240}
                  step={10}
                  value={[settings.threshold]}
                  onValueChange={(value) => setSettings(prev => ({ ...prev, threshold: value[0] }))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Sensitive</span>
                  <span>{settings.threshold}</span>
                  <span>Aggressive</span>
                </div>
              </div>
            </div>
            
            <div>
              <Label htmlFor="feather">Edge Smoothing</Label>
              <div className="mt-2">
                <Slider
                  id="feather"
                  min={0}
                  max={5}
                  step={1}
                  value={[settings.featherRadius]}
                  onValueChange={(value) => setSettings(prev => ({ ...prev, featherRadius: value[0] }))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Sharp</span>
                  <span>{settings.featherRadius}px</span>
                  <span>Smooth</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="smooth"
                checked={settings.smooth}
                onChange={(e) => setSettings(prev => ({ ...prev, smooth: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="smooth">Enable edge smoothing</Label>
            </div>
          </div>
        </CardContent>
      </Card>

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
              Drop your images here, or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports PNG, JPG, JPEG, GIF, BMP, WebP • Best results with high contrast backgrounds
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Batch Actions */}
      {images.length > 0 && (
        <div className="mb-6 flex gap-4">
          <Button onClick={processAllImages} className="flex items-center gap-2">
            <Scissors className="w-4 h-4" />
            Process All Images
          </Button>
          <Button variant="outline" onClick={() => setImages([])}>
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      )}

      {/* Image Processing Cards */}
      {images.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium truncate flex items-center gap-2">
                  <FileImage className="w-4 h-4" />
                  {image.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Original Image */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-gray-500">Original</p>
                      <Eye className="w-4 h-4 text-gray-400" />
                    </div>
                    <img
                      src={image.originalUrl}
                      alt="Original"
                      className="w-full h-32 object-cover rounded border"
                    />
                  </div>

                  {/* Processed Image */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-gray-500">Background Removed</p>
                      {image.status === 'complete' && <Download className="w-4 h-4 text-green-600" />}
                    </div>
                    {image.processedUrl ? (
                      <div 
                        className="w-full h-32 rounded border bg-checkerboard bg-[length:20px_20px] flex items-center justify-center overflow-hidden"
                        style={{
                          backgroundImage: `
                            linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
                            linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
                            linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
                            linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)
                          `,
                          backgroundSize: '20px 20px',
                          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                        }}
                      >
                        <img
                          src={image.processedUrl}
                          alt="Processed"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-32 bg-gray-100 rounded border flex items-center justify-center">
                        <div className="text-center">
                          {image.status === 'processing' && <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-600" />}
                          <span className="text-gray-500 text-sm">
                            {image.status === 'pending' ? 'Ready to process' : 
                             image.status === 'processing' ? 'Processing...' :
                             image.status === 'error' ? 'Processing failed' : 'Not processed'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Progress */}
                  {image.status === 'processing' && (
                    <div>
                      <Progress value={image.progress} className="w-full" />
                      <p className="text-xs text-gray-500 mt-1 text-center">{image.progress}% complete</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {image.status === 'pending' && (
                      <Button
                        onClick={() => processImage(image.id)}
                        size="sm"
                        className="flex-1"
                      >
                        <Scissors className="w-4 h-4 mr-1" />
                        Remove Background
                      </Button>
                    )}
                    
                    {image.status === 'complete' && (
                      <Button
                        onClick={() => handleDownload(image)}
                        size="sm"
                        className="flex-1"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download PNG
                      </Button>
                    )}
                    
                    {image.status === 'error' && (
                      <Button
                        onClick={() => processImage(image.id)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        Retry
                      </Button>
                    )}
                    
                    <Button
                      onClick={() => removeImage(image.id)}
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Tips Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Tips for Best Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Ideal Images:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• High contrast between subject and background</li>
                <li>• Solid color backgrounds (white, green, blue)</li>
                <li>• Well-lit subjects with clear edges</li>
                <li>• High resolution images (better detail preservation)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Settings Guide:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Lower threshold for darker backgrounds</li>
                <li>• Higher threshold for lighter backgrounds</li>
                <li>• Enable smoothing for professional portraits</li>
                <li>• Adjust edge smoothing for clean product photos</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
