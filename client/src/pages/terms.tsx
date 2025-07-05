import { ArrowLeft, Scale, AlertCircle, Shield, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'wouter';
import { AdSenseRectangle, AdSenseSidebar } from '@/components/adsense-banner';

export default function Terms() {
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
            <h1 className="text-2xl font-bold text-slate-900">Terms of Service</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Terms of Service</h2>
              <p className="text-lg text-slate-600 mb-4">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  By using our JPEG compression service, you agree to these Terms of Service. 
                  Please read them carefully before using our website.
                </AlertDescription>
              </Alert>
            </div>

            {/* Key Points */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <Scale className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">Fair Use</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Use our service responsibly and in accordance with applicable laws and regulations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="w-8 h-8 text-green-600 mb-2" />
                  <CardTitle className="text-lg">No Liability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Service provided "as is" without warranties. You're responsible for backing up your files.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <FileText className="w-8 h-8 text-purple-600 mb-2" />
                  <CardTitle className="text-lg">Content Rights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    You retain all rights to your images. We don't claim ownership of your content.
                  </p>
                </CardContent>
              </Card>
            </div>

            <AdSenseRectangle />

            {/* Detailed Terms */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">1. Acceptance of Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">
                    By accessing and using JPEG Compressor ("the Service"), you accept and agree to be bound by 
                    the terms and provision of this agreement. If you do not agree to abide by the above, 
                    please do not use this service.
                  </p>
                  
                  <p className="text-slate-600">
                    These Terms of Service ("Terms") govern your use of our website located at jpegcompressor.com 
                    (the "Service") operated by JPEG Compressor ("us", "we", or "our").
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">2. Description of Service</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">
                    JPEG Compressor is a web-based image compression tool that allows users to reduce the file 
                    size of JPEG images while maintaining visual quality. The service processes images entirely 
                    within the user's web browser using client-side JavaScript.
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Service Features:</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 ml-4">
                      <li>Local image processing (no file uploads to our servers)</li>
                      <li>Batch processing capabilities</li>
                      <li>Quality control and assessment tools</li>
                      <li>Multiple output format options</li>
                      <li>Before/after comparison features</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">3. User Responsibilities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">You agree to:</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 ml-4">
                      <li>Use the service only for lawful purposes</li>
                      <li>Not attempt to circumvent any security measures</li>
                      <li>Not overload or abuse the service infrastructure</li>
                      <li>Respect intellectual property rights of others</li>
                      <li>Not use the service to process illegal or inappropriate content</li>
                      <li>Maintain the security of your own devices and browsers</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Content Guidelines:</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 ml-4">
                      <li>Only process images you own or have permission to modify</li>
                      <li>Do not process images containing illegal content</li>
                      <li>Respect privacy rights when processing images of people</li>
                      <li>Comply with applicable copyright and trademark laws</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">4. Service Availability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">
                    We strive to maintain high availability of our service, but we do not guarantee uninterrupted 
                    access. The service may be temporarily unavailable due to:
                  </p>
                  
                  <ul className="list-disc list-inside space-y-1 text-slate-600 ml-4">
                    <li>Scheduled maintenance and updates</li>
                    <li>Technical difficulties or server issues</li>
                    <li>Circumstances beyond our reasonable control</li>
                    <li>Security incidents requiring temporary shutdown</li>
                  </ul>
                  
                  <p className="text-slate-600">
                    We reserve the right to modify, suspend, or discontinue the service at any time 
                    without prior notice.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">5. Privacy and Data Processing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">
                    Your privacy is important to us. Our image compression service is designed with 
                    privacy by design principles:
                  </p>
                  
                  <ul className="list-disc list-inside space-y-1 text-slate-600 ml-4">
                    <li>All image processing occurs locally in your browser</li>
                    <li>Your images are never uploaded to our servers</li>
                    <li>We don't store or have access to your image files</li>
                    <li>Minimal data collection as outlined in our Privacy Policy</li>
                  </ul>
                  
                  <p className="text-slate-600">
                    For complete details on data handling, please review our 
                    <Link href="/privacy" className="text-blue-600 hover:text-blue-800 ml-1">
                      Privacy Policy
                    </Link>.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">6. Intellectual Property</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Your Content:</h4>
                    <p className="text-slate-600">
                      You retain all ownership rights to images you process using our service. We do not 
                      claim any ownership or rights to your content.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Our Service:</h4>
                    <p className="text-slate-600">
                      The JPEG Compressor service, including its design, code, algorithms, and documentation, 
                      is protected by copyright and other intellectual property laws. You may not copy, 
                      modify, or redistribute our code without permission.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Third-Party Content:</h4>
                    <p className="text-slate-600">
                      Our service may include third-party libraries, frameworks, and components, each 
                      governed by their respective licenses.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">7. Disclaimers and Limitations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Service "AS IS":</h4>
                    <p className="text-slate-600">
                      The service is provided "as is" and "as available" without warranties of any kind, 
                      either express or implied, including but not limited to warranties of merchantability, 
                      fitness for a particular purpose, and non-infringement.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Quality Results:</h4>
                    <p className="text-slate-600">
                      While we strive to provide high-quality compression algorithms, we cannot guarantee 
                      that the compressed images will meet your specific requirements or expectations.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Browser Compatibility:</h4>
                    <p className="text-slate-600">
                      The service relies on modern web browser features. We cannot guarantee compatibility 
                      with all browsers or devices.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">8. Limitation of Liability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">
                    To the maximum extent permitted by applicable law, JPEG Compressor shall not be liable 
                    for any indirect, incidental, special, consequential, or punitive damages, or any loss 
                    of profits or revenues, whether incurred directly or indirectly, or any loss of data, 
                    use, goodwill, or other intangible losses.
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Specific Limitations:</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 ml-4">
                      <li>Loss or corruption of image files</li>
                      <li>Unsatisfactory compression results</li>
                      <li>Service interruptions or downtime</li>
                      <li>Browser crashes or technical issues</li>
                      <li>Any damages arising from use of the service</li>
                    </ul>
                  </div>
                  
                  <p className="text-slate-600">
                    <strong>Important:</strong> Always maintain backups of your original images before processing.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">9. Indemnification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    You agree to defend, indemnify, and hold harmless JPEG Compressor and its affiliates, 
                    officers, directors, employees, and agents from and against any claims, damages, 
                    obligations, losses, liabilities, costs, or debt, and expenses (including attorney's fees) 
                    arising from your use of the service or violation of these Terms.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">10. Advertising and Third-Party Services</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-600">
                    Our service may display advertisements provided by third parties, including Google AdSense. 
                    These advertisements help us maintain the service as a free offering.
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Third-Party Policies:</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 ml-4">
                      <li>Third-party services have their own terms and privacy policies</li>
                      <li>We are not responsible for third-party content or services</li>
                      <li>Ad blockers may affect service functionality</li>
                      <li>Clicking on ads may redirect you to external websites</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">11. Modifications to Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    We reserve the right to modify these Terms of Service at any time. Changes will be 
                    effective immediately upon posting on this page. Your continued use of the service 
                    after changes are posted constitutes acceptance of the modified terms.
                  </p>
                  
                  <p className="text-slate-600 mt-4">
                    We encourage you to review these Terms periodically to stay informed of any updates.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">12. Termination</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    We may terminate or suspend your access to the service immediately, without prior notice 
                    or liability, for any reason, including breach of these Terms. Upon termination, your 
                    right to use the service will cease immediately.
                  </p>
                  
                  <p className="text-slate-600 mt-4">
                    You may discontinue use of the service at any time without notice.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">13. Governing Law</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    These Terms shall be interpreted and governed by the laws of the United States, 
                    without regard to conflict of law provisions. Any disputes arising from these Terms 
                    or use of the service will be subject to the jurisdiction of the courts in the 
                    United States.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">14. Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  
                  <div className="space-y-2 text-slate-600">
                    <p>Email: bhardwajanurag546@gmail.com</p>
                    <p>Phone: +91-8700533401</p>
                   
                  </div>
                  
                  <div className="mt-6">
                    <Link href="/contact">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Contact Support
                      </Button>
                    </Link>
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
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Important Notice</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Always backup your original images before processing. While our service processes 
                    files locally, technical issues can occur.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}