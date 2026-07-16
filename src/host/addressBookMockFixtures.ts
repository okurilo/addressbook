export type HostMockPerson = {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  position: string;
  functionalBlock: string;
  departmentId: string;
  departmentName: string;
  departmentShortName: string;
  city: string;
  officePhone: string;
  mobilePhone: string;
  email: string;
  personalEmail: string;
  workAddress: string;
  managerId: string;
  managerName: string;
  sberchat: string;
  timezone: string;
};

export type HostMockGroupNode = {
  id: string;
  type: string;
  name: string;
  hasChild: boolean;
  children: HostMockGroupNode[];
  parentTree?: HostMockGroupNode;
};

export type HostMockReferencePhone = {
  id: string;
  categoryId: string;
  title: string;
  initials: string;
  responsibility: string;
  phone: string | null;
  accentColor: string;
};

export const hostMockPeople: HostMockPerson[] = [
  {
    id: 'person-001',
    employeeId: '104582',
    firstName: 'Лев',
    lastName: 'Артемьев',
    middleName: 'Андреевич',
    position: 'Руководитель направления',
    functionalBlock: 'Платформенные сервисы',
    departmentId: 'dept-digital-platforms',
    departmentName: 'Управление цифровых платформ',
    departmentShortName: 'Цифровые платформы',
    city: 'Москва',
    officePhone: '+7 495 000-10-01',
    mobilePhone: '+7 916 000-10-01',
    email: 'artemyev.la@example.test',
    personalEmail: 'lev.artemyev@example.test',
    workAddress: 'Москва, Кутузовский проспект, 11, этаж 7',
    managerId: 'person-005',
    managerName: 'Павел Соколов',
    sberchat: 'artemyev.la',
    timezone: 'Europe/Moscow',
  },
  {
    id: 'person-002',
    employeeId: '104583',
    firstName: 'Марта',
    lastName: 'Елисеева',
    middleName: 'Олеговна',
    position: 'Старший аналитик',
    functionalBlock: 'Операционная эффективность',
    departmentId: 'dept-operations-efficiency',
    departmentName: 'Департамент операционной эффективности',
    departmentShortName: 'Операционная эффективность',
    city: 'Москва',
    officePhone: '+7 495 000-10-02',
    mobilePhone: '+7 916 000-10-02',
    email: 'eliseeva.me@example.test',
    personalEmail: 'marta.eliseeva@example.test',
    workAddress: 'Москва, Кутузовский проспект, 11, этаж 5',
    managerId: 'person-005',
    managerName: 'Павел Соколов',
    sberchat: 'eliseeva.me',
    timezone: 'Europe/Moscow',
  },
  {
    id: 'person-003',
    employeeId: '104584',
    firstName: 'Глеб',
    lastName: 'Рожков',
    middleName: 'Ильич',
    position: 'Продуктовый менеджер',
    functionalBlock: 'Клиентские решения',
    departmentId: 'dept-client-solutions',
    departmentName: 'Блок клиентских решений',
    departmentShortName: 'Клиентские решения',
    city: 'Санкт-Петербург',
    officePhone: '+7 812 000-10-03',
    mobilePhone: '+7 921 000-10-03',
    email: 'rozhkov.gr@example.test',
    personalEmail: 'gleb.rozhkov@example.test',
    workAddress: 'Санкт-Петербург, Невский проспект, 42, этаж 3',
    managerId: 'person-006',
    managerName: 'Ника Фирсова',
    sberchat: 'rozhkov.gr',
    timezone: 'Europe/Moscow',
  },
  {
    id: 'person-004',
    employeeId: '104585',
    firstName: 'Ясна',
    lastName: 'Денисова',
    middleName: 'Романовна',
    position: 'Координатор проектов',
    functionalBlock: 'Поддержка продаж',
    departmentId: 'dept-sales-support',
    departmentName: 'Служба развития продаж',
    departmentShortName: 'Развитие продаж',
    city: 'Казань',
    officePhone: '+7 843 000-10-04',
    mobilePhone: '+7 917 000-10-04',
    email: 'denisova.yd@example.test',
    personalEmail: 'yasna.denisova@example.test',
    workAddress: 'Казань, улица Спасская, 18, этаж 2',
    managerId: 'person-006',
    managerName: 'Ника Фирсова',
    sberchat: 'denisova.yd',
    timezone: 'Europe/Moscow',
  },
  {
    id: 'person-005',
    employeeId: '104586',
    firstName: 'Павел',
    lastName: 'Соколов',
    middleName: 'Максимович',
    position: 'Системный архитектор',
    functionalBlock: 'Архитектура решений',
    departmentId: 'dept-digital-platforms',
    departmentName: 'Управление цифровых платформ',
    departmentShortName: 'Цифровые платформы',
    city: 'Москва',
    officePhone: '+7 495 000-10-05',
    mobilePhone: '+7 916 000-10-05',
    email: 'sokolov.ps@example.test',
    personalEmail: 'pavel.sokolov@example.test',
    workAddress: 'Москва, Кутузовский проспект, 11, этаж 8',
    managerId: 'person-006',
    managerName: 'Ника Фирсова',
    sberchat: 'sokolov.ps',
    timezone: 'Europe/Moscow',
  },
  {
    id: 'person-006',
    employeeId: '104587',
    firstName: 'Ника',
    lastName: 'Фирсова',
    middleName: 'Семёновна',
    position: 'Бизнес-партнёр',
    functionalBlock: 'Управление изменениями',
    departmentId: 'dept-client-solutions',
    departmentName: 'Блок клиентских решений',
    departmentShortName: 'Клиентские решения',
    city: 'Москва',
    officePhone: '+7 495 000-10-06',
    mobilePhone: '+7 916 000-10-06',
    email: 'firsova.nf@example.test',
    personalEmail: 'nika.firsova@example.test',
    workAddress: 'Москва, Кутузовский проспект, 11, этаж 6',
    managerId: 'person-006',
    managerName: 'Ника Фирсова',
    sberchat: 'firsova.nf',
    timezone: 'Europe/Moscow',
  },
];

