import { getAvatarUrl } from '@hrplatform/utils';
import { Avatar } from '@pulse/ui/components/Avatar';
import { useMemo } from 'react';
import styled, { useTheme } from 'styled-components';

const StatusIcon = styled.img({
  display: 'block',
  width: 20,
  height: 20,
});

export const ProfileImage = ({ absence, photo, size, pid, initials }) => {
  const { mode } = useTheme();
  const statusIconSrc = useMemo(
    () => (mode === 'dark' ? absence?.icon_dark : absence?.icon_light),
    [absence, mode]
  );
  return (
    <Avatar
      $src={photo ? `/api-web/cs/api/1/${photo.replace(/^\//, '')}` : getAvatarUrl(pid)}
      $status={
        statusIconSrc && (
          <StatusIcon
            data-testid={`avatar-status-icon-${absence?.badge}`}
            src={statusIconSrc}
          />
        )
      }
      $initials={initials}
      $size={size}
      data-testid="search-result_image"
    />
  );
};
