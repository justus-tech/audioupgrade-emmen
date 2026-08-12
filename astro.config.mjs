import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://audioupgradeemmen.nl',
  trailingSlash: 'never',
  build: { format: 'file' }
});
