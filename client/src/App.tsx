import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "@/components/scroll-to-top"; // Add this

// Pages
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Contact from "@/pages/contact";
import Privacy from "@/pages/privacy";
import About from "@/pages/about";
import Terms from "@/pages/terms";
import Help from "@/pages/help";
import Blog from "@/pages/blog";

// Components
import { BackgroundRemover } from "@/components/background-remover";
import { DigitalSignature } from "@/components/digital-signature";
import { FileConverter } from "@/components/file-converter";

// Converters
import { convertPdfToPng } from "@/lib/pdf-converter";
import { pngToJpg, jpgToWebp, convertImageFormat } from "@/lib/image-converter";

function Router() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      <main className="flex-1">
         <ScrollToTop /> {/* Add this */}
        <Switch>
          <Route path="/" component={Landing} />
          <Route path="/compressor" component={Home} />
          <Route path="/background-remover" component={BackgroundRemover} />
          <Route path="/digital-signature" component={DigitalSignature} />

          {/* PDF to JPG */}
          <Route path="/convert/pdf-to-jpg">
            <FileConverter
              title="PDF to JPG Converter"
              description="Convert PDF documents to high-quality JPG images. Each page of your PDF will be converted to a separate JPG file with professional quality."
              acceptedTypes={{ "application/pdf": [".pdf"] }}
              targetFormat="jpg"
              converter={convertPdfToPng}
            />
          </Route>

          {/* PNG to JPG */}
          <Route path="/convert/png-to-jpg">
            <FileConverter
              title="PNG to JPG Converter"
              description="Convert PNG images to JPG format for smaller file sizes. Transparent backgrounds will be replaced with white background."
              acceptedTypes={{ "image/png": [".png"] }}
              targetFormat="jpg"
              converter={(file) => pngToJpg(file, 0.95)}
            />
          </Route>

          {/* JPG to WebP */}
          <Route path="/convert/jpg-to-webp">
            <FileConverter
              title="JPG to WebP Converter"
              description="Convert JPG images to modern WebP format for better compression and faster web loading times while maintaining excellent quality."
              acceptedTypes={{ "image/jpeg": [".jpg", ".jpeg"] }}
              targetFormat="webp"
              converter={(file) => jpgToWebp(file, 0.9)}
            />
          </Route>

          {/* Universal Image Format Converter */}
          <Route path="/convert/image-formats">
            <ImageFormatConverter />
          </Route>

          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/about" component={About} />
          <Route path="/terms" component={Terms} />
          <Route path="/help" component={Help} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

// Universal Image Format Converter Component
function ImageFormatConverter() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Universal Image Format Converter
        </h1>
        <p className="text-gray-600">
          Convert between all popular image formats: JPG, PNG, WebP, GIF, BMP.
          Supports batch conversion with quality control and resizing options.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* JPG to PNG */}
        <FileConverter
          title="JPG to PNG"
          description="Convert JPG to PNG with transparency support"
          acceptedTypes={{ "image/jpeg": [".jpg", ".jpeg"] }}
          targetFormat="png"
          converter={(file) => convertImageFormat(file, "png")}
        />

        {/* PNG to JPG */}
        <FileConverter
          title="PNG to JPG"
          description="Convert PNG to JPG with white background"
          acceptedTypes={{ "image/png": [".png"] }}
          targetFormat="jpg"
          converter={(file) => pngToJpg(file)}
        />

        {/* JPG to WebP */}
        <FileConverter
          title="JPG to WebP"
          description="Convert JPG to modern WebP format"
          acceptedTypes={{ "image/jpeg": [".jpg", ".jpeg"] }}
          targetFormat="webp"
          converter={(file) => jpgToWebp(file)}
        />

        {/* PNG to WebP */}
        <FileConverter
          title="PNG to WebP"
          description="Convert PNG to WebP with transparency"
          acceptedTypes={{ "image/png": [".png"] }}
          targetFormat="webp"
          converter={(file) =>
            convertImageFormat(file, "webp", { quality: 0.9 })
          }
        />

        {/* WebP to JPG */}
        <FileConverter
          title="WebP to JPG"
          description="Convert WebP to widely compatible JPG"
          acceptedTypes={{ "image/webp": [".webp"] }}
          targetFormat="jpg"
          converter={(file) =>
            convertImageFormat(file, "jpeg", { quality: 0.95 })
          }
        />

        {/* WebP to PNG */}
        <FileConverter
          title="WebP to PNG"
          description="Convert WebP to PNG with transparency"
          acceptedTypes={{ "image/webp": [".webp"] }}
          targetFormat="png"
          converter={(file) => convertImageFormat(file, "png")}
        />
      </div>
    </div>
  );
}

function App() {
  return (
     <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
