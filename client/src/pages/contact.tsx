import { Mail, Phone, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Link } from 'wouter';
import { AdSenseSidebar } from '@/components/adsense-banner';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message. We will get back to you soon!');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-2 mr-2">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Contact Support</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Get in Touch</h2>
              <p className="text-lg text-slate-600">
                Have a question or need help with our JPEG compression tool? We're here to help!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <Mail className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">Email Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-2">support@jpegcompressor.com</p>
                  <p className="text-sm text-slate-500">We typically respond within 24 hours</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Phone className="w-8 h-8 text-green-600 mb-2" />
                  <CardTitle className="text-lg">Phone Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-2">+1 (555) 123-4567</p>
                  <p className="text-sm text-slate-500">Mon-Fri, 9AM-5PM EST</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Clock className="w-8 h-8 text-purple-600 mb-2" />
                  <CardTitle className="text-lg">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-2">Usually within 4 hours</p>
                  <p className="text-sm text-slate-500">During business hours</p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" type="text" required className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" required className="mt-1" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" type="text" required className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      required 
                      rows={6} 
                      className="mt-1"
                      placeholder="Please describe your issue or question in detail..."
                    />
                  </div>
                  
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Is my data secure?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      Yes, all image processing happens locally in your browser. Your images never leave your device 
                      and are not uploaded to our servers, ensuring complete privacy and security.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What file formats are supported?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      Currently, we support JPEG and JPG files. We're working on adding support for PNG 
                      and other image formats in future updates.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Is there a file size limit?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      There's no strict file size limit, but very large files may take longer to process. 
                      We recommend files under 50MB for optimal performance.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How many files can I process at once?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">
                      You can upload and process multiple files simultaneously. Our batch processing system 
                      can handle dozens of files efficiently with configurable concurrency settings.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Sidebar with Ads */}
          <div className="lg:col-span-1">
            <AdSenseSidebar />
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/privacy" className="block text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </Link>
                <Link href="/about" className="block text-blue-600 hover:text-blue-800">
                  About Us
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