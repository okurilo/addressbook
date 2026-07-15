import styled from 'styled-components';

const IconBase = styled.svg({
  display: 'block',
  flexShrink: 0,
});

type IconProps = {
  size?: number;
};

export const AppMarkIcon = ({ size = 36 }: IconProps): JSX.Element => (
  <IconBase width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="32" height="32" rx="8" fill="#1F8F58" />
    <path
      d="M11 12.5C11 11.672 11.672 11 12.5 11H23.5C24.328 11 25 11.672 25 12.5V23.5C25 24.328 24.328 25 23.5 25H12.5C11.672 25 11 24.328 11 23.5V12.5Z"
      fill="white"
      fillOpacity="0.22"
    />
    <path
      d="M14 15.25C14 14.56 14.56 14 15.25 14H20.75C21.44 14 22 14.56 22 15.25V20.75C22 21.44 21.44 22 20.75 22H15.25C14.56 22 14 21.44 14 20.75V15.25Z"
      fill="white"
    />
  </IconBase>
);

export const SearchIcon = ({ size = 20 }: IconProps): JSX.Element => (
  <IconBase width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="5.75" stroke="currentColor" strokeWidth="1.5" />
    <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </IconBase>
);

export const CloseIcon = ({ size = 18 }: IconProps): JSX.Element => (
  <IconBase width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path d="M4 4L14 14M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </IconBase>
);

export const StarIcon = ({ size = 18 }: IconProps): JSX.Element => (
  <IconBase width={size} height={size} viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <path
      d="M9 2.25L11.085 6.475L15.75 7.153L12.375 10.444L13.171 15.09L9 12.897L4.829 15.09L5.625 10.444L2.25 7.153L6.915 6.475L9 2.25Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </IconBase>
);

