import type { Employee } from '../../api/directory/types';
import { AdressBook, AdressbookProvider } from '../../../../Components/Adressbook';
import type { AdressbookPerson } from '../../../../Components/Adressbook';
import { EmployeeActions } from '../EmployeeActions';

type EmployeeTableProps = {
  employees: Employee[];
  favoriteIds: string[];
  onEmployeeOpen?: (employeeId: string) => void;
  onToggleFavorite: (employeeId: string) => void;
};

export const EmployeeTable = ({
  employees,
  favoriteIds,
  onEmployeeOpen,
  onToggleFavorite,
}: EmployeeTableProps): JSX.Element => {
  const favIds = new Set(favoriteIds);

  const people: AdressbookPerson[] = employees.map((employee) => {
    const nameParts = employee.fullName.trim().split(/\s+/u);
    const firstName = employee.firstName ?? nameParts[1] ?? nameParts[0];
    const lastName = employee.lastName ?? nameParts[0];

    return {
      personUuid: employee.id,
      pbasic: {
        fullName: employee.fullName,
        firstName,
        lastName,
      },
      pbasicphoto: employee.photoUrl === undefined ? undefined : { url: employee.photoUrl },
      jbasic: { employeeId: employee.employeeNumber },
      jposition: {
        position: [
          {
            fullName: employee.position,
            funcBlock: employee.functionalBlock ?? employee.departmentName,
          },
        ],
      },
      junit: { unit: [{ balanceUnitName: employee.shortStructure }] },
      jcontactsinterofficetel: employee.phone === null ? undefined : { value: employee.phone },
      jcontactsmobile: employee.mobilePhone === null ? undefined : { value: employee.mobilePhone },
      absence: employee.absence,
    };
  });

  const employeesById = new Map(employees.map((employee) => [employee.id, employee]));

  return (
    <AdressbookProvider
      people={people}
      onPersonOpen={onEmployeeOpen}
      renderActions={(personId, isFavorite, favoritePersons, favoriteGroupId, personalPhone) => {
        const employee = employeesById.get(personId);

        // favoritePersons is undefined while People fetches — show skeleton
        const isFavoriteLoading = favoritePersons === undefined;

        const allFavs = favoritePersons ? new Set([...favoritePersons, ...favIds]) : favIds;

        return employee === undefined ? null : (
          <EmployeeActions
            personId={personId}
            email={employee.email}
            isFavorite={isFavorite ?? allFavs.has(personId)}
            isFavoriteLoading={isFavoriteLoading}
            groupId={favoriteGroupId}
            onToggleFavorite={() => {
              onToggleFavorite(personId);
            }}
            phone={personalPhone}
          />
        );
      }}
    >
      <AdressBook />
    </AdressbookProvider>
  );
};
