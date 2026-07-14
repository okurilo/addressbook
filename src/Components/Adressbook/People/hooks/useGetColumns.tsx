import { ConnectCell } from '../../common/ConnectCell';
import { NameCell } from '../../common/NameCell';
import { PositionCell } from '../../common/PositionCell';
import { StructureCell } from '../../common/StructureCell';

export const useGetColumns = () => {
  return [
    {
      key: 'name',
      header: 'ФИО сотрудника',
      render: (u) => <NameCell data={u.nameCell} pid={u.pid} />,
    },
    {
      key: 'unit',
      align: 'right',
      header: 'структура',
      render: (u) => <StructureCell structure={u.unit} />,
    },
    {
      key: 'pisition',
      header: 'должность',
      render: (u) => <PositionCell position={u.position} block={u.block} />,
    },
    {
      key: 'connect',
      header: 'связаться',
      render: (u) => <ConnectCell />,
    },
  ];
};

