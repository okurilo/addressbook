import {
  hostMockGroupsById,
  hostMockHierarchyRoot,
  hostMockPeople,
  hostMockReferencePhoneCategories,
  hostMockReferencePhones,
} from './addressBookMockFixtures';
import type { HostMockGroupNode, HostMockPerson } from './addressBookMockFixtures';

type MockScenario = 'success' | 'loading' | 'empty' | 'error';

type MockTeam = {
  id: string;
  type: string;
  typeOrder: number;
  name: string;
  isCustom: boolean;
  structureLink?: string;
};

type MockTeamState = MockTeam & {
  personIds: string[];
};

type MockHistoryItem = {
  id: string;
  path: string;
  text: string;
  key: {
    context: string;
    id: string;
  };
};

type StoredMockState = {
  history: MockHistoryItem[];
  teams: MockTeamState[];
};

type UpdateGroupBody = {
  groupId?: unknown;
  name?: unknown;
  personsToAdd?: unknown;
  personsToDelete?: unknown;
};

type CreateGroupBody = {
  name?: unknown;
  persons?: unknown;
};

const SCENARIO_STORAGE_KEY = 'addressbook-mock-scenario';
const STATE_STORAGE_KEY = 'addressbook-host-api-state';
const DEFAULT_DELAY_MS = 180;
const LOADING_DELAY_MS = 1200;

const getFullName = (person: HostMockPerson): string =>
  `${person.lastName} ${person.firstName} ${person.middleName}`;

const createDefaultState = (): StoredMockState => ({
  history: hostMockPeople.slice(0, 4).map((person, index) => ({
    id: `history-${index + 1}`,
    path: 'globalsearch:persons',
    text: getFullName(person),
    key: {
      context: 'persons',
      id: person.id,
    },
  })),
  teams: [
    {
      id: 'team-favorites',
      type: 'группа',
      typeOrder: 1,
      name: 'Избранные',
      isCustom: true,
      personIds: ['person-001', 'person-003'],
    },
    {
      id: 'team-project',
      type: 'группа',
      typeOrder: 2,
      name: 'Проектная команда',
      isCustom: true,
      personIds: ['person-002', 'person-004', 'person-005'],
    },
    {
      id: 'team-structure',
      type: 'структура',
      typeOrder: 3,
      name: 'Моё подразделение',
      isCustom: false,
      structureLink: 'dept-digital-platforms',
      personIds: ['person-001', 'person-005'],
    },
  ],
});

const isStoredState = (value: unknown): value is StoredMockState => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return Array.isArray(candidate.history) && Array.isArray(candidate.teams);
};

const readState = (): StoredMockState => {
  const storedValue = window.localStorage.getItem(STATE_STORAGE_KEY);

  if (storedValue !== null) {
    try {
      const parsedValue = JSON.parse(storedValue) as unknown;

      if (isStoredState(parsedValue)) {
        return parsedValue;
      }
    } catch {
      window.localStorage.removeItem(STATE_STORAGE_KEY);
    }
  }

  const initialState = createDefaultState();
  window.localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(initialState));
  return initialState;
};

const writeState = (state: StoredMockState): void => {
  window.localStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(state));
};

const getScenario = (): MockScenario => {
  const scenario = window.localStorage.getItem(SCENARIO_STORAGE_KEY);

  if (scenario === 'loading' || scenario === 'empty' || scenario === 'error') {
    return scenario;
  }

  return 'success';
};

const wait = (ms: number, signal?: AbortSignal | null): Promise<void> =>
  new Promise((resolve, reject) => {
    if (signal?.aborted === true) {
      reject(new DOMException('The operation was aborted', 'AbortError'));
      return;
    }

    const timeoutId = window.setTimeout(resolve, ms);

    signal?.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timeoutId);
        reject(new DOMException('The operation was aborted', 'AbortError'));
      },
      { once: true }
    );
  });

const createJsonResponse = (status: number, body: unknown): Response =>
  new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });

const createDataResponse = (data: unknown, status = 200): Response =>
  createJsonResponse(status, { data });

const getRequestMethod = (input: RequestInfo | URL, init?: RequestInit): string =>
  (
    init?.method ??
    (typeof input === 'string' || input instanceof URL ? 'GET' : input.method)
  ).toUpperCase();

