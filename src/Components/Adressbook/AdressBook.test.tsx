import { render, screen } from '../../test-utils/test-utils';
import { AdressBook } from './AdressBook';
import { AddressbookTestProvider } from './test-utils';

jest.mock('./People', () => ({ People: () => <div>Список сотрудников</div> }));

describe('AdressBook', () => {
  test('показывает People для включённого модуля', () => {
    render(
      <AddressbookTestProvider enabled>
        <AdressBook />
      </AddressbookTestProvider>
    );
    expect(screen.getByText('Список сотрудников')).toBeTruthy();
  });

  test('ничего не показывает для выключенного модуля', () => {
    const { container } = render(
      <AddressbookTestProvider enabled={false}>
        <AdressBook />
      </AddressbookTestProvider>
    );
    expect(container.childElementCount).toBe(0);
  });
});
