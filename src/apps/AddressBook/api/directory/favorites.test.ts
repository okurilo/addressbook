import { deepStrictEqual, strictEqual } from 'node:assert';
import { test } from 'node:test';
import type { PeopleTeam, TeamMembersPage } from './favorites';
import { findFavoritesTeam, normalizeTeamMembers } from './favorites';

test('находит кастомную группу «Избранные»', () => {
  const teams: PeopleTeam[] = [
    {
      id: 'team-1',
      type: 'группа',
      typeOrder: 100,
      name: 'Тест',
      isCustom: true,
    },
    {
      id: 'favorites-team',
      type: 'группа',
      typeOrder: 100,
      name: 'Избранные',
      isCustom: true,
    },
  ];

  strictEqual(findFavoritesTeam(teams)?.id, 'favorites-team');
});

test('не принимает системную группу с тем же именем', () => {
  const teams: PeopleTeam[] = [
    {
      id: 'system-team',
      type: 'команда',
      typeOrder: 5,
      name: 'Избранные',
      isCustom: false,
    },
  ];

  strictEqual(findFavoritesTeam(teams), null);
});

test('нормализует участника кастомной группы', () => {
  const response: TeamMembersPage = {
    content: [
      {
        firstName: 'Дмитрий',
        lastName: 'Малахов',
        midName: 'Игоревич',
        fullName: 'Малахов Дмитрий Игоревич',
        personId: 'person-1',
        contacts: {
          externalEmail: 'external@example.test',
          officeEmail: 'office@example.test',
          mobile: '8-900-000-00-00',
          officePhone: '8-0000000',
        },
        statuses: [],
        availableActions: ['call', 'mail'],
        isStack: false,
      },
    ],
    totalElements: 1,
    totalPages: 1,
    last: true,
  };

  const employees = normalizeTeamMembers(response);

  strictEqual(employees.length, 1);
  deepStrictEqual(employees[0], {
    id: 'person-1',
    fullName: 'Малахов Дмитрий Игоревич',
    subtitle: '',
    avatarInitials: 'ДМ',
    status: 'available',
    shortStructure: '',
    departmentId: '',
    departmentName: '',
    position: '',
    employeeNumber: '',
    phone: '8-0000000',
    mobilePhone: '8-900-000-00-00',
    email: 'office@example.test',
    workplace: '',
    managerName: 'не указан',
    contacts: [
      { type: 'phone', value: '8-0000000', label: 'Внутренний телефон' },
      { type: 'phone', value: '8-900-000-00-00', label: 'Мобильный телефон' },
      { type: 'email', value: 'office@example.test', label: 'Email' },
    ],
  });
});
