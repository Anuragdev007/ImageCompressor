import { useLocation } from 'wouter';
import { FileImage, Mail, Phone, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  const [location, navigate] = useLocation();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    tools: [
      { name: 'JPEG Compressor', href: '/compressor' },
      { name: 'Background Remover', href: '/background-remover' },
      { name: 'Digital Signature', href: '/digital-signature' },
      { name: 'PDF to JPG', href: '/convert/pdf-to-jpg' },
      { name: 'PNG to JPG', href: '/convert/png-to-jpg' },
      { name: 'Image Format Converter', href: '/convert/image-formats' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Help & FAQ', href: '/help' },
      { name: 'Blog', href: '/blog' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
    resources: [
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'Best Practices', href: '/best-practices' },
    ]
  };

  const handleLinkClick = (href: string) => {
    navigate(href);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4 cursor-pointer" onClick={() => handleLinkClick('/')}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileImage className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">JPEG Compressor</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
            Professional image tools for compression, background removal, format conversion, and digital signatures. All processing happens locally in your browser for maximum privacy and security.
            </p>
          
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Tools</h3>
            <ul className="space-y-2">
              {footerLinks.tools.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-white transition-colors text-sm text-left w-full"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-white transition-colors text-sm text-left w-full"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-white transition-colors text-sm text-left w-full"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
            
            <h3 className="font-semibold text-lg mb-4 mt-6">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-gray-300 hover:text-white transition-colors text-sm text-left w-full"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="w-4 h-4" />
                <span className="text-sm">bhardwajanurag546@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91-8700533401</span>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              © {currentYear} JPEG Compressor. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
