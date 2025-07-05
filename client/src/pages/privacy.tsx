import { ArrowLeft, Shield, Eye, Lock, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import { AdSenseRectangle, AdSenseSidebar } from '@/components/adsense-banner';

export default function Privacy() {
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
            <h1 className="text-2xl font-bold text-slate-900">Privacy Policy</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Privacy Policy</h2>
              <p className="text-lg text-slate-600 mb-4">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-slate-600">
                Your privacy is critically important to us. This Privacy Policy explains how we collect, 
                use, and protect your information when you use our JPEG compression service.
              </p>
            </div>

            {/* Privacy Highlights */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <Shield className="w-8 h-8 text-green-600 mb-2" />
                  <CardTitle className="text-lg">No File Upload</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Your images are processed entirely in your browser. We never upload, store, or access your files.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Lock className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">Local Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    All compression happens on your device using client-side JavaScript. Maximum privacy guaranteed.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Eye className="w-8 h-8 text-purple-600 mb-2" />
                  <CardTitle className="text-lg">No Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    We don't track your usage patterns or store personal information beyond basic analytics.
                  </p>
                </CardContent>
              </Card>
            </div>

            <AdSenseRectangle />

            {/* Detailed Privacy Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Information We Collect</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">1. Image Files</h4>
                    <p className="text-slate-600">
                      We do NOT collect, store, or transmit your image files. All image processing occurs locally 
                      in your web browser using JavaScript. Your images never leave your device.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">2. Usage Analytics</h4>
                    <p className="text-slate-600">
                      We may collect anonymous usage statistics such as page views, feature usage, and general 
                      performance metrics to improve our service. This data is aggregated and cannot be used to 
                      identify individual users.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">3. Contact Information</h4>
                    <p className="text-slate-600">
                      When you contact us through our support form, we collect your name and email address solely 
                      for the purpose of responding to your inquiry.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">How We Use Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Service Improvement</h4>
                    <p className="text-slate-600">
                      Anonymous usage data helps us understand how users interact with our tool so we can 
                      make improvements and add new features.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Customer Support</h4>
                    <p className="text-slate-600">
                      Contact information is used solely to respond to your support requests and provide assistance.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Legal Compliance</h4>
                    <p className="text-slate-600">
                      We may process information when required by law or to protect our rights and the rights of others.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Data Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">
                    We implement appropriate technical and organizational security measures to protect against 
                    unauthorized access, alteration, disclosure, or destruction of information. However, since 
                    your image files are processed locally and never transmitted to our servers, the primary 
                    security responsibility lies with your own device and browser security.
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Encryption</h4>
                    <p className="text-slate-600">
                      Our website uses HTTPS encryption to protect data transmission between your browser and our servers.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Browser Security</h4>
                    <p className="text-slate-600">
                      Image processing relies on your browser's built-in security features. We recommend keeping 
                      your browser updated for optimal security.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Third-Party Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Google AdSense</h4>
                    <p className="text-slate-600">
                      We use Google AdSense to display advertisements. Google may collect information about your 
                      visits to this and other websites to provide targeted ads. You can opt out of personalized 
                      advertising by visiting Google's Ads Settings.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Analytics</h4>
                    <p className="text-slate-600">
                      We may use analytics services to understand how our website is used. These services may 
                      use cookies and similar technologies to collect usage information.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Your Rights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>
                  
                  <ul className="list-disc list-inside space-y-2 text-slate-600">
                    <li>The right to access and receive a copy of your personal information</li>
                    <li>The right to rectify or update your personal information</li>
                    <li>The right to delete your personal information</li>
                    <li>The right to restrict processing of your personal information</li>
                    <li>The right to data portability</li>
                    <li>The right to object to processing</li>
                  </ul>
                  
                  <p className="text-slate-600">
                    To exercise these rights, please contact us using the information provided in our Contact page.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Cookies and Tracking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">
                    We use minimal cookies and tracking technologies:
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Essential Cookies</h4>
                    <p className="text-slate-600">
                      Required for the website to function properly, such as remembering your compression settings.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Analytics Cookies</h4>
                    <p className="text-slate-600">
                      Help us understand how visitors use our website to improve user experience.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Advertising Cookies</h4>
                    <p className="text-slate-600">
                      Used by Google AdSense to serve relevant advertisements.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Children's Privacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Our service is not directed to children under 13 years of age. We do not knowingly collect 
                    personal information from children under 13. If you are a parent or guardian and believe 
                    your child has provided personal information, please contact us to have it removed.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Changes to This Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by 
                    posting the new Privacy Policy on this page and updating the "Last updated" date. You are 
                    advised to review this Privacy Policy periodically for any changes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  
                  <div className="space-y-2 text-slate-600">
                    <p>Email: privacy@jpegcompressor.com</p>
                    <p>Phone: +1 (555) 123-4567</p>
                    <p>
                      Address: 123 Privacy Street, Secure City, SC 12345, United States
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AdSenseSidebar />
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/contact" className="block text-blue-600 hover:text-blue-800">
                  Contact Support
                </Link>
                <Link href="/about" className="block text-blue-600 hover:text-blue-800">
                  About Us
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