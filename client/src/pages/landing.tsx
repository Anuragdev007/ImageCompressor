import { ArrowRight, Zap, Shield, Download, FileImage, Star, Users, Clock, Award, Scissors, Edit3, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';

export default function Landing() {
  const tools = [
    {
      name: "JPEG Compressor",
      description: "Reduce JPEG file sizes by up to 80% while maintaining visual quality with advanced compression algorithms",
      icon: <FileImage className="w-8 h-8" />,
      link: "/compressor",
      features: ["Batch Processing", "Quality Control", "Format Conversion"]
    },
    {
      name: "Background Remover",
      description: "Remove backgrounds from images using AI technology. Perfect for product photos and portraits",
      icon: <Scissors className="w-8 h-8" />,
      link: "/background-remover",
      features: ["AI Powered", "Edge Smoothing", "Transparent Output"]
    },
    {
      name: "PDF to JPG Converter",
      description: "Convert PDF documents to high-quality JPG images. Each page becomes a separate image file",
      icon: <RefreshCw className="w-8 h-8" />,
      link: "/convert/pdf-to-jpg",
      features: ["Multi-page Support", "High Quality", "Batch Download"]
    },
    {
      name: "Digital Signature",
      description: "Create professional digital signatures for documents with drawing or typing options",
      icon: <Edit3 className="w-8 h-8" />,
      link: "/digital-signature",
      features: ["Draw or Type", "Multiple Fonts", "PNG Export"]
    },
    {
      name: "Image Format Converter",
      description: "Convert between all popular image formats: JPG, PNG, WebP, GIF with quality control",
      icon: <RefreshCw className="w-8 h-8" />,
      link: "/convert/image-formats",
      features: ["All Formats", "Batch Conversion", "Quality Control"]
    },
    {
      name: "PNG to JPG Converter",
      description: "Convert PNG images to JPG format for smaller file sizes with white background replacement",
      icon: <FileImage className="w-8 h-8" />,
      link: "/convert/png-to-jpg",
      features: ["Background Fill", "Size Reduction", "Quality Options"]
    }
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast Processing",
      description: "Process multiple images simultaneously with our intelligent batch processing system. Compress dozens of files in seconds."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "100% Privacy Guaranteed",
      description: "All processing happens in your browser. Your images never leave your device, ensuring complete privacy and security."
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Instant Downloads",
      description: "Download individual files or get all processed images at once. Simple drag-and-drop interface with instant previews."
    }
  ];

  const stats = [
    { icon: <Users className="w-8 h-8" />, value: "50,000+", label: "Happy Users" },
    { icon: <FileImage className="w-8 h-8" />, value: "2M+", label: "Images Processed" },
    { icon: <Clock className="w-8 h-8" />, value: "99.9%", label: "Uptime" },
    { icon: <Award className="w-8 h-8" />, value: "4.9/5", label: "User Rating" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Complete Image Processing
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Toolkit</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Professional image tools for compression, background removal, format conversion, and digital signatures. 
            All processing happens locally in your browser for maximum privacy and security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/compressor">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Using Tools <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/help">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Section - Moved to Top */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Image Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for image processing, optimization, and conversion in one powerful suite.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 group">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {tool.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {tool.features.map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <Link href={tool.link}>
                    <Button className="w-full group-hover:bg-blue-700 transition-colors">
                      Use Tool <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with modern web technologies to deliver professional-grade results without compromising your privacy.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow text-center">
                <CardContent className="p-8">
                  <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4 text-white">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, fast, and secure image processing in three easy steps.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose Your Tool</h3>
              <p className="text-gray-600">
                Select from our comprehensive suite of image processing tools: compression, background removal, format conversion, and more.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload & Configure</h3>
              <p className="text-gray-600">
                Drag and drop your files or browse to upload. Adjust settings like quality, format, and processing options to your needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Download Results</h3>
              <p className="text-gray-600">
                Preview your results and download individual files or batch download all processed images with detailed statistics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Process Your Images?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Choose from our complete toolkit. All tools are free, secure, and process images locally in your browser.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/compressor">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Start Compressing <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/background-remover">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-blue-600 hover:bg-white hover:text-blue-600">
                Remove Backgrounds
              </Button> 
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
