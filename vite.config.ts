import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vite';

const importedAddressbookSvgPrefix = '\0imported-addressbook-svg:';

const importedAddressbookSvgPlugin = {
  name: 'imported-addressbook-svg-compat',
  enforce: 'pre' as const,
  resolveId(source: string, importer?: string): string | null {
    if (
      source.endsWith('.svg') &&
      importer?.includes('/src/Components/Adressbook/') === true
    ) {
      return `${importedAddressbookSvgPrefix}${resolve(dirname(importer), source)}`;
    }

    return null;
  },
  load(id: string): string | null {
    if (!id.startsWith(importedAddressbookSvgPrefix)) {
      return null;
    }

    const svgSource = readFileSync(id.slice(importedAddressbookSvgPrefix.length), 'utf8');
    const viewBox = svgSource.match(/viewBox=["']([^"']+)["']/)?.[1] ?? '0 0 24 24';
    const svgBody = svgSource
      .replace(/^\s*<svg\b[^>]*>/, '')
      .replace(/<\/svg>\s*$/, '')
      .trim();

    return [
      "import { createElement } from 'react';",
      `const svgBody = ${JSON.stringify(svgBody)};`,
      'export const ReactComponent = (props) =>',
      `  createElement('svg', { ...props, viewBox: ${JSON.stringify(viewBox)},`,
      "    'aria-hidden': props['aria-label'] === undefined ? true : undefined,",
      '    dangerouslySetInnerHTML: { __html: svgBody }',
      '  });',
    ].join('\n');
  },
};

export const config = defineConfig({
  plugins: [importedAddressbookSvgPlugin],
  server: {
    proxy: {
      '/api-web': {
        target: 'https://hr-dev.sberbank.ru',
        changeOrigin: true,
        secure: false,
      },
      '/api-mobile': {
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
