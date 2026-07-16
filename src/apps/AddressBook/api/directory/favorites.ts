import { http } from '../../../../http-requests/http';
import type { Employee, EmployeeContact } from './types';

const FAVORITES_TEAM_NAME = 'избранные';
const FAVORITES_PAGE_SIZE = 20;
const PEOPLE_TEAMS_PATH = '/srv/v7/people/teams';
const CUSTOM_GROUPS_PATH = '/srv/v7/people/custom-groups';
const UPDATE_CUSTOM_GROUP_PATH = `${CUSTOM_GROUPS_PATH}/update`;

export type PeopleTeam = {
  id: string;
  type: string;
  typeOrder: number;
  name: string;
  isCustom: boolean;
  structureLink?: string;
};

type TeamMemberContacts = {
  externalEmail?: string | null;
  officeEmail?: string | null;
  mobile?: string | null;
  officePhone?: string | null;
};

export type TeamMember = {
  firstName?: string | null;
  lastName?: string | null;
  midName?: string | null;
  fullName?: string | null;
  personId?: string | null;
  contacts?: TeamMemberContacts | null;
};

export type TeamMembersPage = {
  content?: TeamMember[];
  last?: boolean;
  number?: number;
  size?: number;
  totalElements?: number;
  totalPages?: number;
};

export type CustomPeopleGroup = {
  id: string;
  name: string;
  employees: Employee[];
  nextPage: number;
  isLastPage: boolean;
  lastPageSignature: string;
};

export type CustomPeopleGroupPage = {
  employees: Employee[];
  nextPage: number;
  isLastPage: boolean;
};

type CreateCustomGroupBody = {
  name: string;
  persons: string[];
};

type UpdateCustomGroupBody = {
  name: string;
  groupId: string;
  personsToAdd: string[];
  personsToDelete: string[];
};

const getTrimmedValue = (value?: string | null): string => value?.trim() ?? '';

const getInitials = (fullName: string, firstName: string, lastName: string): string => {
  const names = [firstName, lastName].filter((value) => value !== '');
  const source = names.length > 0 ? names : fullName.split(/\s+/u);

  return source
    .slice(0, 2)
    .map((name) => name.charAt(0).toLocaleUpperCase('ru'))
    .join('');
};

const createContacts = (
  phone: string | null,
  mobilePhone: string | null,
  email: string
): EmployeeContact[] => {
  const contacts: EmployeeContact[] = [];

  if (phone !== null) {
    contacts.push({ type: 'phone', value: phone, label: 'Внутренний телефон' });
  }

  if (mobilePhone !== null) {
    contacts.push({ type: 'phone', value: mobilePhone, label: 'Мобильный телефон' });
  }

  if (email !== '') {
    contacts.push({ type: 'email', value: email, label: 'Email' });
  }

  return contacts;
};

const normalizeTeamMember = (member: TeamMember): Employee | null => {
  const firstName = getTrimmedValue(member.firstName);
  const lastName = getTrimmedValue(member.lastName);
  const midName = getTrimmedValue(member.midName);
  const fullName =
    getTrimmedValue(member.fullName) ||
    [lastName, firstName, midName].filter((value) => value !== '').join(' ');
  const id = getTrimmedValue(member.personId);

  if (id === '' || fullName === '') {
    return null;
  }

  const phone = getTrimmedValue(member.contacts?.officePhone) || null;
  const mobilePhone = getTrimmedValue(member.contacts?.mobile) || null;
  const email =
    getTrimmedValue(member.contacts?.officeEmail) ||
    getTrimmedValue(member.contacts?.externalEmail);

  return {
    id,
    fullName,
    firstName: firstName || undefined,
    lastName: lastName || undefined,
    subtitle: '',
    avatarInitials: getInitials(fullName, firstName, lastName),
    status: 'available',
    shortStructure: '',
    departmentId: '',
    departmentName: '',
    position: '',
    employeeNumber: '',
    phone,
    mobilePhone,
    email,
    workplace: '',
    managerName: 'не указан',
    contacts: createContacts(phone, mobilePhone, email),
  };
};

export const findFavoritesTeam = (teams: PeopleTeam[]): PeopleTeam | null =>
  teams.find(
    (team) => team.isCustom && team.name.trim().toLocaleLowerCase('ru') === FAVORITES_TEAM_NAME
  ) ?? null;

export const normalizeTeamMembers = (response: TeamMembersPage): Employee[] => {
  if (!Array.isArray(response.content)) {
    throw new Error('Team response does not contain content');
  }

  return response.content
    .map(normalizeTeamMember)
    .filter((employee): employee is Employee => employee !== null);
};

const fetchPeopleTeams = async (signal?: AbortSignal): Promise<PeopleTeam[]> =>
  http.get<PeopleTeam[]>(PEOPLE_TEAMS_PATH, { input: { signal } });