const getRequestSignal = (
  input: RequestInfo | URL,
  init?: RequestInit
): AbortSignal | null | undefined =>
  init?.signal ?? (typeof input === 'string' || input instanceof URL ? undefined : input.signal);

const readRequestBody = async (input: RequestInfo | URL, init?: RequestInit): Promise<unknown> => {
  const body =
    init?.body ??
    (typeof input === 'string' || input instanceof URL ? undefined : await input.clone().text());

  if (typeof body !== 'string' || body.trim() === '') {
    return {};
  }

  try {
    return JSON.parse(body) as unknown;
  } catch {
    return {};
  }
};

const readStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

const normalize = (value: string): string => value.trim().toLocaleLowerCase('ru');

const matchesPerson = (person: HostMockPerson, query: string): boolean => {
  const normalizedQuery = normalize(query);

  if (normalizedQuery === '') {
    return true;
  }

  return [
    getFullName(person),
    person.position,
    person.functionalBlock,
    person.departmentName,
    person.departmentShortName,
    person.employeeId,
  ]
    .join(' ')
    .toLocaleLowerCase('ru')
    .includes(normalizedQuery);
};

const toSearchPerson = (person: HostMockPerson): Record<string, unknown> => ({
  personUuid: person.id,
  pbasic: {
    fullName: getFullName(person),
    firstName: person.firstName,
    lastName: person.lastName,
    midName: person.middleName,
  },
  jbasic: {
    employeeId: person.employeeId,
    status: 'АКТИВНЫЙ',
  },
  junit: {
    unit: [
      {
        unitId: person.departmentId,
        fullName: person.departmentName,
        shortName: person.departmentShortName,
        balanceUnitName: person.functionalBlock,
        city: person.city,
        state: person.city,
      },
    ],
  },
  jposition: {
    position: [
      {
        fullName: person.position,
        shortName: person.position,
        funcBlock: person.functionalBlock,
      },
    ],
  },
  jcontactsinterofficetel: { value: person.officePhone },
  jcontactsmobile: { value: person.mobilePhone },
  jcontactsinterofficeemail: { value: person.email },
  jcontactsexternalemail: { value: person.personalEmail },
});

const toTeamMember = (person: HostMockPerson): Record<string, unknown> => ({
  personId: person.id,
  firstName: person.firstName,
  lastName: person.lastName,
  midName: person.middleName,
  fullName: getFullName(person),
  contacts: {
    officeEmail: person.email,
    externalEmail: person.personalEmail,
    mobile: person.mobilePhone,
    officePhone: person.officePhone,
  },
});

const toPublicTeam = (team: MockTeamState, name = team.name): MockTeam => ({
  id: team.id,
  type: team.type,
  typeOrder: team.typeOrder,
  name,
  isCustom: team.isCustom,
  structureLink: team.structureLink,
});

const createCategory = (content: unknown[]): Record<string, unknown> => ({
  data: {
    content,
    last: true,
    totalElements: content.length,
    totalPages: content.length === 0 ? 0 : 1,
    success: true,
  },
  success: true,
});

const handleMultiSearch = (url: URL, isEmpty: boolean): Response => {
  const query = url.searchParams.get('query') ?? '';
  const orgFilter = url.searchParams.get('orgFilter');
  const categories = url.searchParams.getAll('category');
  const requestedCategories =
    categories.length === 0 ? ['PERSONADDRESSBOOK'] : categories.map((item) => item.toUpperCase());
  const people = isEmpty
    ? []
    : hostMockPeople
        .filter((person) => orgFilter === null || person.departmentId === orgFilter)
        .filter((person) => matchesPerson(person, query))
        .map(toSearchPerson);
  const organizations = isEmpty
    ? []
    : Object.values(hostMockGroupsById)
        .filter((group) => group.id !== hostMockHierarchyRoot.id)
        .filter((group) => normalize(group.name).includes(normalize(query)))
        .map((group) => ({
          id: group.id,
          fullName: group.name,
          typeName: 'Подразделение',
          layer: 'department',
          layerName: 'Подразделение',
        }));
  const payload: Record<string, unknown> = {};

  if (requestedCategories.includes('PERSONADDRESSBOOK')) {
    payload.PERSONADDRESSBOOK = createCategory(people);
  }

  if (requestedCategories.includes('ORGSTRUCTURE')) {
    payload.ORGSTRUCTURE = createCategory(organizations);
  }

  return createDataResponse(payload);
};

