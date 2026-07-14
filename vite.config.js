import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vite';
var importedAddressbookSvgPrefix = '\0imported-addressbook-svg:';
var importedAddressbookSvgPlugin = {
    name: 'imported-addressbook-svg-compat',
    enforce: 'pre',
    resolveId: function (source, importer) {
        if (source.endsWith('.svg') &&
            (importer === null || importer === void 0 ? void 0 : importer.includes('/src/Components/Adressbook/')) === true) {
            return "".concat(importedAddressbookSvgPrefix).concat(resolve(dirname(importer), source));
        }
        return null;
    },
    load: function (id) {
        var _a, _b;
        if (!id.startsWith(importedAddressbookSvgPrefix)) {
            return null;
        }
        var svgSource = readFileSync(id.slice(importedAddressbookSvgPrefix.length), 'utf8');
        var viewBox = (_b = (_a = svgSource.match(/viewBox=["']([^"']+)["']/)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : '0 0 24 24';
        var svgBody = svgSource
            .replace(/^\s*<svg\b[^>]*>/, '')
            .replace(/<\/svg>\s*$/, '')
            .trim();
        return [
            "import { createElement } from 'react';",
            "const svgBody = ".concat(JSON.stringify(svgBody), ";"),
            'export const ReactComponent = (props) =>',
            "  createElement('svg', { ...props, viewBox: ".concat(JSON.stringify(viewBox), ","),
            "    'aria-hidden': props['aria-label'] === undefined ? true : undefined,",
            '    dangerouslySetInnerHTML: { __html: svgBody }',
            '  });',
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
