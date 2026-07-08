import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export const config = defineConfig({
  resolve: {
    alias: {
      '@pulse': resolve(__dirname, 'src/stubs/pulse'),
    },
  },
});

export default config;
