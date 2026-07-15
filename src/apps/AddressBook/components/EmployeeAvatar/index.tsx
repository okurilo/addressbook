import { Avatar } from '@pulse/ui/components/Avatar';
import type { EmployeeStatus } from '../../api/directory/types';
import { Wrapper, StatusDot } from './styled';

type EmployeeAvatarProps = {
  initials: string;
  status: EmployeeStatus;
  size?: 'm' | 'l';
};

export const EmployeeAvatar = ({
  initials,
  status,
  size = 'm',
}: EmployeeAvatarProps): JSX.Element => (
  <Wrapper $size={size}>
    <Avatar $type="initials" $size={size} $text={initials} />
    <StatusDot $status={status} />
  </Wrapper>
);

