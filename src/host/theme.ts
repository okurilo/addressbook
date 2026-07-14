export type TypographyStyle = {
  fontFamily: string;
  fontWeight: number;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
};

export type TypographyVariant =
  | 'h1Bold'
  | 'h2Semibold'
  | 'h3Semibold'
  | 'extraBodyRegular'
  | 'h4Semibold'
  | 'body1Regular'
  | 'body1Semibold'
  | 'body2ParagraphRegular'
  | 'body2Regular'
  | 'body2Semibold'
  | 'caption1ParagraphRegular'
  | 'captionParagraphRegular'
  | 'caption1Regular'
  | 'captionRegular'
  | 'caption1Semibold'
  | 'captionSemibold'
  | 'caption2Regular'
  | 'caption2Semibold'
  | 'tabBarMedium'
  | 'smallTextRegular'
  | 'smallTextSemibold';

type MediaQueryName =
  | 'min320'
  | 'min480'
  | 'min600'
  | 'min720'
  | 'min840'
  | 'min1024'
  | 'min1280'
  | 'min1440'
  | 'min1600'
  | 'min1920'
  | 'max320'
  | 'max480'
  | 'max600'
  | 'max720'
  | 'max840'
  | 'max1024'
  | 'max1280'
  | 'max1440'
  | 'max1600'
  | 'max1920'
  | 'only320'
  | 'only480'
  | 'only600'
  | 'only720'
  | 'only840'
  | 'only1024'
  | 'only1280'
  | 'only1440'
  | 'only1600'
  | 'only1920';

type CoreTokens = {
  background: {
    default: string;
    field: string;
  };
  accent: {
    primary: string;
    secondary: string;
    tertiary: string;
    base: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    onColor: string;
    placeholder: string;
    error: string;
  };
  icon: {
    primary: string;
    secondary: string;
    tertiary: string;
    onColor: string;
  };
  layer: {
    '01': string;
    '02': string;
    '03': string;
  };
  border: {
    gentle: string;
    strong: string;
    interactive: string;
  };
  danger: {
    '01': string;
    '02': string;
  };
  support: {
    success: string;
    attention: string;
    warning: string;
    info: string;
  };
  link: {
    default: string;
  };
};

type CurrentTokens = {
  core: CoreTokens;
  colors: {
    grey: {
      solid: {
        '10': string;
        '50': string;
        '60': string;
        '70': string;
      };
    };
  };
  shadows: {
    small: string;
  };
};

export type HostTheme = {
  borderWidths: Record<string, number>;
  breakpoints: string[];
  layout: {
    columns: number[];
    gutter: number[];
    margin: number[];
  };
  layoutColumnWidth?: number[];
  mediaQueries: Record<MediaQueryName, string>;
  radii: {
    sm: number;
    md: number;
    lg: number;
    pill: number;
  };
  screenSize: string;
  space: number[];
  typography: Record<TypographyVariant, TypographyStyle>;
  zIndices: {
    modal: number;
    tooltip: number;
    actionSheet: number;
    popover: number;
    pushNotifications: number;
  };
  tokens: {
    current: CurrentTokens;
  };
};

const fontFamily = 'Inter, "Segoe UI", sans-serif';

const typographyStyle = (
  fontSize: string,
  lineHeight: string,
  fontWeight: number,
): TypographyStyle => ({
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing: '0px',
});

