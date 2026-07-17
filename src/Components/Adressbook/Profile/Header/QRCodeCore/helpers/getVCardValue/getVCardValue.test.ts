import { getVCardValue } from './getVCardValue';

describe('getVCardValue', () => {
  test('собирает поля в многострочную vCard', () => {
    expect(
      getVCardValue([
        { key: 'FN', value: 'Иван Петров' },
        { key: 'TEL', value: '+79990000000' },
      ])
    ).toBe('BEGIN:VCARD\nFN:Иван Петров\nTEL:+79990000000\nEND:VCARD');
  });

  test('создаёт корректную оболочку для пустого набора полей', () => {
    expect(getVCardValue([])).toBe('BEGIN:VCARD\n\nEND:VCARD');
  });
});
