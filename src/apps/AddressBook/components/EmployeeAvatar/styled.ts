import styled from 'styled-components';
import type { EmployeeStatus } from '../../api/directory/types';

const statusColorMap: Record<EmployeeStatus, string> = {
  available: '#1f8f58',
  busy: '#d8861a',
  offline: '#98a29a',
  vacation: '#3a7bd5',
};

export const Wrapper = styled.div<{ $size: 'm' | 'l' }>(({ $size }) => ({
  position: 'relative',
  width: $size === 'l' ? 56 : 40,
  height: $size === 'l' ? 56 : 40,
  flexShrink: 0,
}));

export const StatusDot = styled.span<{ $status: EmployeeStatus }>(({ $status }) => ({
  position: 'absolute',
  right: -1,
  bottom: -1,
  width: 12,
  height: 12,
  borderRadius: 999,
  background: statusColorMap[$status],
  border: '2px solid #ffffff',
}));

