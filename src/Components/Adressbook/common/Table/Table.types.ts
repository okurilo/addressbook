import type { ReactNode } from 'react';

export type CellAlign = 'left' | 'center' | 'right';

export interface Column<T> {
  /** Stable identifier for the column. */
  key: string;
  /** Header content. */
  header: ReactNode;
  /**
   * CSS grid track for this column, e.g. '1fr', '200px', 'minmax(120px, 1fr)'.
   * Defaults to '1fr'.
   */
  width?: string;
  align?: CellAlign;
  /** Pure cell renderer — receives the row, returns what to display. */
  render: (row: T) => ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  /** Returns a stable key for a row. Keeps the Table free of assumptions about T. */
  getRowKey: (row: T) => string | number;

  /**
   * Renders expandable content shown beneath a row when it is opened.
   * This is how a "profile" (or any tall component) gets injected — the Table
   * only decides *where* it goes, never *what* it is.
   */
  renderExpanded?: (row: T) => ReactNode;

  /**
   * Controlled expansion. When provided, the Table renders exactly this row as
   * open and does not track its own state. Pair with `onRowClick`.
   * Omit entirely to let the Table manage open/close internally (uncontrolled).
   */
  expandedRowKey?: string | number | null;

  /** Fired on every row click, with the row and its key. Business logic lives here, in the parent. */
  onRowClick?: (row: T, key: string | number) => void;

  className?: string;
  /** Rendered in place of rows when `data` is empty. */
  emptyState?: ReactNode;
}

