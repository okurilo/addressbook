import { styled } from 'styled-components';
import { Avatar } from '@pulse/ui/Avatar';
import type { EmployeeStatus } from '../api/directory/types';

const Wrapper = styled('div')({
  position: 'relative',
  width: 40,
  height: 40,
  flexShrink: 0,
});

const statusColorMap: Record<EmployeeStatus, string> = {
  available: '#1f8f58',
  busy: '#d8861a',
  offline: '#98a29a',
  vacation: '#3a7bd5',
};

const StatusDot = styled('span')<{ $status: EmployeeStatus }>(({ $status }) => ({
  position: 'absolute',
  right: -1,
  bottom: -1,
  width: 12,
  height: 12,
  borderRadius: 999,
  background: statusColorMap[$status],
  border: '2px solid #ffffff',
}));

type EmployeeAvatarProps = {
  initials: string;
  status: EmployeeStatus;
};

export const EmployeeAvatar = ({ initials, status }: EmployeeAvatarProps): JSX.Element => (
  <Wrapper>
    <Avatar initials={initials} />
    <StatusDot $status={status} />
  </Wrapper>
);
