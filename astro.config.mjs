import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://github.io',
  base: '/audioupgrade-emmen',
  trailingSlash: 'never',
  build: { format: 'file' },
  vite: {
    server: {
      allowedHosts: ['.lhr.life', '.localhost.run']
    }
  }
});
