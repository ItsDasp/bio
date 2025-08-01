import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
  // Enable static exports for GitHub Pages
  output: isGitHubPages ? 'export' : undefined,
  
  // Disable image optimization for static export
  images: {
    unoptimized: isGitHubPages,
  },
  
  // Configure base path for GitHub Pages
  basePath: isGitHubPages ? '/bio' : '',
  assetPrefix: isGitHubPages ? '/bio' : '',
  
  // Ensure trailing slash consistency
  trailingSlash: true,
  
  // Optimize for production
  compress: true,
  poweredByHeader: false,
  
  // Configure headers for better performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
