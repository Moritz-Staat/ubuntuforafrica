import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Kein `output: 'standalone'`: Vercel braucht es nicht und die Testumgebung
  // startet mit `next start` – damit warnt Next sonst bei jedem Start.
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      // Instagram liefert Bilder über wechselnde CDN-Hosts aus.
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: '**.fbcdn.net' },
    ],
  },
};

export default withNextIntl(nextConfig);
