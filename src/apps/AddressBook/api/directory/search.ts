import type {
  Employee,
  EmployeeContact,
  EmployeeSearchResponse,
  EmployeeStatus,
} from './types';
import { http } from '../../../../http-requests/http';

export type MultiSearchParams = {
  signal?: AbortSignal;
  query: string;
  page?: number;
  size?: number;
  categories?: string[];
  orgFilter?: string | null;
};

type MultiSearchContact = {
  value?: string | null;
  hide?: boolean;
  phoneHide?: boolean;
};

type MultiSearchUnit = {
  balanceUnitName?: string | null;
  city?: string | null;
  fullName?: string | null;
  shortName?: string | null;
  state?: string | null;
  unitId?: string | null;
};

type MultiSearchPosition = {
  fullName?: string | null;
  shortName?: string | null;
};

export type MultiSearchPerson = {
  company?: string | null;
  jbadgeabsencevacation?: unknown;
  jbasic?: {
    employeeId?: string | null;
    firedDate?: string | null;
    status?: string | null;
  } | null;
  jcontactscompanyemail?: MultiSearchContact | null;
  jcontactsexternalemail?: MultiSearchContact | null;
  jcontactsinterofficeemail?: MultiSearchContact | null;
  jcontactsinterofficetel?: MultiSearchContact | null;
  jcontactsmobile?: MultiSearchContact | null;
  jposition?: {
    position?: Array<MultiSearchPosition & { funcBlock?: string | null }> | null;
  } | null;
  junit?: {
    unit?: MultiSearchUnit[] | null;
  } | null;
  pbasic?: {
    firstName?: string | null;
    fullName?: string | null;
    lastName?: string | null;
    midName?: string | null;
  } | null;
  pcontactsexternalemail?: MultiSearchContact | null;
  pcontactsmobile?: MultiSearchContact | null;
  personUuid?: string | null;
  pbasicphoto?: { url?: string | null } | null;
  absence?: {
    badge?: string | null;
    period?: string | null;
    icon_dark?: string | null;
    icon_light?: string | null;
  } | null;
};

type MultiSearchCategoryResponse = {
  data?: {
    content?: MultiSearchPerson[];
    last?: boolean;
    totalElements?: number;
    totalPages?: number;
  };
  success?: boolean;
};

export type MultiSearchResponse = {
  PERSONADDRESSBOOK?: MultiSearchCategoryResponse;
};

const PERSON_CATEGORY = 'PERSONADDRESSBOOK';

const getContactValue = (contact?: MultiSearchContact | null): string | null => {
  if (
    contact === null ||
    contact === undefined ||
    contact.hide === true ||
    contact.phoneHide === true
  ) {
    return null;
  }

  return contact.value?.trim() || null;
};

const getInitials = (
  fullName: string,
  firstName?: string | null,
  lastName?: string | null
): string => {
  const names = [firstName, lastName].filter(
    (value): value is string => typeof value === 'string' && value.trim() !== ''
  );
  const source = names.length > 0 ? names : fullName.split(/\s+/u);

  return source
    .slice(0, 2)
    .map((name) => name.charAt(0).toLocaleUpperCase('ru'))
    .join('');
};

const getStatus = (person: MultiSearchPerson): EmployeeStatus => {
  if (person.jbadgeabsencevacation !== null && person.jbadgeabsencevacation !== undefined) {
    return 'vacation';
  }

  const status = person.jbasic?.status?.toLocaleUpperCase('ru');
  const hasFiredDate =
    person.jbasic?.firedDate !== null && person.jbasic?.firedDate !== undefined;

  if (hasFiredDate || (status !== undefined && status !== 'АКТИВНЫЙ')) {
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

const mapPerson = (person: MultiSearchPerson): Employee | null => {
  const personalData = person.pbasic;
  const employeeData = person.jbasic;
  const unit = person.junit?.unit?.[0];
  const position = person.jposition?.position?.[0];
  const fullName =
    personalData?.fullName?.trim() ||
    [personalData?.lastName, personalData?.firstName, personalData?.midName]
      .filter((value): value is string => typeof value === 'string' && value.trim() !== '')
      .join(' ');
  const employeeNumber = employeeData?.employeeId?.trim() || '';
  const id = person.personUuid?.trim() || employeeNumber;

  if (id === '' || fullName === '') {
    return null;
  }

  const phone = getContactValue(person.jcontactsinterofficetel);
  const mobilePhone =
    getContactValue(person.jcontactsmobile) ?? getContactValue(person.pcontactsmobile);
  const email =
    getContactValue(person.jcontactsinterofficeemail) ??
    getContactValue(person.jcontactscompanyemail) ??
    getContactValue(person.jcontactsexternalemail) ??
    getContactValue(person.pcontactsexternalemail) ??
    '';
  const workplace = [unit?.state, unit?.city]
    .filter(
      (value, index, values): value is string =>
        typeof value === 'string' && value.trim() !== '' && values.indexOf(value) === index
    )
    .join(', ');

  return {
    id,
    fullName,
    subtitle: unit?.balanceUnitName?.trim() || person.company?.trim() || '',
    avatarInitials: getInitials(fullName, personalData?.firstName, personalData?.lastName),
    status: getStatus(person),
    shortStructure: unit?.balanceUnitName?.trim() || unit?.shortName?.trim() || '',
    departmentId: unit?.unitId?.trim() || '',
    departmentName: unit?.fullName?.trim() || unit?.shortName?.trim() || '',
    position: position?.fullName?.trim() || position?.shortName?.trim() || '',
    employeeNumber,
    phone,
    mobilePhone,
    email,
    workplace,
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

export const normalizeMultiSearchResponse = (
  response: MultiSearchResponse,
  query: string
): EmployeeSearchResponse => {
  const categoryData = response.PERSONADDRESSBOOK?.data;
  const content = categoryData?.content;

  if (!Array.isArray(content)) {
    throw new Error('MultiSearch response does not contain PERSONADDRESSBOOK content');
  }

  const items = content.map(mapPerson).filter((employee): employee is Employee => employee !== null);

  return {
    items,
    query,
    total: categoryData?.totalElements ?? items.length,
  };
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

  return normalizeMultiSearchResponse(response, query);
};
