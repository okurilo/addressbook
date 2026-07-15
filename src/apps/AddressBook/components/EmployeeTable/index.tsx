import type { Employee } from '../../api/directory/types';
import { AdressBook, AdressbookProvider } from '../../../../Components/Adressbook';
import type { AdressbookPerson } from '../../../../Components/Adressbook';
import { EmployeeActions } from '../EmployeeActions';

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
  const people: AdressbookPerson[] = employees.map((employee) => {
    const nameParts = employee.fullName.trim().split(/\s+/u);

    return {
      personUuid: employee.id,
      pbasic: {
        fullName: employee.fullName,
        firstName: nameParts[1] ?? nameParts[0],
        lastName: nameParts[0],
      },
      jbasic: { employeeId: employee.employeeNumber },
      jposition: {
        position: [{ fullName: employee.position, funcBlock: employee.departmentName }],
      },
      junit: { unit: [{ balanceUnitName: employee.shortStructure }] },
      jcontactsinterofficetel: employee.phone === null ? undefined : { value: employee.phone },
      jcontactsmobile: employee.mobilePhone === null ? undefined : { value: employee.mobilePhone },
      jcontactsinterofficeemail: employee.email === '' ? undefined : { value: employee.email },
    };
  });

  const employeesById = new Map(employees.map((employee) => [employee.id, employee]));

  return (
    <AdressbookProvider
      people={people}
      renderActions={(personId) => {
        const employee = employeesById.get(personId);

        return employee === undefined ? null : (
          <EmployeeActions
            email={employee.email}
            isFavorite={favoriteIds.includes(personId)}
            onToggleFavorite={() => {
              onToggleFavorite(personId);
            }}
            phone={employee.phone}
          />
        );
      }}
    >
      <AdressBook />
    </AdressbookProvider>
  );
};

