import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    port: 5180,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        tandem: resolve(root, 'research/tandem.html'),
        cooperative: resolve(root, 'research/cooperative-ai.html'),
        selflearning: resolve(root, 'research/self-learning.html'),
        neuroplastic: resolve(root, 'research/neuroplastic.html'),
      },
    },
  },
});
