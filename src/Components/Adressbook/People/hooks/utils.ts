import type { AdressbookPerson } from '../../types';
import type { PersonRow } from '../types';

const getInitials = (person: AdressbookPerson): string => {
  const firstName = person.pbasic?.firstName?.trim();
  const lastName = person.pbasic?.lastName?.trim();
  const names = [firstName, lastName].filter((name): name is string => Boolean(name));
  const fallbackNames = person.pbasic?.fullName?.trim().split(/\s+/u) ?? [];

  return (names.length > 0 ? names : fallbackNames)
    .slice(0, 2)
    .map((name) => name.charAt(0).toLocaleUpperCase('ru'))
    .join('') || 'NA';
};

export const createRowData = (
  people: AdressbookPerson[],
  favoritePersonIds: string[] = []
): PersonRow[] =>
  people.map((person) => {
    const pid = person.personUuid;
    const name = person.pbasic?.fullName || '-';
    const photo = person.pbasicphoto?.url || '';
    const position = person.jposition?.position?.[0]?.fullName || '-';
    const initials = getInitials(person);
    const internalPhone = person.jcontactsinterofficetel?.value;
    const personalPhone = person.jcontactsmobile?.value;
    const internalMail = person.jcontactsinterofficeemail?.value;
    const externalEmail = person.jcontactsexternalemail?.value;

    return {
      nameCell: { name, photo, absence: person.absence, initials },
      position,
      block: person.jposition?.position?.[0]?.funcBlock || '-',
      unit: person.junit?.unit?.[0]?.balanceUnitName || '-',
      pid,
      phone: internalPhone ?? personalPhone ?? null,
      email: internalMail ?? externalEmail ?? '',
      isFavorite: favoritePersonIds.includes(pid),
      _profile: {
        name,
        photo,
        employeeNumber: person.jbasic?.employeeId || '-',
        position,
        initials,
        internalPhone,
        personalPhone,
        internalMail,
        externalEmail,
        absence: person.absence,
      },
    };
  });
