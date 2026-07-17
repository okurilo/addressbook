import { render, screen } from './test-utils';
import { AdressBook } from './AdressBook';

jest.mock('./People', () => ({ People: () => <div>Список сотрудников</div> }));

describe('AdressBook', () => {
  test('показывает People для включённого модуля', () => {
    render(<AdressBook />, { providerOptions: { addressbook: { people: [], enabled: true } } });
    expect(screen.getByText('Список сотрудников')).toBeTruthy();
  });

  test('ничего не показывает для выключенного модуля', () => {
    const { container } = render(<AdressBook />, {
      providerOptions: { addressbook: { people: [], enabled: false } },
    });
    expect(container.childElementCount).toBe(0);
  });
});
