import type { SVGProps } from 'react';

// TODO(addressbook-host): заменить общий placeholder реальными SVG-ассетами host-приложения.
export const ReactComponent = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg aria-hidden="true" height="20" viewBox="0 0 20 20" width="20" {...props}>
    <rect fill="currentColor" height="12" opacity="0.18" rx="3" width="12" x="4" y="4" />
  </svg>
);

const svgStubUrl = '';

export default svgStubUrl;
