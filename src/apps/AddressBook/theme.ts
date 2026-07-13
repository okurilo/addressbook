export type AppTheme = {
  colors: {
    background: string;
    surface: string;
    surfaceMuted: string;
    border: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    accentSoft: string;
    danger: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
    pill: number;
  };
  typography: {
    fontFamily: string;
  };
};

export const theme: AppTheme = {
  colors: {
    background: '#f4f6f2',
    surface: '#ffffff',
    surfaceMuted: '#eff3ee',
    border: '#d6ddd4',
    textPrimary: '#203024',
    textSecondary: '#607062',
    accent: '#1f8f58',
    accentSoft: '#e6f4ec',
    danger: '#cf4a4a',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 8,
    md: 14,
    lg: 20,
    pill: 999,
  },
  typography: {
    fontFamily: '"Segoe UI", sans-serif',
  },
};

