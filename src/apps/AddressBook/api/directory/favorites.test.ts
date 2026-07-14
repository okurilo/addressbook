import { deepStrictEqual, strictEqual } from 'node:assert';
import { test } from 'node:test';
import type { PeopleTeam, TeamMembersPage } from './favorites';
import {
  addFavoriteEmployee,
  findFavoritesTeam,
  normalizeTeamMembers,
  removeFavoriteEmployee,
} from './favorites';

type CapturedRequest = {
  body: unknown;
  method: string;
  url: string;
};

const useFetchResponses = (
  responses: unknown[],
  run: (requests: CapturedRequest[]) => Promise<void>
): Promise<void> => {
  const originalFetch = globalThis.fetch;
  const requests: CapturedRequest[] = [];
  let responseIndex = 0;

  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const url =
      typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    const body = typeof init?.body === 'string' ? (JSON.parse(init.body) as unknown) : null;

    requests.push({
      body,
      method: init?.method ?? 'GET',
      url,
    });

    const response = responses[responseIndex];
    responseIndex += 1;

    return new Response(JSON.stringify({ data: response }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  };

  return run(requests).finally(() => {
    globalThis.fetch = originalFetch;
  });
};

test('находит кастомную группу «Избранное»', () => {
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
      name: 'Избранное',
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
      name: 'Избранное',
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

test('добавляет человека в существующую группу «Избранное»', async () => {
  const favoritesTeam: PeopleTeam = {
    id: 'favorites-team',
    type: 'группа',
    typeOrder: 100,
    name: 'Избранное',
    isCustom: true,
  };

  await useFetchResponses([[favoritesTeam], undefined], async (requests) => {
    await addFavoriteEmployee('person-1');

    strictEqual(requests.length, 2);
    strictEqual(requests[0]?.url, '/api-web/srv/v7/people/teams');
    strictEqual(requests[1]?.url, '/api-web/srv/v7/people/custom-groups/update');
    strictEqual(requests[1]?.method, 'POST');
    deepStrictEqual(requests[1]?.body, {
      name: 'Избранное',
      groupId: 'favorites-team',
      personsToAdd: ['person-1'],
      personsToDelete: [],
    });
  });
});

test('создаёт группу «избранное» вместе с первым человеком', async () => {
  await useFetchResponses([[], undefined], async (requests) => {
    await addFavoriteEmployee('person-1');

    strictEqual(requests.length, 2);
    strictEqual(requests[1]?.url, '/api-web/srv/v7/people/custom-groups');
    strictEqual(requests[1]?.method, 'POST');
    deepStrictEqual(requests[1]?.body, {
      name: 'избранное',
      persons: ['person-1'],
    });
  });
});

test('удаляет человека из существующей группы', async () => {
  const favoritesTeam: PeopleTeam = {
    id: 'favorites-team',
    type: 'группа',
    typeOrder: 100,
    name: 'Избранное',
    isCustom: true,
  };

  await useFetchResponses([[favoritesTeam], undefined], async (requests) => {
    await removeFavoriteEmployee('person-1');

    strictEqual(requests.length, 2);
    strictEqual(requests[1]?.url, '/api-web/srv/v7/people/custom-groups/update');
    strictEqual(requests[1]?.method, 'POST');
    deepStrictEqual(requests[1]?.body, {
      name: 'Избранное',
      groupId: 'favorites-team',
      personsToAdd: [],
      personsToDelete: ['person-1'],
    });
  });
});
