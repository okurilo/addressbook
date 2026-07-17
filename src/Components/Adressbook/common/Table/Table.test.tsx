import { fireEvent, render, screen } from '../../../../test-utils/test-utils';
import { Table } from './Table';
import type { Column } from './Table.types';

type Row = { id: string; name: string };

const rows: Row[] = [
  { id: '1', name: 'Иван' },
  { id: '2', name: 'Анна' },
];
const columns: Column<Row>[] = [
  { key: 'name', header: 'Имя', width: '2fr', render: ({ name }) => name },
];

const renderTable = (props: Partial<React.ComponentProps<typeof Table<Row>>> = {}) =>
  render(<Table columns={columns} data={rows} getRowKey={({ id }) => id} {...props} />);

describe('Table', () => {
  test('рендерит заголовки и строки', () => {
    renderTable();
    expect(screen.getByRole('columnheader').textContent).toBe('Имя');
    expect(screen.getAllByRole('row')).toHaveLength(3);
    expect(screen.getByText('Иван')).toBeTruthy();
    expect(screen.getByText('Анна')).toBeTruthy();
  });

  test('показывает переданное пустое состояние', () => {
    renderTable({ data: [], emptyState: <span>Сотрудники не найдены</span> });
    expect(screen.getByText('Сотрудники не найдены')).toBeTruthy();
  });

  test('раскрывает строку во внутреннем состоянии', () => {
    renderTable({ renderExpanded: ({ name }) => <div>Профиль: {name}</div> });

    fireEvent.click(screen.getByText('Иван'));
    expect(screen.getByRole('region').textContent).toBe('Профиль: Иван');
    expect(screen.queryByText('Иван')).toBeNull();
  });

  test('в controlled-режиме вызывает обработчик и раскрывает заданную строку', () => {
    const onRowClick = jest.fn<void, [Row, string | number]>();
    renderTable({
      expandedRowKey: '2',
      renderExpanded: ({ name }) => <div>Профиль: {name}</div>,
      onRowClick,
    });

    expect(screen.getByRole('region').textContent).toBe('Профиль: Анна');
    fireEvent.click(screen.getByText('Иван'));
    expect(onRowClick).toHaveBeenCalledWith(rows[0], '1');
    expect(screen.getByRole('region').textContent).toBe('Профиль: Анна');
  });
});
