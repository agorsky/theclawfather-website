import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://theclawfather.ai',
  output: 'hybrid',
  adapter: vercel(),
});
