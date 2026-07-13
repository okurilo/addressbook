import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export const config = defineConfig({
  server: {
    proxy: {
      '/api-web': {
        target: 'https://hr-dev.sberbank.ru',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      '@pulse/ui/components': resolve(__dirname, 'src/stubs/pulse/ui'),
      '@pulse/ui/theme': resolve(__dirname, 'src/host/pulseTheme.ts'),
      '@pulse': resolve(__dirname, 'src/stubs/pulse'),
      '@hrplatform/utils': resolve(__dirname, 'src/host/hrplatformUtils.ts'),
      '@sber-hrp-core/api-breadcrumbs': resolve(__dirname, 'src/host/breadcrumbs.ts'),
      'react-i18next': resolve(__dirname, 'src/host/reactI18next.ts'),
      i18next: resolve(__dirname, 'src/host/i18next.ts'),
    },
  },
});

export default config;
