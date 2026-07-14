/// <reference types="vite/client" />

import type { ComponentType } from 'react';
import type { Employee } from '../../api/directory/types';
import type { AdressbookPerson } from '../../../../Components/Adressbook/types';

type ImportedAdressbookModule = {
  AdressBook: ComponentType<{
    people: AdressbookPerson[];
    isLoading?: boolean;
    initialExpandedPersonId?: string | null;
  }>;
};

type ImportedAdressbookProps = {
  employees: Employee[];
  isLoading?: boolean;
  initialExpandedEmployeeId?: string | null;
};

const importedModules = import.meta.glob<ImportedAdressbookModule>(
  '../../../../Components/Adressbook/index.ts',
  { eager: true }
);
const ImportedAdressbookComponent = Object.values(importedModules)[0]?.AdressBook;

if (ImportedAdressbookComponent === undefined) {
  throw new Error('Imported Adressbook component was not found');
}

const splitName = (fullName: string): { firstName: string; lastName: string } => {
  const [firstName = '', lastName = ''] = fullName.trim().split(/\s+/u);
  return { firstName, lastName };
};

const toAdressbookPerson = (employee: Employee): AdressbookPerson => {
  const { firstName, lastName } = splitName(employee.fullName);

  return {
    personUuid: employee.id,
    pbasic: {
      fullName: employee.fullName,
      firstName,
      lastName,
    },
    jbasic: { employeeId: employee.employeeNumber },
    jposition: {
      position: [
        {
          fullName: employee.position,
          funcBlock: employee.departmentName,
        },
      ],
    },
    junit: { unit: [{ balanceUnitName: employee.shortStructure }] },
    jcontactsinterofficetel:
      employee.phone === null ? undefined : { value: employee.phone },
    jcontactsmobile:
      employee.mobilePhone === null ? undefined : { value: employee.mobilePhone },
    jcontactsinterofficeemail: employee.email === '' ? undefined : { value: employee.email },
    jcontactsexternalemail: employee.email === '' ? undefined : { value: employee.email },
    absence:
      employee.status === 'vacation'
        ? { badge: 'В отпуске', period: 'сейчас' }
        : undefined,
  };
};

export const ImportedAdressbook = ({
  employees,
  isLoading = false,
  initialExpandedEmployeeId,
}: ImportedAdressbookProps): JSX.Element => (
  <ImportedAdressbookComponent
    people={employees.map(toAdressbookPerson)}
    isLoading={isLoading}
    initialExpandedPersonId={initialExpandedEmployeeId}
  />
);
