import type { SVGProps } from 'react';

export const Success = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg aria-hidden="true" height="20" viewBox="0 0 20 20" width="20" {...props}>
    <circle cx="10" cy="10" fill="currentColor" r="9" />
    <path d="m6 10 2.5 2.5L14 7" fill="none" stroke="white" strokeWidth="2" />
  </svg>
);

export const Error = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg aria-hidden="true" height="20" viewBox="0 0 20 20" width="20" {...props}>
    <circle cx="10" cy="10" fill="currentColor" r="9" />
    <path d="m7 7 6 6m0-6-6 6" fill="none" stroke="white" strokeWidth="2" />
  </svg>
);
