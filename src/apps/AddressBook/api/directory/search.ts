import type {
  DirectorySearchResponse,
  Employee,
  EmployeeContact,
  EmployeeSearchResponse,
  EmployeeStatus,
  OrganizationSearchResult,
} from './types';
import { http } from '../../../../http-requests/http';

type JsonRecord = Record<string, unknown>;

export type MultiSearchParams = {
  signal?: AbortSignal;
  query: string;
  page?: number;
  size?: number;
  categories?: string[];
  orgFilter?: string | null;
};

type MultiSearchCategoryResponse = {
  data?: {
    content?: unknown[];
    last?: boolean;
    number?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
    success?: boolean;
  };
  success?: boolean;
};

type MultiSearchResponse = {
  PERSONADDRESSBOOK?: MultiSearchCategoryResponse;
  ORGSTRUCTURE?: MultiSearchCategoryResponse;
};

const PERSON_CATEGORY = 'PERSONADDRESSBOOK';
const ORGSTRUCTURE_CATEGORY = 'ORGSTRUCTURE';

const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const readRecord = (record: JsonRecord | null, key: string): JsonRecord | null => {
  const value = record?.[key];
  return isRecord(value) ? value : null;
};

const readString = (record: JsonRecord | null, key: string): string | null => {
  const value = record?.[key];
  return typeof value === 'string' && value.trim() !== '' ? value : null;
};

const readBoolean = (record: JsonRecord | null, key: string): boolean | null => {
  const value = record?.[key];
  return typeof value === 'boolean' ? value : null;
};

const readFirstRecord = (record: JsonRecord | null, key: string): JsonRecord | null => {
  const value = record?.[key];

  if (!Array.isArray(value)) {
    return null;
  }

  const firstItem = value[0];
  return isRecord(firstItem) ? firstItem : null;
};

const readContactValue = (person: JsonRecord, key: string): string | null => {
  const contact = readRecord(person, key);

  if (contact === null) {
    return readString(person, key);
  }

  if (readBoolean(contact, 'hide') === true || readBoolean(contact, 'phoneHide') === true) {
    return null;
  }

  return readString(contact, 'value');
};

const readAbsence = (person: JsonRecord): Employee['absence'] => {
  const source = readRecord(person, 'absence') ?? readRecord(person, 'jbadgeabsencevacation');

  if (source === null) {
    return undefined;
  }

  const absence = {
    badge: readString(source, 'badge') ?? undefined,
    period: readString(source, 'period') ?? undefined,
    icon_dark: readString(source, 'icon_dark') ?? undefined,
    icon_light: readString(source, 'icon_light') ?? undefined,
  };

  return Object.values(absence).some((value) => value !== undefined) ? absence : undefined;
};

const getInitials = (
  fullName: string,
  firstName: string | null,
  lastName: string | null
): string => {
  const source = [firstName, lastName].filter((value): value is string => value !== null);
  const names = source.length > 0 ? source : fullName.split(/\s+/u);

  return names
    .slice(0, 2)
    .map((name) => name.charAt(0).toLocaleUpperCase('ru'))
    .join('');
};