const handleHistory = async (
  url: URL,
  method: string,
  input: RequestInfo | URL,
  init: RequestInit | undefined,
  isEmpty: boolean
): Promise<Response> => {
  const state = readState();
  const historyIdMatch = url.pathname.match(/\/history\/([^/]+)$/u);

  if (method === 'GET') {
    const size = Number(url.searchParams.get('size') ?? '4');
    return createDataResponse(isEmpty ? [] : state.history.slice(0, Number.isFinite(size) ? size : 4));
  }

  if (method === 'POST' && historyIdMatch !== null) {
    const selectedId = decodeURIComponent(historyIdMatch[1]);
    const selectedItem = state.history.find((item) => item.id === selectedId);

    if (selectedItem !== undefined) {
      state.history = [selectedItem, ...state.history.filter((item) => item.id !== selectedId)];
      writeState(state);
    }

    return createDataResponse(undefined);
  }

  if (method === 'POST') {
    const body = await readRequestBody(input, init);

    if (typeof body === 'object' && body !== null) {
      const record = body as Record<string, unknown>;
      const key = record.key;

      if (typeof record.text === 'string' && typeof key === 'object' && key !== null) {
        const keyRecord = key as Record<string, unknown>;

        if (typeof keyRecord.id === 'string' && typeof keyRecord.context === 'string') {
          const nextItem: MockHistoryItem = {
            id: `history-${Date.now()}`,
            path: 'globalsearch:persons',
            text: record.text,
            key: {
              context: keyRecord.context,
              id: keyRecord.id,
            },
          };
          state.history = [
            nextItem,
            ...state.history.filter((item) => item.key.id !== nextItem.key.id),
          ].slice(0, 20);
          writeState(state);
        }
      }
    }

    return createDataResponse(undefined);
  }

  return createJsonResponse(405, { message: 'Method not allowed' });
};

const hasSystemRequestHeaders = (input: RequestInfo | URL, init?: RequestInit): boolean => {
  const headers = new Headers(
    init?.headers ??
      (typeof input === 'string' || input instanceof URL ? undefined : input.headers)
  );

  return headers.has('HRP-Device-Type') || headers.has('X-HRP-Device-Type');
};

const handleTeams = (
  url: URL,
  method: string,
  input: RequestInfo | URL,
  init: RequestInit | undefined,
  isEmpty: boolean
): Response => {
  if (method !== 'GET') {
    return createJsonResponse(405, { message: 'Method not allowed' });
  }

  const state = readState();
  const teamIdMatch = url.pathname.match(/\/teams\/([^/]+)$/u);

  if (teamIdMatch === null) {
    const usesCommonHttp = hasSystemRequestHeaders(input, init);
    const teams = state.teams.map((team) =>
      toPublicTeam(
        team,
        team.id === 'team-favorites' && !usesCommonHttp ? 'Избранное' : team.name
      )
    );
    return createDataResponse(isEmpty ? [] : teams);
  }

  const teamId = decodeURIComponent(teamIdMatch[1]);
  const team = state.teams.find((item) => item.id === teamId);

  if (team === undefined) {
    return createJsonResponse(404, { message: 'Team not found' });
  }

  const content = isEmpty
    ? []
    : team.personIds
        .map((personId) => hostMockPeople.find((person) => person.id === personId))
        .filter((person): person is HostMockPerson => person !== undefined)
        .map(toTeamMember);

  return createDataResponse({
    content,
    number: 0,
    size: Number(url.searchParams.get('size') ?? '20'),
    totalElements: content.length,
    totalPages: content.length === 0 ? 0 : 1,
  });
};

const handleCreateGroup = async (
  method: string,
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  if (method !== 'POST') {
    return createJsonResponse(405, { message: 'Method not allowed' });
  }

  const body = (await readRequestBody(input, init)) as CreateGroupBody;
  const state = readState();
  const requestedName =
    typeof body.name === 'string' && body.name.trim() !== '' ? body.name.trim() : 'Новая группа';
  const isFavoritesGroup = ['избранное', 'избранные'].includes(
    requestedName.toLocaleLowerCase('ru')
  );
  const groupName = isFavoritesGroup ? 'Избранные' : requestedName;
  const group: MockTeamState = {
    id: isFavoritesGroup ? 'team-favorites' : `team-${Date.now()}`,
    type: 'группа',
    typeOrder: state.teams.length + 1,
    name: groupName,
    isCustom: true,
    personIds: readStringArray(body.persons),
  };
  state.teams.push(group);
  writeState(state);

  return createJsonResponse(200, toPublicTeam(group, isFavoritesGroup ? 'Избранное' : group.name));
};

