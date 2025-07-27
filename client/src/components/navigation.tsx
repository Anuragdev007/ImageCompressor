import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'JPEG Compressor', href: '/compressor' },
    { name: 'Background Remover', href: '/background-remover' },
    {
      name: 'File Converters',
      href: '#',
      submenu: [
        { name: 'PDF to JPG', href: '/convert/pdf-to-jpg' },
        { name: 'JPG to WebP', href: '/convert/jpg-to-webp' },
        { name: 'PNG to JPG', href: '/convert/png-to-jpg' },
        { name: 'Image Format Converter', href: '/convert/image-formats' },
      ]
    },
    { name: 'Digital Signature', href: '/digital-signature' },
    { name: 'Help', href: '/help' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JC</span>
                </div>
                <span className="font-bold text-xl text-gray-900">JPEG Compressor</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <div>
                    <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium",
                      location === item.href && "text-blue-600"
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div>
                      <div className="text-gray-700 block px-3 py-2 text-base font-medium">
                        {item.name}
                      </div>
                      <div className="pl-6">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="text-gray-600 block px-3 py-2 text-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-700 block px-3 py-2 text-base font-medium"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
