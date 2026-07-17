import type { DefaultTheme } from 'styled-components';

const typographyStyle = {
  fontFamily: 'Arial, sans-serif',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: '0',
};

const typography = new Proxy<Record<string, typeof typographyStyle>>(
  {},
  { get: () => typographyStyle }
);

export const testTheme = {
  mode: 'light',
  radii: { sm: 4, md: 8, lg: 16, pill: 999 },
  space: [0, 4, 8, 16, 24, 32],
  typography,
  zIndices: { popover: 10 },
  tokens: {
    current: {
      core: {
        background: { default: '#fff', field: '#fff' },
        accent: { primary: '#080', secondary: '#efe', tertiary: '#ddd', base: '#080' },
        text: {
          primary: '#111',
          secondary: '#555',
          tertiary: '#777',
          onColor: '#fff',
          placeholder: '#888',
          error: '#c00',
        },
        icon: { primary: '#111', secondary: '#555', tertiary: '#777', onColor: '#fff' },
        layer: { '01': '#fff', '02': '#f5f5f5', '03': '#eee' },
        border: { gentle: '#ddd', strong: '#999', interactive: '#080' },
        danger: { '01': '#c00', '02': '#fee' },
        support: { success: '#080', attention: '#a60', warning: '#c80', info: '#08c' },
        link: { default: '#06c' },
      },
      colors: {
        grey: { solid: { '10': '#f5f5f5', '50': '#888', '60': '#666', '70': '#444' } },
        yellow: { solid: { '60': '#fc0' } },
      },
      shadows: { small: 'none' },
    },
  },
} as unknown as DefaultTheme;
