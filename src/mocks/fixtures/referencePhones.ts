import type {
  ReferencePhone,
  ReferencePhoneCategory,
} from '../../api/directory/referencePhones';

export const referencePhoneCategoriesFixture: ReferencePhoneCategory[] = [
  {
    id: 'support-services',
    title: 'Службы поддержки услуг и сервисов',
  },
  {
    id: 'auxiliary-services',
    title: 'Вспомогательные службы',
  },
];

export const referencePhonesFixture: ReferencePhone[] = [
  {
    id: 'ref-001',
    categoryId: 'support-services',
    title: 'Дежурная смена цифровых сервисов',
    initials: 'ЦС',
    responsibility:
      'Приём обращений по недоступности внутренних сервисов, авторизации и инцидентам рабочих кабинетов.',
    phone: '+74950002001',
    accentColor: '#1f8f58',
  },
  {
    id: 'ref-002',
    categoryId: 'support-services',
    title: 'Поддержка коммуникационных платформ',
    initials: 'КП',
    responsibility:
      'Поддержка корпоративной телефонии, видеоконференций и общих каналов внутренней связи.',
    phone: '+74950002002',
    accentColor: '#2c7fbe',
  },
  {
    id: 'ref-003',
    categoryId: 'support-services',
    title: 'Смена сопровождения витрин',
    initials: 'ВС',
    responsibility:
      'Контроль публикации клиентских витрин, эскалация инцидентов по интерфейсам и смежным сервисам.',
    phone: '+74950002003',
    accentColor: '#d8861a',
  },
  {
    id: 'ref-004',
    categoryId: 'auxiliary-services',
    title: 'Хозяйственная служба офиса',
    initials: 'ХС',
    responsibility:
      'Вопросы доступа в помещения, размещения сотрудников, мебели и мелких бытовых инцидентов.',
    phone: '+74950002004',
    accentColor: '#6e7f5f',
  },
  {
    id: 'ref-005',
    categoryId: 'auxiliary-services',
    title: 'Служба пропускного режима',
    initials: 'ПР',
    responsibility:
      'Оформление гостевых пропусков, сопровождение временных доступов и консультации по режиму посещений.',
    phone: '+74950002005',
    accentColor: '#7c5ec9',
  },
  {
    id: 'ref-006',
    categoryId: 'auxiliary-services',
    title: 'Транспортная координация',
    initials: 'ТК',
    responsibility:
      'Организация служебных поездок, координация подачи транспорта и уточнение маршрутных заявок.',
    phone: null,
    accentColor: '#c95e72',
  },
];
