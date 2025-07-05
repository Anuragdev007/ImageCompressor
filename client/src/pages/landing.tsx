import { ArrowRight, Zap, Shield, Download, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { AdSenseHeader, AdSenseRectangle } from '@/components/adsense-banner';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <FileImage className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-slate-900">JPEG Compressor</span>
            </div>
            <Link href="/compress">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Start Compressing
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header Ad */}
          <AdSenseHeader />
          
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Compress JPEG Images
            <span className="text-blue-600 block">Without Losing Quality</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Smart image compression with advanced quality control. Reduce file sizes by up to 80% 
            while maintaining visual quality. Process multiple files simultaneously with our intelligent batch system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/compress">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
                Start Compressing for Free
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-slate-300 text-slate-700">
              See How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Why Choose Our JPEG Compressor?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Lightning Fast</h3>
              <p className="text-slate-600">
                Process multiple images simultaneously with our intelligent batch processing system. 
                Compress dozens of files in seconds.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">100% Private</h3>
              <p className="text-slate-600">
                All processing happens in your browser. Your images never leave your device, 
                ensuring complete privacy and security.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Easy Download</h3>
              <p className="text-slate-600">
                Download individual files or get all compressed images at once. 
                Simple drag-and-drop interface with instant previews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Simple 3-Step Process
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Upload Images</h3>
              <p className="text-slate-600">
                Drag and drop your JPEG files or click to browse. 
                Upload multiple files at once for batch processing.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Adjust Settings</h3>
              <p className="text-slate-600">
                Choose quality level, output format, and resize options. 
                Get real-time quality assessment and recommendations.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Download Results</h3>
              <p className="text-slate-600">
                Preview before/after comparisons and download your optimized images. 
                See detailed compression statistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rectangle Ad */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <AdSenseRectangle />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Optimize Your Images?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start compressing your JPEG images now. Free, fast, and secure.
          </p>
          <Link href="/compress">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-4 text-lg font-semibold">
              Get Started Now
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FileImage className="text-white" size={16} />
                </div>
                <span className="text-lg font-bold text-white">JPEG Compressor</span>
              </div>
              <p className="text-sm">
                The fastest and most secure way to compress JPEG images online. 
                All processing happens in your browser.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Features</h4>
              <ul className="space-y-2 text-sm">
                <li>Batch Processing</li>
                <li>Quality Assessment</li>
                <li>Format Conversion</li>
                <li>Resize Options</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Privacy</h4>
              <ul className="space-y-2 text-sm">
                <li>No File Upload</li>
                <li>Browser Processing</li>
                <li>Complete Privacy</li>
                <li>Secure by Design</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 JPEG Compressor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}