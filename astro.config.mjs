import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://theclawfather.ai',
  integrations: [sitemap(), react(), tailwind({ applyBaseStyles: false })],
  vite: {
    ssr: {
      noExternal: ['@fluentui/react-icons'],
    },
    server: {
      allowedHosts: ['thes-mac-mini.tail731a99.ts.net'],
    },
  },
});
