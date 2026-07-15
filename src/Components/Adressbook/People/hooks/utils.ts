import type { AdressbookPerson, PersonRow } from '../../types';

export const createRowData = (people: AdressbookPerson[]): PersonRow[] => {
  return people.map((person) => ({
    nameCell: {
      name: person.pbasic?.fullName || '-',
      photo: person?.pbasicphoto?.url || '',
      absence: person.absence,
      initials: `${person.pbasic?.firstName ? person.pbasic?.firstName[0] : 'N'}${
        person.pbasic?.lastName ? person.pbasic?.lastName[0] : 'A'
      }`,
    },
    position: person.jposition?.position?.[0]?.fullName || '-',
    block: person.jposition?.position?.[0]?.funcBlock || '-',
    unit: person.junit?.unit?.[0]?.balanceUnitName || '-',
    pid: person?.personUuid,

    _profile: {
      name: person.pbasic?.fullName || '-',
      photo: person?.pbasicphoto?.url || '',
      employeeNumber: person.jbasic?.employeeId,
      position: person.jposition?.position?.[0]?.fullName || '-',
      initials: `${person.pbasic?.firstName ? person.pbasic?.firstName[0] : 'N'}${
        person.pbasic?.lastName ? person.pbasic?.lastName[0] : 'A'
      }`,
      internalPhone: person.jcontactsinterofficetel?.value,
      personalPhone: person.jcontactsmobile?.value,
      // legacy
      internalMail: person.jcontactsinterofficeemail?.value,
      // legacy
      externalEmail: person.jcontactsexternalemail?.value,
      absence: person.absence,
    },
  }));
};
