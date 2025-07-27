import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';

const blogPosts = [
  {
    id: 1,
    title: "The Complete Guide to Image Compression for Web Performance",
    excerpt: "Learn how to optimize images for faster loading websites without sacrificing quality. Covers JPEG, PNG, WebP formats and best practices.",
    author: "Tech Team",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Web Performance"
  },
  {
    id: 2,
    title: "JPEG vs WebP vs AVIF: Which Format Should You Use in 2024?",
    excerpt: "A comprehensive comparison of modern image formats, their compression ratios, browser support, and when to use each format.",
    author: "Tech Team",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Formats"
  },
  {
    id: 3,
    title: "Understanding Image Quality: PSNR, SSIM, and Visual Perception",
    excerpt: "Deep dive into image quality metrics and how they relate to human visual perception. Learn to balance file size and quality.",
    author: "Tech Team", 
    date: "2024-01-05",
    readTime: "10 min read",
    category: "Technical"
  }
];

export default function Blog() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Image Optimization Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Expert insights, tutorials, and best practices for image compression, 
          web performance, and digital asset optimization.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  {post.category}
                </span>
                <span>{post.readTime}</span>
              </div>
              <CardTitle className="text-xl leading-tight">
                {post.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <Button variant="ghost" className="w-full mt-4 justify-between">
                Read More <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Topics */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Topics</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "Image Compression Basics",
            "Web Performance Optimization", 
            "File Format Comparison",
            "SEO for Images"
          ].map((topic) => (
            <Card key={topic} className="text-center p-6 hover:shadow-md transition-shadow cursor-pointer">
              <CardContent>
                <h3 className="font-semibold text-gray-900">{topic}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
