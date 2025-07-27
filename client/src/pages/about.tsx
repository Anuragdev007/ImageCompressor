import { ArrowLeft, Target, Users, Zap, Shield, Award, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import Seo from "@/components/seo";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
        <Seo
        title="About JPEG Compressor - Privacy-First Image Optimization"
        description="Learn about our mission to provide secure, browser-based image compression. No uploads, complete privacy, and professional-grade results."
        canonical="/about"
      />
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-2 mr-2">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">About Us</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">About JPEG Compressor</h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                We're passionate about making image optimization accessible to everyone. Our mission is to provide 
                the most efficient, secure, and user-friendly JPEG compression tool on the web.
              </p>
            </div>

            {/* Mission & Values */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <Target className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    To democratize image optimization by providing powerful, accessible tools that help users 
                    reduce file sizes without compromising quality.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="w-8 h-8 text-green-600 mb-2" />
                  <CardTitle className="text-lg">Privacy First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Your privacy is our priority. All processing happens locally in your browser - 
                    your images never leave your device.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="w-8 h-8 text-purple-600 mb-2" />
                  <CardTitle className="text-lg">User-Centric</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Every feature we build is designed with our users in mind, focusing on simplicity, 
                    efficiency, and reliability.
                  </p>
                </CardContent>
              </Card>
            </div>

           

            {/* Our Story */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Our Story</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">
                  JPEG Compressor was born from a simple frustration: the lack of reliable, privacy-focused 
                  image compression tools available online. Too many existing solutions required uploading 
                  sensitive images to unknown servers, raising serious privacy concerns.
                </p>
                
                <p className="text-slate-600">
                  Our team of developers and designers came together with a vision to create a tool that would:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                  <li>Process images entirely in the user's browser for maximum privacy</li>
                  <li>Provide professional-grade compression with intelligent quality control</li>
                  <li>Handle batch processing for efficient workflow</li>
                  <li>Offer a clean, intuitive interface that anyone can use</li>
                  <li>Remain completely free and accessible to everyone</li>
                </ul>
                
                <p className="text-slate-600">
                  Today, JPEG Compressor serves thousands of users worldwide, from professional photographers 
                  and web developers to casual users who simply want to reduce their image file sizes. 
                  We're proud to have created a tool that respects user privacy while delivering 
                  exceptional results.
                </p>
              </CardContent>
            </Card>

            {/* What Makes Us Different */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">What Makes Us Different</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center mb-3">
                      <Shield className="w-6 h-6 text-green-600 mr-2" />
                      <h4 className="font-semibold text-slate-900">Complete Privacy</h4>
                    </div>
                    <p className="text-slate-600">
                      Unlike other tools, we never upload your images to our servers. Everything happens 
                      locally in your browser using advanced JavaScript algorithms.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-3">
                      <Zap className="w-6 h-6 text-blue-600 mr-2" />
                      <h4 className="font-semibold text-slate-900">Lightning Fast</h4>
                    </div>
                    <p className="text-slate-600">
                      Our optimized compression algorithms and batch processing system can handle 
                      multiple files simultaneously without compromising on speed or quality.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-3">
                      <Award className="w-6 h-6 text-purple-600 mr-2" />
                      <h4 className="font-semibold text-slate-900">Quality Control</h4>
                    </div>
                    <p className="text-slate-600">
                      Our intelligent quality assessment system provides real-time feedback and 
                      recommendations to help you achieve the perfect balance between file size and quality.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-3">
                      <Globe className="w-6 h-6 text-orange-600 mr-2" />
                      <h4 className="font-semibold text-slate-900">Always Free</h4>
                    </div>
                    <p className="text-slate-600">
                      We believe image optimization should be accessible to everyone. Our core features 
                      will always remain free, supported by ethical advertising.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technology */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Our Technology</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">
                  JPEG Compressor leverages cutting-edge web technologies to deliver professional-grade 
                  image compression directly in your browser:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Canvas API</h4>
                    <p className="text-slate-600">
                      We use the HTML5 Canvas API for pixel-level image manipulation, ensuring 
                      precise control over compression algorithms.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Web Workers</h4>
                    <p className="text-slate-600">
                      Background processing ensures your browser remains responsive even when 
                      handling large batches of images.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Advanced Algorithms</h4>
                    <p className="text-slate-600">
                      Our compression algorithms are optimized for the best quality-to-size ratio, 
                      incorporating industry best practices.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Progressive Enhancement</h4>
                    <p className="text-slate-600">
                      The application works across all modern browsers with graceful degradation 
                      for older environments.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Values */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Our Values</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-1 gap-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-slate-900 mb-2">Transparency</h4>
                    <p className="text-slate-600">
                      We believe in being open about how our tool works, what data we collect (which is minimal), 
                      and how we operate our business.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold text-slate-900 mb-2">Innovation</h4>
                    <p className="text-slate-600">
                      We continuously improve our algorithms and user experience, staying at the forefront 
                      of web-based image processing technology.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-slate-900 mb-2">Accessibility</h4>
                    <p className="text-slate-600">
                      Our tool is designed to be usable by everyone, regardless of technical expertise or 
                      physical capabilities.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-slate-900 mb-2">Sustainability</h4>
                    <p className="text-slate-600">
                      By processing images locally, we reduce server load and energy consumption, 
                      contributing to a more sustainable internet.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Future Plans */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">What's Next</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600">
                  We're constantly working to improve JPEG Compressor and expand our capabilities. 
                  Here's what we're working on:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-slate-600 ml-4">
                  <li>Support for additional image formats (PNG, WebP, AVIF)</li>
                  <li>Advanced editing features (cropping, resizing, filters)</li>
                  <li>API access for developers and businesses</li>
                  <li>Mobile app for iOS and Android</li>
                  <li>Integration with popular cloud storage services</li>
                  <li>Batch processing improvements and automation features</li>
                </ul>
                
                <p className="text-slate-600">
                  Have a feature request or suggestion? We'd love to hear from you! 
                  <Link href="/contact" className="text-blue-600 hover:text-blue-800 ml-1">
                    Contact our team
                  </Link> and let us know what would make JPEG Compressor even better for you.
                </p>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Questions, suggestions, or just want to say hello? We're always excited to hear 
                  from our users and the broader community.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Contact Support
                    </Button>
                  </Link>
                  
                  <Link href="/compress">
                    <Button variant="outline">
                      Try Our Tool
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1M+</div>
                  <div className="text-sm text-slate-600">Images Compressed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-slate-600">Privacy Guaranteed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">50K+</div>
                  <div className="text-sm text-slate-600">Happy Users</div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/contact" className="block text-blue-600 hover:text-blue-800">
                  Contact Support
                </Link>
                <Link href="/privacy" className="block text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-blue-600 hover:text-blue-800">
                  Terms of Service
                </Link>
                <Link href="/compress" className="block text-blue-600 hover:text-blue-800">
                  Start Compressing
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}