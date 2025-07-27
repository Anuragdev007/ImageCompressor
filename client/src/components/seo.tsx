import { Helmet } from "react-helmet-async";

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: string;
}

export default function Seo({ 
  title = "JPEG Compressor - Smart Image Compression Tool",
  description = "Compress JPEG images without losing quality. Free online tool with batch processing, quality control, and format conversion. Process multiple files securely in your browser.",
  canonical,
  image = "/og-image.jpg",
  type = "website"
}: SeoProps) {
  const fullTitle = title.includes("JPEG Compressor") ? title : `${title} | JPEG Compressor`;
  const fullImageUrl = image.startsWith('http') ? image : `https://jpegcompressor.com${image}`;
  const fullCanonical = canonical ? `https://jpegcompressor.com${canonical}` : undefined;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={fullImageUrl} />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      
      {/* Twitter Card */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
    </Helmet>
  );
}
