import { useState } from 'react';
import { useTheme } from 'styled-components';
import type { TableProps } from './Table.types';
import {
  TableRoot,
  HeaderRow,
  RowGroup,
  RowCells,
  Cell,
  ExpandedPanel,
  EmptyState,
} from './Table.styles';
import { Body2Semibold } from '../typography';

/**
 * Pure presentational table.
 *
 * It renders `data` through the `columns` you give it and, on row click, reveals
 * whatever `renderExpanded` returns beneath the row. It holds no domain
 * knowledge: sorting, fetching, selection semantics, etc. all belong to the
 * parent via `columns`, `renderExpanded` and `onRowClick`.
 */
export function Table<T>({
  columns,
  data,
  getRowKey,
  renderExpanded,
  expandedRowKey,
  onRowClick,
  className,
  emptyState,
}: TableProps<T>) {
  // Uncontrolled open/close, used only when `expandedRowKey` is not provided.
  const [internalOpenKey, setInternalOpenKey] = useState<string | number | null>(null);
  const isControlled = expandedRowKey !== undefined;
  const openKey = isControlled ? expandedRowKey : internalOpenKey;

  const template = columns.map((c) => c.width ?? '1fr').join(' ');

  const handleRowClick = (row: T, key: string | number) => {
    if (!isControlled) {
      setInternalOpenKey((prev) => (prev === key ? null : key));
    }
    onRowClick?.(row, key);
  };
  const theme = useTheme();
  return (
    <TableRoot className={className}>
      <HeaderRow $template={template} role="row">
        {columns.map((col) => (
          <Cell key={col.key} $align={col.align} role="columnheader">
            <Body2Semibold color={theme.tokens?.current.core.text.secondary}>
              {col.header}
            </Body2Semibold>
          </Cell>
        ))}
      </HeaderRow>

      {data.length === 0 ? (
        <EmptyState>{emptyState ?? 'No data'}</EmptyState>
      ) : (
        data.map((row) => {
          const key = getRowKey(row);
          const open = key === openKey;
          const clickable = Boolean(onRowClick) || (!isControlled && Boolean(renderExpanded));

          return (
            <RowGroup key={key}>
              {!open && (
                <RowCells
                  $template={template}
                  $clickable={clickable}
                  $open={open}
                  role="row"
                  onClick={() => handleRowClick(row, key)}
                >
                  {columns.map((col) => (
                    <Cell key={col.key} $align={col.align} role="cell">
                      {col.render(row)}
                    </Cell>
                  ))}
                </RowCells>
              )}

              {open && renderExpanded && (
                <ExpandedPanel role="region">{renderExpanded(row)}</ExpandedPanel>
              )}
            </RowGroup>
          );
        })
      )}
    </TableRoot>
  );
}
