import { useState, useRef, useCallback } from 'react';
import { Download, Trash2, Type, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { downloadBlob } from '@/lib/image-utils';

export function DigitalSignature() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureText, setSignatureText] = useState('');
  const [textStyle, setTextStyle] = useState({
    fontFamily: 'Brush Script MT, cursive',
    fontSize: 48,
    color: '#000000'
  });

  const startDrawing = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  }, []);

  const draw = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000000';
    ctx.lineTo(x, y);
    ctx.stroke();
  }, [isDrawing]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const generateTextSignature = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !signatureText.trim()) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set font style
    ctx.font = `${textStyle.fontSize}px ${textStyle.fontFamily}`;
    ctx.fillStyle = textStyle.color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw text
    ctx.fillText(signatureText, canvas.width / 2, canvas.height / 2);
  }, [signatureText, textStyle]);

  const downloadSignature = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        downloadBlob(blob, 'signature.png');
      }
    }, 'image/png');
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Digital Signature Generator</h1>
        <p className="text-gray-600">
          Create professional digital signatures by drawing, typing, or uploading your signature. 
          Perfect for documents, contracts, and official paperwork.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create Your Signature</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="draw" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="draw" className="flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                Draw
              </TabsTrigger>
              <TabsTrigger value="type" className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                Type
              </TabsTrigger>
            </TabsList>

            <TabsContent value="draw" className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Draw your signature in the box below using your mouse or touch screen
                </p>
                <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
                  <canvas
                    ref={canvasRef}
                    width={600}
                    height={200}
                    className="border border-gray-200 cursor-crosshair max-w-full"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="type" className="space-y-4">
              <div>
                <Label htmlFor="signature-text">Your Name</Label>
                <Input
                  id="signature-text"
                  value={signatureText}
                  onChange={(e) => setSignatureText(e.target.value)}
                  placeholder="Enter your name or signature text"
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="font-family">Font Style</Label>
                  <select
                    id="font-family"
                    value={textStyle.fontFamily}
                    onChange={(e) => setTextStyle(prev => ({ ...prev, fontFamily: e.target.value }))}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="Brush Script MT, cursive">Brush Script</option>
                    <option value="Lucida Handwriting, cursive">Lucida Handwriting</option>
                    <option value="Dancing Script, cursive">Dancing Script</option>
                    <option value="Pacifico, cursive">Pacifico</option>
                    <option value="Great Vibes, cursive">Great Vibes</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="font-size">Font Size</Label>
                  <Input
                    id="font-size"
                    type="number"
                    min="20"
                    max="80"
                    value={textStyle.fontSize}
                    onChange={(e) => setTextStyle(prev => ({ ...prev, fontSize: parseInt(e.target.value) }))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    type="color"
                    value={textStyle.color}
                    onChange={(e) => setTextStyle(prev => ({ ...prev, color: e.target.value }))}
                    className="mt-1"
                  />
                </div>
              </div>

              <Button onClick={generateTextSignature} className="w-full">
                Generate Text Signature
              </Button>

              <div className="border-2 border-gray-300 rounded-lg p-4 bg-white">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={200}
                  className="border border-gray-200 max-w-full"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 mt-6">
            <Button onClick={clearCanvas} variant="outline" className="flex-1">
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button onClick={downloadSignature} className="flex-1">
              <Download className="w-4 h-4 mr-2" />
              Download Signature
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>How to Use Your Digital Signature</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900">For PDFs:</h4>
              <p className="text-gray-600 text-sm">
                Download your signature as PNG and insert it into PDF documents using Adobe Acrobat, Preview (Mac), or online PDF editors.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">For Digital Documents:</h4>
              <p className="text-gray-600 text-sm">
                Use your downloaded signature in Word documents, Google Docs, or any application that supports image insertion.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Legal Considerations:</h4>
              <p className="text-gray-600 text-sm">
                Digital signatures created with this tool are suitable for most business purposes. For legally binding documents, check your local regulations regarding electronic signatures.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
