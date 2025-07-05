import { useEffect } from 'react';

interface AdSenseBannerProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  adSize?: {
    width: number;
    height: number;
  };
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdSenseBanner({ 
  adSlot, 
  adFormat = 'auto', 
  adSize,
  className = '' 
}: AdSenseBannerProps) {
  useEffect(() => {
    // Check if we're in the browser and AdSense script is loaded
    if (typeof window !== 'undefined' && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        console.error('AdSense error:', error);
      }
    }
  }, []);

  // Don't render ads in development
  if (import.meta.env.DEV) {
    return (
      <div className={`bg-slate-100 border-2 border-dashed border-slate-300 rounded-lg p-4 text-center text-slate-500 ${className}`}>
        <p>Advertisement Placeholder</p>
        <p className="text-xs">AdSense ads will appear here in production</p>
      </div>
    );
  }

  const style = adSize ? {
    width: `${adSize.width}px`,
    height: `${adSize.height}px`,
    display: 'block'
  } : {
    display: 'block'
  };

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID || "ca-pub-0000000000000000"}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Component for easy insertion in different layouts
export function AdSenseHeader() {
  return (
    <AdSenseBanner
      adSlot="1234567890"
      adFormat="horizontal"
      className="my-4"
    />
  );
}

export function AdSenseSidebar() {
  return (
    <AdSenseBanner
      adSlot="0987654321"
      adFormat="vertical"
      adSize={{ width: 300, height: 600 }}
      className="my-4"
    />
  );
}

export function AdSenseRectangle() {
  return (
    <AdSenseBanner
      adSlot="5555555555"
      adFormat="rectangle"
      adSize={{ width: 336, height: 280 }}
      className="my-4 mx-auto"
    />
  );
}

export function AdSenseSquare() {
  return (
    <AdSenseBanner
      adSlot="1111111111"
      adFormat="rectangle"
      adSize={{ width: 250, height: 250 }}
      className="my-4"
    />
  );
}

export function AdSenseSkyscraper() {
  return (
    <AdSenseBanner
      adSlot="2222222222"
      adFormat="vertical"
      adSize={{ width: 160, height: 600 }}
      className="my-4"
    />
  );
}

export function AdSenseLeaderboard() {
  return (
    <AdSenseBanner
      adSlot="3333333333"
      adFormat="horizontal"
      adSize={{ width: 728, height: 90 }}
      className="my-4 mx-auto"
    />
  );
}

export function AdSenseMobile() {
  return (
    <AdSenseBanner
      adSlot="4444444444"
      adFormat="rectangle"
      adSize={{ width: 320, height: 50 }}
      className="my-4 mx-auto block md:hidden"
    />
  );
}