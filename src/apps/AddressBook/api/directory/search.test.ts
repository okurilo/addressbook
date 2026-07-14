import { deepStrictEqual, strictEqual } from 'node:assert';
import { test } from 'node:test';
import type { MultiSearchResponse } from './search';
import { normalizeMultiSearchResponse } from './search';

test('нормализует ответ PERSONADDRESSBOOK из multiSearch', () => {
  const response: MultiSearchResponse = {
    PERSONADDRESSBOOK: {
      data: {
        content: [
          {
            jcontactscompanyemail: null,
            pcontactsexternalemail: null,
            junit: {
              unit: [
                {
                  balanceUnitName: null,
                  city: 'Курган',
                  unitId: '10285808',
                  fullName: 'Support',
                  state: 'Курганская',
                  shortName: 'Support',
                },
              ],
            },
            personUuid: '9c6f12cc-d65c-451c-afaf-eb684f5acce2',
            jbadgeabsencevacation: null,
            pbasic: {
              lastName: 'Surname143',
              firstName: 'Name722',
              fullName: 'Surname143 Name722 Middlename874',
              midName: 'Middlename874',
            },
            jcontactsmobile: null,
            jbasic: {
              employeeId: '10000446',
              firedDate: null,
              status: 'активный',
            },
            jcontactsinterofficetel: null,
            pcontactsmobile: null,
            jcontactsinterofficeemail: {
              value: 'MAIL10000446@MAIL.CA.SBRF.RU',
            },
            jcontactsexternalemail: {
              value: 'MAIL10000446@MAIL.CA.SBRF.RU',
            },
            company: 'PAOSberbank',
            jposition: {
              position: [
                {
                  fullName: 'Ведущий инженер',
                  shortName: 'Сотрудник',
                },
              ],
            },
          },
        ],
        last: true,
        totalElements: 1,
        totalPages: 1,
      },
      success: true,
    },
  };

  const result = normalizeMultiSearchResponse(response, 'Surname143');

  strictEqual(result.total, 1);
  strictEqual(result.query, 'Surname143');
  strictEqual(result.items.length, 1);
  deepStrictEqual(result.items[0], {
    id: '9c6f12cc-d65c-451c-afaf-eb684f5acce2',
    fullName: 'Surname143 Name722 Middlename874',
    subtitle: 'PAOSberbank',
    avatarInitials: 'NS',
    status: 'available',
    shortStructure: 'Support',
    departmentId: '10285808',
    departmentName: 'Support',
    position: 'Ведущий инженер',
    employeeNumber: '10000446',
    phone: null,
    mobilePhone: null,
    email: 'MAIL10000446@MAIL.CA.SBRF.RU',
    workplace: 'Курганская, Курган',
    managerName: 'не указан',
    contacts: [
      {
        type: 'email',
        value: 'MAIL10000446@MAIL.CA.SBRF.RU',
        label: 'Email',
      },
    ],
  });
});
