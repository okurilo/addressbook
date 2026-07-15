import { Avatar } from '@pulse/ui/components/Avatar';
import { useMemo } from 'react';
import type { ComponentType, ReactNode } from 'react';
import { useTheme } from 'styled-components';
import { getAvatarUrl, getIconUrl, StatusIcon } from '../../compat';

type ProfileImageProps = {
  absence?: { badge?: string; icon_dark?: string; icon_light?: string };
  photo?: string;
  size: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  pid?: string;
  initials: string;
};

const LegacyAvatar = Avatar as ComponentType<{
  $src: string;
  $status?: ReactNode;
  $initials: string;
  $size: ProfileImageProps['size'];
  'data-testid'?: string;
}>;

export const ProfileImage = ({ absence, photo, size, pid, initials }: ProfileImageProps) => {
  const { mode } = useTheme() as { mode?: 'dark' | 'light' };
  const statusIconSrc = useMemo(
    () => (mode === 'dark' ? absence?.icon_dark : absence?.icon_light),
    [absence, mode]
  );
  return (
    <LegacyAvatar
      $src={photo ? `/api-web/cs/api/1/${photo.replace(/^\//, '')}` : getAvatarUrl(pid)}
      $status={
        statusIconSrc && (
          <StatusIcon
            data-testid={`avatar-status-icon-${absence?.badge}`}
            src={getIconUrl(statusIconSrc)}
          />
        )
      }
      $initials={initials}
      $size={size}
      data-testid="search-result_image"
    />
  );
};