export const fetchCustomPeopleGroupPage = async (
  teamId: string,
  page: number,
  signal?: AbortSignal
): Promise<CustomPeopleGroupPage> => {
  const searchParams = new URLSearchParams({
    page: `${page}`,
    size: `${FAVORITES_PAGE_SIZE}`,
    isCustom: 'true',
  });
  const response = await http.get<TeamMembersPage>(
    `/srv/v7/people/teams/${encodeURIComponent(teamId)}?${searchParams.toString()}`,
    { input: { signal } }
  );

  return {
    employees: normalizeTeamMembers(response),
    nextPage: page + 1,
    isLastPage:
      response.last ??
      (response.totalPages !== undefined
        ? page + 1 >= response.totalPages
        : (response.content?.length ?? 0) < FAVORITES_PAGE_SIZE),
  };
};

const fetchTeamEmployees = async (teamId: string, signal?: AbortSignal): Promise<Employee[]> => {
  const employeesById = new Map<string, Employee>();
  let page = 0;
  let previousSignature = '';

  while (true) {
    const response = await fetchCustomPeopleGroupPage(teamId, page, signal);
    const signature = response.employees.map((employee) => employee.id).join('|');

    if (page > 0 && signature !== '' && signature === previousSignature) {
      break;
    }

    response.employees.forEach((employee) => {
      employeesById.set(employee.id, employee);
    });

    if (response.isLastPage || response.employees.length === 0) {
      break;
    }

    previousSignature = signature;
    page += 1;
  }

  return Array.from(employeesById.values());
};

export const fetchCustomPeopleGroups = async (
  signal?: AbortSignal
): Promise<CustomPeopleGroup[]> => {
  const teams = await fetchPeopleTeams(signal);
  const customTeams = teams.filter((team) => team.isCustom);

  return Promise.all(
    customTeams.map(async (team) => {
      const firstPage = await fetchCustomPeopleGroupPage(team.id, 0, signal);

      return {
        id: team.id,
        name: team.name,
        employees: firstPage.employees,
        nextPage: firstPage.nextPage,
        isLastPage: firstPage.isLastPage,
        lastPageSignature: firstPage.employees.map((employee) => employee.id).join('|'),
      };
    })
  );
};

export const fetchAllCustomPeopleGroupEmployees = async (
  group: CustomPeopleGroup,
  signal?: AbortSignal
): Promise<Employee[]> => {
  const employeesById = new Map(group.employees.map((employee) => [employee.id, employee]));
  let page = group.nextPage;
  let { isLastPage } = group;
  let previousSignature = group.employees.map((employee) => employee.id).join('|');

  while (!isLastPage) {
    const response = await fetchCustomPeopleGroupPage(group.id, page, signal);
    const signature = response.employees.map((employee) => employee.id).join('|');

    if (signature !== '' && signature === previousSignature) {
      break;
    }

    response.employees.forEach((employee) => {
      employeesById.set(employee.id, employee);
    });

    if (response.employees.length === 0) {
      break;
    }

    previousSignature = signature;
    page = response.nextPage;
    isLastPage = response.isLastPage;
  }

  return Array.from(employeesById.values());
};

export const fetchFavoriteEmployees = async (): Promise<Employee[]> => {
  const teams = await fetchPeopleTeams();
  const favoritesTeam = findFavoritesTeam(teams);

  if (favoritesTeam === null) {
    return [];
  }

  return fetchTeamEmployees(favoritesTeam.id);
};

export const addFavoriteEmployee = async (employeeId: string): Promise<void> => {
  const teams = await fetchPeopleTeams();
  const favoritesTeam = findFavoritesTeam(teams);

  if (favoritesTeam === null) {
    const body: CreateCustomGroupBody = {
      name: FAVORITES_TEAM_NAME,
      persons: [employeeId],
    };

    await http.post<void>(CUSTOM_GROUPS_PATH, body);
    return;
  }

  const body: UpdateCustomGroupBody = {
    name: favoritesTeam.name,
    groupId: favoritesTeam.id,
    personsToAdd: [employeeId],
    personsToDelete: [],
  };

  await http.post<void>(UPDATE_CUSTOM_GROUP_PATH, body);
};

export const removeFavoriteEmployee = async (employeeId: string): Promise<void> => {
  const teams = await fetchPeopleTeams();
  const favoritesTeam = findFavoritesTeam(teams);

  if (favoritesTeam === null) {
    return;
  }

  const body: UpdateCustomGroupBody = {
    name: favoritesTeam.name,
    groupId: favoritesTeam.id,
    personsToAdd: [],
    personsToDelete: [employeeId],
  };

  await http.post<void>(UPDATE_CUSTOM_GROUP_PATH, body);
};

