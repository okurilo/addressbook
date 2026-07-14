import styled from 'styled-components';

export const TableRoot = styled.div`
  width: 100%;
`;

export const Grid = styled.div<{ $template: string }>`
  display: grid;
  grid-template-columns: ${({ $template }) => $template};
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
`;

export const HeaderRow = styled(Grid)`
  border-bottom: 1px solid #e5e7eb;
`;

export const RowGroup = styled.div`
  & + & {
    border-top: 1px solid #e5e7eb;
  }
`;

export const RowCells = styled(Grid)<{ $clickable: boolean; $open: boolean }>`
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  background: ${({ $open }) => ($open ? '#f5f7fb' : 'transparent')};
  transition: background 120ms ease;

  &:hover {
    background: ${({ $clickable, $open }) =>
      $open ? '#f5f7fb' : $clickable ? '#fafbfc' : 'transparent'};
  }
`;

export const Cell = styled.div<{ $align?: string }>`
  text-align: ${({ $align }) => $align ?? 'left'};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ExpandedPanel = styled.div`
  padding: 0 16px 16px;
  background: transparent;
`;

export const EmptyState = styled.div`
  padding: 32px 16px;
  text-align: center;
  color: #9ca3af;
`;

