import { ArrowLeft, Search, HelpCircle, Lightbulb, FileImage, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'wouter';
import { AdSenseRectangle, AdSenseSidebar } from '@/components/adsense-banner';
import { useState } from 'react';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqItems = [
    {
      id: '1',
      category: 'Getting Started',
      question: 'How do I compress JPEG images?',
      answer: 'Simply drag and drop your JPEG files onto the upload zone or click to browse and select files. The tool will automatically process them in your browser without uploading to any server.'
    },
    {
      id: '2', 
      category: 'Privacy & Security',
      question: 'Are my images uploaded to your servers?',
      answer: 'No, absolutely not. All image processing happens locally in your web browser using JavaScript. Your images never leave your device, ensuring complete privacy and security.'
    },
    {
      id: '3',
      category: 'File Formats',
      question: 'What file formats are supported?',
      answer: 'Currently, we support JPEG and JPG files. We\'re working on adding support for PNG, WebP, and other formats in future updates.'
    },
    {
      id: '4',
      category: 'Quality Control', 
      question: 'How do I control compression quality?',
      answer: 'Use the quality slider in the settings panel. Higher values preserve more quality but result in larger files. Our quality assessment system provides recommendations for optimal settings.'
    },
    {
      id: '5',
      category: 'Batch Processing',
      question: 'Can I compress multiple files at once?',
      answer: 'Yes! Our batch processing system can handle multiple files simultaneously. You can configure how many files process at once (1-6 concurrent) and monitor progress in real-time.'
    },
    {
      id: '6',
      category: 'File Size Limits',
      question: 'Is there a file size limit?',
      answer: 'There\'s no strict file size limit, but very large files (over 50MB) may take longer to process and could potentially cause browser memory issues. We recommend keeping files under 50MB for optimal performance.'
    },
    {
      id: '7',
      category: 'Output Formats',
      question: 'Can I convert JPEG to WebP?',
      answer: 'Yes, you can choose WebP as the output format in the compression settings. WebP typically provides better compression than JPEG while maintaining similar quality.'
    },
    {
      id: '8',
      category: 'Browser Compatibility',
      question: 'Which browsers are supported?',
      answer: 'The tool works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your browser for the best experience.'
    },
    {
      id: '9',
      category: 'Troubleshooting',
      question: 'What if compression fails?',
      answer: 'If compression fails, try refreshing the page and uploading the file again. Ensure your browser is up to date and you have sufficient memory available. Very large or corrupted files may cause issues.'
    },
    {
      id: '10',
      category: 'Performance',
      question: 'How can I speed up compression?',
      answer: 'Increase the concurrent processing limit in batch settings, ensure you have sufficient RAM, close other browser tabs, and avoid processing extremely large files. Smaller images compress faster.'
    },
    {
      id: '11',
      category: 'Image Resizing',
      question: 'Can I resize images during compression?',
      answer: 'Yes, you can set a maximum width for your images in the compression settings. This is useful for web optimization where you need specific dimensions.'
    },
    {
      id: '12',
      category: 'Quality Assessment',
      question: 'What do the quality ratings mean?',
      answer: 'Our system rates compression results as Excellent (great quality with good size reduction), Good (minor quality loss), Acceptable (noticeable but usable), or Poor (significant quality loss or insufficient compression).'
    }
  ];

  const filteredFAQ = faqItems.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h1 className="text-2xl font-bold text-slate-900">Help Center</h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">How can we help you?</h2>
              <p className="text-lg text-slate-600 mb-6">
                Find answers to common questions about using our JPEG compression tool.
              </p>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <Input
                  type="text"
                  placeholder="Search help articles..."
                  className="pl-10 py-3 text-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Quick Help Categories */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <FileImage className="w-8 h-8 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">Getting Started</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Learn the basics of uploading and compressing your images.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <Settings className="w-8 h-8 text-green-600 mb-2" />
                  <CardTitle className="text-lg">Advanced Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Explore batch processing, quality control, and format options.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <HelpCircle className="w-8 h-8 text-purple-600 mb-2" />
                  <CardTitle className="text-lg">Troubleshooting</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">Solve common issues and optimize your compression workflow.</p>
                </CardContent>
              </Card>
            </div>

            <AdSenseRectangle />

            {/* FAQ Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Frequently Asked Questions
                {searchQuery && (
                  <span className="text-lg font-normal text-slate-600 ml-2">
                    ({filteredFAQ.length} results)
                  </span>
                )}
              </h3>

              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQ.map((item) => (
                  <AccordionItem key={item.id} value={item.id} className="bg-white rounded-lg border">
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                          {item.category}
                        </div>
                        <span className="font-medium text-slate-900">{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredFAQ.length === 0 && searchQuery && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No results found</h3>
                    <p className="text-slate-600">
                      Try searching with different keywords or{' '}
                      <Link href="/contact" className="text-blue-600 hover:text-blue-800">
                        contact our support team
                      </Link>{' '}
                      for help.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Tips & Best Practices */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Lightbulb className="w-6 h-6 text-yellow-600 mr-2" />
                  Tips & Best Practices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Optimal Compression Settings</h4>
                  <p className="text-slate-600">
                    For web use, aim for 70-85% quality. For print materials, use 85-95% quality. 
                    Our quality assessment tool will help you find the perfect balance.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Batch Processing Tips</h4>
                  <p className="text-slate-600">
                    Process similar images together for consistent results. Start with 3 concurrent files 
                    and increase if your computer handles it well. Close other applications for better performance.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">File Organization</h4>
                  <p className="text-slate-600">
                    Always keep backups of your original images. Name compressed files consistently 
                    (e.g., "image_compressed.jpg") to distinguish them from originals.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Browser Performance</h4>
                  <p className="text-slate-600">
                    For best results, use Chrome or Firefox with the latest updates. Clear browser cache 
                    if you experience issues. Ensure you have at least 4GB of available RAM for large files.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Still Need Help */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Still Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Can't find what you're looking for? Our support team is here to help you get the most 
                  out of our compression tool.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Contact Support
                    </Button>
                  </Link>
                  
                  <Link href="/about">
                    <Button variant="outline">
                      Learn More About Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AdSenseSidebar />
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/compress" className="block text-blue-600 hover:text-blue-800">
                  Start Compressing
                </Link>
                <Link href="/about" className="block text-blue-600 hover:text-blue-800">
                  About Our Tool
                </Link>
                <Link href="/privacy" className="block text-blue-600 hover:text-blue-800">
                  Privacy Policy
                </Link>
                <Link href="/contact" className="block text-blue-600 hover:text-blue-800">
                  Contact Support
                </Link>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Popular Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-slate-900">How secure is the compression?</p>
                  <p className="text-slate-600">100% secure - everything happens in your browser.</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Can I compress hundreds of files?</p>
                  <p className="text-slate-600">Yes, our batch system handles large quantities efficiently.</p>
                </div>
                <div>
                  <p className="font-medium text-slate-900">What's the best quality setting?</p>
                  <p className="text-slate-600">80% quality works well for most use cases.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}