export const hostTheme: HostTheme = {
  borderWidths: {
    none: 0,
    thin: 1,
    strong: 2,
  },
  breakpoints: ['320px', '480px', '600px', '720px', '840px', '1024px', '1280px', '1440px', '1600px', '1920px'],
  layout: {
    columns: [4, 4, 8, 8, 12, 12, 12, 12, 12, 12],
    gutter: [16, 16, 16, 24, 24, 24, 24, 24, 24, 24],
    margin: [16, 16, 24, 24, 32, 32, 40, 40, 40, 40],
  },
  mediaQueries: {
    min320: '(min-width: 320px)',
    min480: '(min-width: 480px)',
    min600: '(min-width: 600px)',
    min720: '(min-width: 720px)',
    min840: '(min-width: 840px)',
    min1024: '(min-width: 1024px)',
    min1280: '(min-width: 1280px)',
    min1440: '(min-width: 1440px)',
    min1600: '(min-width: 1600px)',
    min1920: '(min-width: 1920px)',
    max320: '(max-width: 319.98px)',
    max480: '(max-width: 479.98px)',
    max600: '(max-width: 599.98px)',
    max720: '(max-width: 719.98px)',
    max840: '(max-width: 839.98px)',
    max1024: '(max-width: 1023.98px)',
    max1280: '(max-width: 1279.98px)',
    max1440: '(max-width: 1439.98px)',
    max1600: '(max-width: 1599.98px)',
    max1920: '(max-width: 1919.98px)',
    only320: '(min-width: 320px) and (max-width: 479.98px)',
    only480: '(min-width: 480px) and (max-width: 599.98px)',
    only600: '(min-width: 600px) and (max-width: 719.98px)',
    only720: '(min-width: 720px) and (max-width: 839.98px)',
    only840: '(min-width: 840px) and (max-width: 1023.98px)',
    only1024: '(min-width: 1024px) and (max-width: 1279.98px)',
    only1280: '(min-width: 1280px) and (max-width: 1439.98px)',
    only1440: '(min-width: 1440px) and (max-width: 1599.98px)',
    only1600: '(min-width: 1600px) and (max-width: 1919.98px)',
    only1920: '(min-width: 1920px)',
  },
  radii: {
    sm: 8,
    md: 14,
    lg: 20,
    pill: 999,
  },
  screenSize: 'min1280',
  space: [0, 4, 8, 12, 16, 24, 32, 40, 48, 64],
  typography: {
    h1Bold: typographyStyle('40px', '48px', 700),
    h2Semibold: typographyStyle('32px', '40px', 600),
    h3Semibold: typographyStyle('28px', '36px', 600),
    extraBodyRegular: typographyStyle('24px', '32px', 400),
    h4Semibold: typographyStyle('24px', '32px', 600),
    body1Regular: typographyStyle('16px', '24px', 400),
    body1Semibold: typographyStyle('16px', '24px', 600),
    body2ParagraphRegular: typographyStyle('14px', '22px', 400),
    body2Regular: typographyStyle('14px', '20px', 400),
    body2Semibold: typographyStyle('14px', '20px', 600),
    caption1ParagraphRegular: typographyStyle('12px', '18px', 400),
    captionParagraphRegular: typographyStyle('12px', '18px', 400),
    caption1Regular: typographyStyle('12px', '16px', 400),
    captionRegular: typographyStyle('12px', '16px', 400),
    caption1Semibold: typographyStyle('12px', '16px', 600),
    captionSemibold: typographyStyle('12px', '16px', 600),
    caption2Regular: typographyStyle('11px', '14px', 400),
    caption2Semibold: typographyStyle('11px', '14px', 600),
    tabBarMedium: typographyStyle('14px', '20px', 500),
    smallTextRegular: typographyStyle('10px', '14px', 400),
    smallTextSemibold: typographyStyle('10px', '14px', 600),
  },
  zIndices: {
    modal: 1000,
    tooltip: 1100,
    actionSheet: 900,
    popover: 800,
    pushNotifications: 1200,
  },
  tokens: {
    current: {
      core: {
        background: {
          default: '#f4f6f2',
          field: '#ffffff',
        },
        accent: {
          primary: '#1f8f58',
          secondary: '#e6f4ec',
          tertiary: '#cce8d8',
          base: '#167647',
        },
        text: {
          primary: '#1f2521',
          secondary: '#657068',
          tertiary: '#89918b',
          onColor: '#ffffff',
          placeholder: '#89918b',
          error: '#c83636',
        },
        icon: {
          primary: '#1f2521',
          secondary: '#657068',
          tertiary: '#89918b',
          onColor: '#ffffff',
        },
        layer: {
          '01': '#ffffff',
          '02': '#eff3ee',
          '03': '#e4eae4',
        },
        border: {
          gentle: '#d6ddd4',
          strong: '#9ca69e',
          interactive: '#1f8f58',
        },
        danger: {
          '01': '#c83636',
          '02': '#fdeaea',
        },
        support: {
          success: '#1f8f58',
          attention: '#d48318',
          warning: '#e3a51b',
          info: '#2476d3',
        },
        link: {
          default: '#146cc2',
        },
      },
      colors: {
        grey: {
          solid: {
            '10': '#f3f5f3',
            '50': '#89918b',
            '60': '#657068',
            '70': '#4f5952',
          },
        },
      },
      shadows: {
        small: '0 4px 16px rgba(31, 37, 33, 0.14)',
      },
    },
  },
};
