import type { ReactNode } from 'react';
import { Avatar } from '@pulse/ui/components/Avatar';

type ProfileImageProps = {
  absence?: unknown;
  photo?: string;
  size: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  pid?: string;
  initials: string;
};

export const ProfileImage = ({ photo, size, initials }: ProfileImageProps): JSX.Element => {
  // TODO(addressbook-host): вернуть фото и badge отсутствия после подключения host avatar helpers.
  const icon: ReactNode =
    photo === undefined || photo === '' ? undefined : (
      <img alt="" src={`/api-web/cs/api/1/${photo.replace(/^\//u, '')}`} />
    );

  return (
    <Avatar
      $icon={icon}
      $size={size}
      $text={initials}
      $type={icon === undefined ? 'initials' : 'default'}
    />
  );
};