const handleUpdateGroup = async (
  method: string,
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> => {
  if (method !== 'POST') {
    return createJsonResponse(405, { message: 'Method not allowed' });
  }

  const body = (await readRequestBody(input, init)) as UpdateGroupBody;

  if (typeof body.groupId !== 'string') {
    return createJsonResponse(400, { message: 'groupId is required' });
  }

  const state = readState();
  const team = state.teams.find((item) => item.id === body.groupId);

  if (team === undefined) {
    return createJsonResponse(404, { message: 'Team not found' });
  }

  const personsToAdd = readStringArray(body.personsToAdd);
  const personsToDelete = new Set(readStringArray(body.personsToDelete));
  team.personIds = Array.from(
    new Set([...team.personIds.filter((personId) => !personsToDelete.has(personId)), ...personsToAdd])
  );

  if (
    team.id !== 'team-favorites' &&
    typeof body.name === 'string' &&
    body.name.trim() !== ''
  ) {
    team.name = body.name;
  }

  writeState(state);
  return createDataResponse(undefined);
};

const cloneGroup = (group: HostMockGroupNode): HostMockGroupNode => ({
  ...group,
  children: group.children.map(cloneGroup),
  parentTree:
    group.parentTree === undefined
      ? undefined
      : {
          ...group.parentTree,
          children: group.parentTree.children.map(cloneGroup),
        },
});

const handleGroups = (url: URL, method: string, isEmpty: boolean): Response => {
  if (method !== 'GET') {
    return createJsonResponse(405, { message: 'Method not allowed' });
  }

  if (isEmpty) {
    return createDataResponse({
      id: 'empty-root',
      type: 'company',
      name: 'Кадровая структура',
      hasChild: false,
      children: [],
    });
  }

  const id = url.searchParams.get('id') ?? 'dept-digital-platforms';
  const group = hostMockGroupsById[id];

  return group === undefined
    ? createJsonResponse(404, { message: 'Group not found' })
    : createDataResponse(cloneGroup(group));
};

const handleProfile = (url: URL, method: string, isEmpty: boolean): Response => {
  if (method !== 'GET') {
    return createJsonResponse(405, { message: 'Method not allowed' });
  }

  const personId = url.searchParams.get('userId') ?? hostMockPeople[0].id;
  const person = hostMockPeople.find((item) => item.id === personId) ?? hostMockPeople[0];

  if (isEmpty) {
    return createDataResponse([]);
  }

  return createDataResponse([
    {
      code: 'mainInfo_v1',
      data: {
        contactsV2: {
          workAddress: person.workAddress,
          mails: {
            sigma: { mail: person.email },
            alpha: { mail: person.personalEmail },
          },
          phones: {
            personal: { phone: person.mobilePhone },
          },
        },
        schedule: { timezone: person.timezone },
        linear: {
          position: person.position,
          orgPath: [{ title: person.functionalBlock }, { title: person.departmentName }],
        },
        birthDate: { day: 14, month: 5 },
      },
    },
    {
      code: 'about',
      data: {
        socialNets: { sberchat: person.sberchat },
      },
    },
    {
      code: 'manager',
      data: {
        managers: [
          {
            isLinear: true,
            lastName: person.managerName.split(' ')[0] ?? '',
            firstName: person.managerName.split(' ')[1] ?? '',
            secondName: '',
            userId: person.managerId,
          },
        ],
      },
    },
    { code: 'roles', data: {} },
  ]);
};

const handleContacts = (method: string, isEmpty: boolean): Response => {
  if (method !== 'GET') {
    return createJsonResponse(405, { message: 'Method not allowed' });
  }

  return createDataResponse(
    isEmpty
      ? []
      : [
          {
            code: 'contacts',
            data: {
              contactsV2: {
                phones: {
                  personal: { phone: hostMockPeople[0].mobilePhone },
                },
              },
            },
          },
        ]
  );
};

const handleLegacyApi = (url: URL, method: string, isEmpty: boolean): Response => {
  if (method !== 'GET') {
    return createJsonResponse(405, { message: 'Method not allowed' });
  }

  if (url.pathname === '/api/directory/reference-phone-categories') {
    return createJsonResponse(200, { items: isEmpty ? [] : hostMockReferencePhoneCategories });
  }

  if (url.pathname === '/api/directory/reference-phones') {
    const categoryId = url.searchParams.get('categoryId');
    const items = hostMockReferencePhones.filter(
      (item) => categoryId === null || item.categoryId === categoryId
    );
    return createJsonResponse(200, { items: isEmpty ? [] : items });
  }

  const employeeMatch = url.pathname.match(/\/api\/directory\/employees\/([^/]+)$/u);

  if (employeeMatch !== null) {
    const personId = decodeURIComponent(employeeMatch[1]);
    const person = hostMockPeople.find((item) => item.id === personId);

    if (person === undefined || isEmpty) {
      return createJsonResponse(404, { message: 'Employee not found' });
    }

    return createJsonResponse(200, {
      id: person.id,
      fullName: getFullName(person),
      firstName: person.firstName,
      lastName: person.lastName,
      subtitle: person.functionalBlock,
      avatarInitials: `${person.firstName[0]}${person.lastName[0]}`,
      status: 'available',
      shortStructure: person.departmentShortName,
      departmentId: person.departmentId,
      departmentName: person.departmentName,
      position: person.position,
      employeeNumber: person.employeeId,
      phone: person.officePhone,
      mobilePhone: person.mobilePhone,
      email: person.email,
      workplace: person.workAddress,
      managerName: person.managerName,
      contacts: [
        { type: 'phone', value: person.officePhone, label: 'Внутренний телефон' },
        { type: 'phone', value: person.mobilePhone, label: 'Мобильный телефон' },
        { type: 'email', value: person.email, label: 'Email' },
      ],
    });
  }

  return createJsonResponse(404, { message: 'Host mock route not found' });
};

const routeRequest = async (
  url: URL,
  method: string,
  input: RequestInfo | URL,
  init: RequestInit | undefined,
  isEmpty: boolean
): Promise<Response> => {
  if (url.pathname === '/api-web/globalsearch/api/v3/multiSearch') {
    return handleMultiSearch(url, isEmpty);
  }

  if (url.pathname.startsWith('/api-web/globalsearch/api/v3/history')) {
    return handleHistory(url, method, input, init, isEmpty);
  }

  if (
    url.pathname === '/api-web/srv/v7/people/teams' ||
    url.pathname.startsWith('/api-web/srv/v7/people/teams/')
  ) {
    return handleTeams(url, method, input, init, isEmpty);
  }

  if (url.pathname === '/api-web/srv/v7/people/custom-groups') {
    return handleCreateGroup(method, input, init);
  }

  if (url.pathname === '/api-web/srv/v7/people/custom-groups/update') {
    return handleUpdateGroup(method, input, init);
  }

  if (url.pathname === '/api-web/posts/api/v1/addressbook/groups') {
    return handleGroups(url, method, isEmpty);
  }

  if (url.pathname === '/api-mobile/smart-profile/web/widgets/data') {
    return handleProfile(url, method, isEmpty);
  }

  if (url.pathname === '/api-web/smart-profile/web/widgets/data') {
    return handleContacts(method, isEmpty);
  }

  if (url.pathname === '/api-mobile/smart-profile/contacts/phoneCall') {
    return method === 'POST'
      ? createDataResponse(undefined)
      : createJsonResponse(405, { message: 'Method not allowed' });
  }

  if (url.pathname.startsWith('/api/')) {
    return handleLegacyApi(url, method, isEmpty);
  }

  return createJsonResponse(404, { message: 'Host mock route not found' });
};

export const installAddressBookMockTransport = (): void => {
  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    const requestUrl =
      typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    const url = new URL(requestUrl, window.location.origin);
    const isMockedPath =
      url.pathname.startsWith('/api-web/') ||
      url.pathname.startsWith('/api-mobile/') ||
      url.pathname.startsWith('/api/');

    if (!isMockedPath) {
      return originalFetch(input, init);
    }

    const scenario = getScenario();
    const signal = getRequestSignal(input, init);
    await wait(scenario === 'loading' ? LOADING_DELAY_MS : DEFAULT_DELAY_MS, signal);

    if (scenario === 'error') {
      return createJsonResponse(500, { message: 'Host mock error' });
    }

    return routeRequest(url, getRequestMethod(input, init), input, init, scenario === 'empty');
  };
};
