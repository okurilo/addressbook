import type {
  Employee,
  EmployeeContact,
  EmployeeSearchResponse,
  EmployeeStatus,
} from '../apps/AddressBook/api/directory/types';
import { http } from './http';

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
    totalElements?: number;
    totalPages?: number;
    success?: boolean;
  };
  success?: boolean;
};

type MultiSearchResponse = {
  data?: {
    PERSONADDRESSBOOK?: MultiSearchCategoryResponse;
  };
  success?: boolean;
};

const PERSON_CATEGORY = 'PERSONADDRESSBOOK';

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

const getInitials = (fullName: string, firstName: string | null, lastName: string | null): string => {
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
  const email =
    readContactValue(value, 'jcontactsinterofficeemail') ??
    readContactValue(value, 'jcontactscompanyemail') ??
    readContactValue(value, 'jcontactsexternalemail') ??
    readContactValue(value, 'pcontactsexternalemail') ??
    '';
  const state = readString(unitData, 'state');
  const city = readString(unitData, 'city');
  const workplaceParts = [state, city].filter(
    (item, index, items): item is string => item !== null && items.indexOf(item) === index
  );

  return {
    id,
    fullName,
    subtitle: readString(unitData, 'balanceUnitName') ?? readString(value, 'company') ?? '',
    avatarInitials: getInitials(fullName, firstName, lastName),
    status: getStatus(value, employeeData),
    shortStructure:
      readString(unitData, 'balanceUnitName') ?? readString(unitData, 'shortName') ?? '',
    departmentId: readString(unitData, 'unitId') ?? '',
    departmentName: readString(unitData, 'fullName') ?? readString(unitData, 'shortName') ?? '',
    position: readString(positionData, 'fullName') ?? readString(positionData, 'shortName') ?? '',
    employeeNumber,
    phone,
    mobilePhone,
    email,
    workplace: workplaceParts.join(', '),
    managerName: 'не указан',
    contacts: createContacts(phone, mobilePhone, email),
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

  searchParams.append('orgFilter', orgFilter ?? 'null');

  return http.get<MultiSearchResponse>(
    `/globalsearch/api/v3/multiSearch?query=${encodeURIComponent(query)}&${searchParams.toString()}`,
    {
      input: { signal },
    }
  );
};

export const fetchDirectoryEmployees = async (
  query: string,
  signal?: AbortSignal,
  orgFilter: string | null = null
): Promise<EmployeeSearchResponse> => {
  const response = await getSearchData({
    signal,
    query,
    page: 0,
    size: 20,
    categories: [PERSON_CATEGORY],
    orgFilter,
  });
  const content = response.data?.PERSONADDRESSBOOK?.data?.content;

  if (!Array.isArray(content)) {
    throw new Error('MultiSearch response does not contain PERSONADDRESSBOOK content');
  }

  const items = content.map(mapPerson).filter((employee): employee is Employee => employee !== null);

  return {
    items,
    query,
    total: response.data?.PERSONADDRESSBOOK?.data?.totalElements ?? items.length,
  };
};
