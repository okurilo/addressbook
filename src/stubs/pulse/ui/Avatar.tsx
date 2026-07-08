import { styled } from 'styled-components';

const Circle = styled('div')(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: theme.radius.pill,
  background: theme.colors.accentSoft,
  color: theme.colors.accent,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
}));

type AvatarProps = {
  initials: string;
};

export const Avatar = ({ initials }: AvatarProps): JSX.Element => <Circle>{initials}</Circle>;
