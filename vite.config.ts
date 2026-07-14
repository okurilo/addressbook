import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export const config = defineConfig({
  server: {
    proxy: {
      '/api-mobile': {
        target: 'https://hr-dev.sberbank.ru',
        changeOrigin: true,
        secure: false,
      },
      '/api-web': {
        target: 'https://hr-dev.sberbank.ru',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: [
      { find: /^.*\.svg$/, replacement: resolve(__dirname, 'src/host/svgComponentStub.tsx') },
      { find: '@pulse/ui/components', replacement: resolve(__dirname, 'src/stubs/pulse/ui') },
      { find: '@pulse/ui/theme', replacement: resolve(__dirname, 'src/host/pulseTheme.ts') },
      { find: '@pulse', replacement: resolve(__dirname, 'src/stubs/pulse') },
      { find: '@hrplatform/utils', replacement: resolve(__dirname, 'src/host/hrplatformUtils.ts') },
      { find: '@sber-hrp-core/api-breadcrumbs', replacement: resolve(__dirname, 'src/host/breadcrumbs.ts') },
      { find: 'react-i18next', replacement: resolve(__dirname, 'src/host/reactI18next.ts') },
      { find: 'i18next', replacement: resolve(__dirname, 'src/host/i18next.ts') },
    ],
  },
});

export default config;
