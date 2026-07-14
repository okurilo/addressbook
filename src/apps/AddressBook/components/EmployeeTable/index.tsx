import type { Employee } from '../../api/directory/types';
import { Table } from '../../../../Components/Adressbook/common/Table';
import { useGetColumns } from '../../../../Components/Adressbook/People/hooks/useGetColumns';
import { createPersonRows } from '../../../../Components/Adressbook/People/types';
import { Profile } from '../../../../Components/Adressbook/Profile/Profile';

type EmployeeTableProps = {
  employees: Employee[];
  favoriteIds: string[];
  onToggleFavorite: (employeeId: string) => void;
};

export const EmployeeTable = ({
  employees,
  favoriteIds,
  onToggleFavorite,
}: EmployeeTableProps): JSX.Element => {
  const people = createPersonRows(employees, favoriteIds);
  const columns = useGetColumns(onToggleFavorite);

  return (
    <Table
      columns={columns}
      data={people}
      getRowKey={(person) => person.pid}
      renderExpanded={(person) => <Profile person={person._profile} pid={person.pid} />}
    />
  );
};
