import { resolve } from 'node:path';
import { defineConfig } from 'vite';
var importedAddressbookSvgPlugin = {
    name: 'imported-addressbook-svg-mocks',
    enforce: 'pre',
    resolveId: function (source, importer) {
        if (source.endsWith('.svg') &&
            (importer === null || importer === void 0 ? void 0 : importer.includes('/src/Components/Adressbook/')) === true) {
            return "\0imported-addressbook-svg:".concat(source);
        }
        return null;
    },
    load: function (id) {
        if (!id.startsWith('\0imported-addressbook-svg:')) {
            return null;
        }
        return [
            "import { createElement } from 'react';",
            'export const ReactComponent = (props) =>',
            "  createElement('svg', { ...props, viewBox: '0 0 24 24', 'aria-hidden': true },",
            "    createElement('circle', { cx: 12, cy: 12, r: 8, fill: 'currentColor' })",
            '  );',
        ].join('\n');
    },
};
export var config = defineConfig({
    plugins: [importedAddressbookSvgPlugin],
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
