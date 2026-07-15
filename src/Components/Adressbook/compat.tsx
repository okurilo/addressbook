import styled from 'styled-components';

export const getAvatarUrl = (pid?: string): string =>
  pid === undefined || pid === '' ? '' : `/api-web/cs/api/1/avatar/${encodeURIComponent(pid)}`;

export const getIconUrl = (icon: string): string =>
  icon.startsWith('/') ? icon : `/api-web/cs/api/1/${icon}`;

export const StatusIcon = styled('img')({
  display: 'block',
  width: '100%',
  height: '100%',
});

