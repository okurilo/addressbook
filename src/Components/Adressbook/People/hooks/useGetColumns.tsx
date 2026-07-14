import type { Column } from '../../common/Table';
import { ConnectCell } from '../../common/ConnectCell';
import { NameCell } from '../../common/NameCell';
import { PositionCell } from '../../common/PositionCell';
import { StructureCell } from '../../common/StructureCell';
import type { PersonRow } from '../types';

export const useGetColumns = (
  onToggleFavorite: (employeeId: string) => void
): Column<PersonRow>[] => [
  {
    key: 'name',
    header: 'ФИО сотрудника',
    width: '34%',
    render: (row) => <NameCell data={row.nameCell} pid={row.pid} />,
  },
  {
    key: 'unit',
    header: 'структура',
    width: '12%',
    render: (row) => <StructureCell structure={row.unit} />,
  },
  {
    key: 'position',
    header: 'должность',
    width: '30%',
    render: (row) => <PositionCell block={row.block} position={row.position} />,
  },
  {
    key: 'connect',
    align: 'right',
    header: 'связаться',
    width: '24%',
    render: (row) => (
      <ConnectCell
        email={row.email}
        employeeId={row.pid}
        isFavorite={row.isFavorite}
        onToggleFavorite={onToggleFavorite}
        phone={row.phone}
      />
    ),
  },
];
