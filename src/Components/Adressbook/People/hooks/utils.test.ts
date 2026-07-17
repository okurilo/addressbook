import { createRowData } from './utils';
import type { AdressbookPerson } from '../../types';

describe('createRowData', () => {
  test('переносит данные сотрудника в строку и профиль', () => {
    const person: AdressbookPerson = {
      personUuid: 'person-1',
      pbasic: { fullName: 'Иван Петров', firstName: 'Иван', lastName: 'Петров' },
      pbasicphoto: { url: '/photo.png' },
      jbasic: { employeeId: '123' },
      jposition: { position: [{ fullName: 'Разработчик', funcBlock: 'ИТ' }] },
      junit: { unit: [{ balanceUnitName: 'Платформа' }] },
      jcontactsinterofficetel: { value: '1234' },
      jcontactsmobile: { value: '+7999' },
      jcontactsinterofficeemail: { value: 'internal@example.test' },
      jcontactsexternalemail: { value: 'external@example.test' },
      absence: { badge: 'Отпуск' },
    };

    expect(createRowData([person])).toEqual([
      {
        nameCell: {
          name: 'Иван Петров',
          photo: '/photo.png',
          absence: { badge: 'Отпуск' },
          initials: 'ИП',
        },
        position: 'Разработчик',
        block: 'ИТ',
        unit: 'Платформа',
        pid: 'person-1',
        _profile: {
          name: 'Иван Петров',
          photo: '/photo.png',
          employeeNumber: '123',
          position: 'Разработчик',
          initials: 'ИП',
          internalPhone: '1234',
          personalPhone: '+7999',
          internalMail: 'internal@example.test',
          externalEmail: 'external@example.test',
          absence: { badge: 'Отпуск' },
        },
      },
    ]);
  });

  test('подставляет безопасные значения для необязательных полей', () => {
    expect(createRowData([{ personUuid: 'person-2' }])).toEqual([
      expect.objectContaining({
        nameCell: expect.objectContaining({ name: '-', photo: '', initials: 'NA' }),
        position: '-',
        block: '-',
        unit: '-',
        pid: 'person-2',
        _profile: expect.objectContaining({ name: '-', photo: '', position: '', initials: 'NA' }),
      }),
    ]);
  });
});
