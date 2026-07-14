import { http } from '../../../../http-requests/http';
import type { Employee, EmployeeContact } from './types';

const FAVORITES_TEAM_NAME = 'избранные';
const FAVORITES_PAGE_SIZE = 20;

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
  statuses?: unknown[];
  availableActions?: string[];
  isStack?: boolean;
};

export type TeamMembersPage = {
  content?: TeamMember[];
  totalElements?: number;
  totalPages?: number;
  last?: boolean;
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
    (team) =>
      team.isCustom && team.name.trim().toLocaleLowerCase('ru') === FAVORITES_TEAM_NAME
  ) ?? null;

export const normalizeTeamMembers = (response: TeamMembersPage): Employee[] => {
  if (!Array.isArray(response.content)) {
    throw new Error('Team response does not contain content');
  }

  return response.content
    .map(normalizeTeamMember)
    .filter((employee): employee is Employee => employee !== null);
};

export const fetchFavoriteEmployees = async (): Promise<Employee[]> => {
  const teams = await http.get<PeopleTeam[]>('/srv/v7/people/teams');
  const favoritesTeam = findFavoritesTeam(teams);

  if (favoritesTeam === null) {
    return [];
  }

  const searchParams = new URLSearchParams({
    page: '0',
    size: `${FAVORITES_PAGE_SIZE}`,
    isCustom: 'true',
  });
  const response = await http.get<TeamMembersPage>(
    `/srv/v7/people/teams/${encodeURIComponent(favoritesTeam.id)}?${searchParams.toString()}`
  );

  return normalizeTeamMembers(response);
};