const digitalPlatforms: HostMockGroupNode = {
  id: 'dept-digital-platforms',
  type: 'department',
  name: 'Управление цифровых платформ',
  hasChild: false,
  children: [],
};

const operationsEfficiency: HostMockGroupNode = {
  id: 'dept-operations-efficiency',
  type: 'department',
  name: 'Департамент операционной эффективности',
  hasChild: false,
  children: [],
};

const clientSolutions: HostMockGroupNode = {
  id: 'dept-client-solutions',
  type: 'department',
  name: 'Блок клиентских решений',
  hasChild: false,
  children: [],
};

const salesSupport: HostMockGroupNode = {
  id: 'dept-sales-support',
  type: 'department',
  name: 'Служба развития продаж',
  hasChild: false,
  children: [],
};

export const hostMockHierarchyRoot: HostMockGroupNode = {
  id: 'company-root',
  type: 'company',
  name: 'Доступная кадровая структура',
  hasChild: true,
  children: [digitalPlatforms, operationsEfficiency, clientSolutions, salesSupport],
};

const withParentTree = (node: HostMockGroupNode): HostMockGroupNode => ({
  ...node,
  children: node.children.map((child) => ({ ...child })),
  parentTree: hostMockHierarchyRoot,
});

export const hostMockGroupsById: Record<string, HostMockGroupNode> = {
  [hostMockHierarchyRoot.id]: {
    ...hostMockHierarchyRoot,
    parentTree: hostMockHierarchyRoot,
  },
  [digitalPlatforms.id]: withParentTree(digitalPlatforms),
  [operationsEfficiency.id]: withParentTree(operationsEfficiency),
  [clientSolutions.id]: withParentTree(clientSolutions),
  [salesSupport.id]: withParentTree(salesSupport),
};

export const hostMockReferencePhoneCategories = [
  { id: 'support-services', title: 'Служба поддержки услуг и сервисов' },
  { id: 'auxiliary-services', title: 'Вспомогательные службы' },
] as const;

export const hostMockReferencePhones: HostMockReferencePhone[] = [
  {
    id: 'ref-001',
    categoryId: 'support-services',
    title: 'Дежурная смена цифровых сервисов',
    initials: 'ЦС',
    responsibility: 'Недоступность внутренних сервисов и инциденты рабочих кабинетов.',
    phone: '+7 495 000-20-01',
    accentColor: '#1f8f58',
  },
  {
    id: 'ref-002',
    categoryId: 'support-services',
    title: 'Поддержка коммуникационных платформ',
    initials: 'КП',
    responsibility: 'Корпоративная телефония, видеоконференции и внутренняя связь.',
    phone: '+7 495 000-20-02',
    accentColor: '#2c7fbe',
  },
  {
    id: 'ref-003',
    categoryId: 'auxiliary-services',
    title: 'Хозяйственная служба офиса',
    initials: 'ХС',
    responsibility: 'Доступ в помещения, размещение сотрудников и офисная инфраструктура.',
    phone: '+7 495 000-20-03',
    accentColor: '#6e7f5f',
  },
];
