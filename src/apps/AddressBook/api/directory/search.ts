import type {
  Employee,
  EmployeeContact,
  EmployeeSearchResponse,
  EmployeeStatus,
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

  if (isRecord(value)) {
    return value;
  }

  if (Array.isArray(value) && isRecord(value[0])) {
    return value[0];
  }

  return null;
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

  if (isRecord(value)) {
    return value;
  }

  if (Array.isArray(value) && isRecord(value[0])) {
    return value[0];
  }

  return null;
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

const readFirstString = (record: JsonRecord | null, keys: string[]): string | null => {
  for (const key of keys) {
    const value = readString(record, key);

    if (value !== null) {
      return value;
    }
  }

  return null;
};

const hasPersonFields = (record: JsonRecord): boolean =>
  ['pbasic', 'jbasic', 'personUuid', 'employeeId', 'fullName', 'fio'].some(
    (key) => record[key] !== undefined
  );

const unwrapPerson = (record: JsonRecord): JsonRecord => {
  if (hasPersonFields(record)) {
    return record;
  }

  for (const key of ['data', 'source', '_source', 'person', 'payload']) {
    const nestedRecord = readRecord(record, key);

    if (nestedRecord !== null && hasPersonFields(nestedRecord)) {
      return nestedRecord;
    }
  }

  return record;
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

const mapPerson = (value: unknown, index: number): Employee | null => {
  if (!isRecord(value)) {
    return null;
  }

  const person = unwrapPerson(value);
  const personalData = readRecord(person, 'pbasic');
  const employeeData = readRecord(person, 'jbasic');
  const unitData = readFirstRecord(readRecord(person, 'junit'), 'unit');
  const positionData = readFirstRecord(readRecord(person, 'jposition'), 'position');
  const firstName =
    readFirstString(personalData, ['firstName', 'givenName']) ??
    readFirstString(person, ['firstName', 'givenName']);
  const lastName =
    readFirstString(personalData, ['lastName', 'familyName']) ??
    readFirstString(person, ['lastName', 'familyName']);
  const middleName =
    readFirstString(personalData, ['midName', 'middleName']) ??
    readFirstString(person, ['midName', 'middleName']);
  const composedName = [lastName, firstName, middleName]
    .filter((item): item is string => item !== null)
    .join(' ');
  const fullName =
    readFirstString(personalData, ['fullName', 'fio', 'displayName', 'name']) ??
    readFirstString(person, ['fullName', 'fio', 'displayName', 'title', 'name']) ??
    (composedName === '' ? 'Сотрудник' : composedName);
  const employeeNumber =
    readFirstString(employeeData, ['employeeId', 'employeeNumber', 'tabNumber']) ??
    readFirstString(person, ['employeeId', 'employeeNumber', 'tabNumber']) ??
    '';
  const responseId =
    readFirstString(person, ['personUuid', 'personUUID', 'personId', 'entityId', 'uuid', 'id']) ??
    readFirstString(value, ['personUuid', 'personId', 'entityId', 'uuid', 'id']);
  const id = responseId ?? (employeeNumber === '' ? `search-result-${index}` : employeeNumber);

  const phone =
    readContactValue(person, 'jcontactsinterofficetel') ??
    readFirstString(person, ['phone', 'workPhone']);
  const mobilePhone =
    readContactValue(person, 'jcontactsmobile') ??
    readContactValue(person, 'pcontactsmobile') ??
    readFirstString(person, ['mobilePhone', 'mobile']);
  const email =
    readContactValue(person, 'jcontactsinterofficeemail') ??
    readContactValue(person, 'jcontactscompanyemail') ??
    readContactValue(person, 'jcontactsexternalemail') ??
    readContactValue(person, 'pcontactsexternalemail') ??
    readFirstString(person, ['email', 'workEmail']) ??
    '';
  const state = readString(unitData, 'state');
  const city = readString(unitData, 'city');
  const workplaceParts = [state, city].filter(
    (item, index, items): item is string => item !== null && items.indexOf(item) === index
  );

  return {
    id,
    fullName,
    subtitle:
      readString(unitData, 'balanceUnitName') ??
      readFirstString(person, ['company', 'subtitle']) ??
      '',
    avatarInitials: getInitials(fullName, firstName, lastName),
    status: getStatus(person, employeeData),
    shortStructure:
      readString(unitData, 'balanceUnitName') ??
      readString(unitData, 'shortName') ??
      readFirstString(person, ['shortStructure', 'structureName']) ??
      '',
    departmentId:
      readString(unitData, 'unitId') ?? readFirstString(person, ['departmentId', 'unitId']) ?? '',
    departmentName:
      readString(unitData, 'fullName') ??
      readString(unitData, 'shortName') ??
      readFirstString(person, ['departmentName', 'unitName', 'department']) ??
      '',
    position:
      readString(positionData, 'fullName') ??
      readString(positionData, 'shortName') ??
      readFirstString(person, ['positionName', 'position', 'jobTitle']) ??
      '',
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

  if (orgFilter !== null) {
    searchParams.append('orgFilter', orgFilter);
  }

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