const getStatus = (person: JsonRecord, basic: JsonRecord | null): EmployeeStatus => {
  if (person.jbadgeabsencevacation !== null && person.jbadgeabsencevacation !== undefined) {
    return 'vacation';
  }

  const status = readString(basic, 'status')?.toLocaleUpperCase('ru');
  const firedDate = readString(basic, 'firedDate');

  if (firedDate !== null || (status !== null && status !== 'АКТИВНЫЙ')) {
    return 'offline';
  }

  return 'available';
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

const mapPerson = (value: unknown): Employee | null => {
  if (!isRecord(value)) {
    return null;
  }

  const personalData = readRecord(value, 'pbasic');
  const employeeData = readRecord(value, 'jbasic');
  const unitData = readFirstRecord(readRecord(value, 'junit'), 'unit');
  const positionData = readFirstRecord(readRecord(value, 'jposition'), 'position');
  const firstName = readString(personalData, 'firstName');
  const lastName = readString(personalData, 'lastName');
  const middleName = readString(personalData, 'midName');
  const fullName =
    readString(personalData, 'fullName') ??
    [lastName, firstName, middleName].filter((item): item is string => item !== null).join(' ');
  const employeeNumber = readString(employeeData, 'employeeId') ?? '';
  const id = readString(value, 'personUuid') ?? employeeNumber;

  if (id === '' || fullName === '') {
    return null;
  }

  const phone = readContactValue(value, 'jcontactsinterofficetel');
  const mobilePhone =
    readContactValue(value, 'jcontactsmobile') ?? readContactValue(value, 'pcontactsmobile');
  const internalEmail =
    readContactValue(value, 'jcontactsinterofficeemail') ??
    readContactValue(value, 'jcontactscompanyemail');
  const externalEmail =
    readContactValue(value, 'jcontactsexternalemail') ??
    readContactValue(value, 'pcontactsexternalemail');
  const email = internalEmail ?? externalEmail ?? '';
  const photoUrl = readString(readRecord(value, 'pbasicphoto'), 'url');
  const state = readString(unitData, 'state');
  const city = readString(unitData, 'city');
  const workplaceParts = [state, city].filter(
    (item, index, items): item is string => item !== null && items.indexOf(item) === index
  );

  return {
    id,
    fullName,
    firstName: firstName ?? undefined,
    lastName: lastName ?? undefined,
    photoUrl: photoUrl ?? undefined,
    subtitle: readString(unitData, 'balanceUnitName') ?? readString(value, 'company') ?? '',
    avatarInitials: getInitials(fullName, firstName, lastName),
    status: getStatus(value, employeeData),
    shortStructure:
      readString(unitData, 'balanceUnitName') ?? readString(unitData, 'shortName') ?? '',
    departmentId: readString(unitData, 'unitId') ?? '',
    departmentName: readString(unitData, 'fullName') ?? readString(unitData, 'shortName') ?? '',
    position: readString(positionData, 'fullName') ?? readString(positionData, 'shortName') ?? '',
    functionalBlock: readString(positionData, 'funcBlock') ?? undefined,
    employeeNumber,
    phone,
    mobilePhone,
    email,
    absence: readAbsence(value),
    workplace: workplaceParts.join(', '),
    managerName: 'не указан',
    contacts: createContacts(phone, mobilePhone, email),
  };
};

const mapOrganization = (value: unknown): OrganizationSearchResult | null => {
  if (!isRecord(value)) {
    return null;
  }

  const id = readString(value, 'id');
  const fullName = readString(value, 'fullName');

  if (id === null || fullName === null) {
    return null;
  }

  return {
    id,
    fullName,
    typeName: readString(value, 'typeName') ?? undefined,
    layer: readString(value, 'layer') ?? undefined,
    layerName: readString(value, 'layerName') ?? undefined,
  };
};

export const getSearchData = async ({
  signal,
  query,
  page = 0,
  size = 30,
  categories = [],
  orgFilter = null,
}: MultiSearchParams): Promise<MultiSearchResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.append('page', `${page}`);
  searchParams.append('size', `${size}`);

  categories.forEach((category) => {
    searchParams.append('category', category.toLocaleUpperCase('ru'));
  });

  if (orgFilter !== null) {
    searchParams.append('orgFilter', orgFilter);
  }

  return http.get<MultiSearchResponse>(
    `/globalsearch/api/v3/multiSearch?query=${encodeURIComponent(
      query
    )}&${searchParams.toString()}`,
    {
      input: { signal },
    }
  );
};

export const fetchDirectoryEmployees = async (
  query: string,
  signal?: AbortSignal,
  orgFilter: string | null = null,
  page = 0,
  size = 20
): Promise<EmployeeSearchResponse> => {
  const response = await getSearchData({
    signal,
    query,
    page,
    size,
    categories: [PERSON_CATEGORY],
    orgFilter,
  });
  const content = response.PERSONADDRESSBOOK?.data?.content;

  if (!Array.isArray(content)) {
    throw new Error('MultiSearch response does not contain PERSONADDRESSBOOK content');
  }

  return {
    items: content.map(mapPerson).filter((employee): employee is Employee => employee !== null),
    query,
    page: response.PERSONADDRESSBOOK?.data?.number ?? page,
    pageSize: response.PERSONADDRESSBOOK?.data?.size ?? size,
    totalElements: response.PERSONADDRESSBOOK?.data?.totalElements ?? null,
    totalPages: response.PERSONADDRESSBOOK?.data?.totalPages ?? null,
    isLastPage:
      response.PERSONADDRESSBOOK?.data?.last ??
      content.length < (response.PERSONADDRESSBOOK?.data?.size ?? size),
  };
};

export const fetchDirectorySuggestions = async (
  query: string,
  signal?: AbortSignal,
  category: 'people' | 'organizations' = 'people'
): Promise<DirectorySearchResponse> => {
  const response = await getSearchData({
    signal,
    query,
    page: 0,
    size: 20,
    categories: category === 'organizations' ? [ORGSTRUCTURE_CATEGORY] : [PERSON_CATEGORY],
    orgFilter: null,
  });
  const peopleContent = response.PERSONADDRESSBOOK?.data?.content;
  const organizationContent = response.ORGSTRUCTURE?.data?.content;

  if (!Array.isArray(peopleContent) && !Array.isArray(organizationContent)) {
    throw new Error('MultiSearch response does not contain directory search content');
  }

  return {
    items: Array.isArray(peopleContent)
      ? peopleContent.map(mapPerson).filter((employee): employee is Employee => employee !== null)
      : [],
    organizations: Array.isArray(organizationContent)
      ? organizationContent
          .map(mapOrganization)
          .filter((organization): organization is OrganizationSearchResult => organization !== null)
      : [],
    query,
    page: 0,
    pageSize: 20,
    totalElements: null,
    totalPages: null,
    isLastPage: true,
  };
};
