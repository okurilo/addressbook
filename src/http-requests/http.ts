import { HttpRequest } from '@hrplatform/utils';
import type { Theme } from '@pulse/ui/theme';

export const deviceTypeByScreenSize: Record<Theme['screenSize'], string> = {
  desktop: 'web',
  tablet: 'web_tablet',
  mobile: 'web_mobile',
} as const;

export const httpRequestOptions = {
  errorCodeQuery: 'error.code',
  errorMessageQuery: 'error.message',
  headers: {
    'HRP-Device-Type': 'web',
    'X-HRP-Device-Type': 'web',
  },
};

export const http = new HttpRequest('/api-web/', httpRequestOptions);
