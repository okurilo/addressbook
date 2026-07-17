import { fireEvent, render, screen } from '../../../../Components/Adressbook/test-utils';
import { createEmployee } from '../../test-utils/employee';
import { EmployeeTable } from './index';

jest.mock('../../../../Components/Adressbook', () => {
  const actual = jest.requireActual<typeof import('../../../../Components/Adressbook')>(
    '../../../../Components/Adressbook'
  );

  return {
    ...actual,
    AdressBook: () => {
      const context = actual.useAdressbookContext();
      const firstPerson = context.people[0];

      return (
        <div>
          <span>{firstPerson?.pbasic?.firstName}</span>
          <span>{firstPerson?.pbasic?.lastName}</span>
          <span>{firstPerson?.pbasicphoto?.url ?? 'no-photo'}</span>
          {firstPerson === undefined
            ? null
            : context.renderActions?.(firstPerson.personUuid, undefined, undefined, undefined, '+7999')}
          {firstPerson === undefined
            ? null
            : context.renderActions?.(
                firstPerson.personUuid,
                undefined,
                new Set([firstPerson.personUuid]),
                'favorites-1',
                undefined
              )}
          {context.renderActions?.('missing', false, new Set(), 'favorites-1')}
        </div>
      );
    },
  };
});
jest.mock('../EmployeeActions', () => ({
  EmployeeActions: ({
    personId,
    isFavorite,
    isFavoriteLoading,
    groupId,
    phone,
    onToggleFavorite,
  }: {
    personId: string;
    isFavorite: boolean;
    isFavoriteLoading: boolean;
    groupId?: string;
    phone: string | null;
    onToggleFavorite: () => void;
  }) => (
    <button type="button" onClick={onToggleFavorite}>
      {personId}:{String(isFavorite)}:{String(isFavoriteLoading)}:{groupId ?? 'no-group'}:{phone ?? 'no-phone'}
    </button>
  ),
}));

describe('EmployeeTable', () => {
  test('адаптирует Employee в AdressbookPerson и связывает действия', () => {
    const employee = createEmployee('person-1', 'Петров Иван');
    employee.photoUrl = '/photo.png';
    employee.phone = '1234';
    employee.mobilePhone = '+7999';
    employee.functionalBlock = 'ИТ';
    const onToggleFavorite = jest.fn<void, [string]>();
    render(
      <EmployeeTable
        employees={[employee]}
        favoriteIds={['person-1']}
        onToggleFavorite={onToggleFavorite}
      />
    );

    expect(screen.getByText('Иван')).toBeTruthy();
    expect(screen.getByText('Петров')).toBeTruthy();
    expect(screen.getByText('/photo.png')).toBeTruthy();
    expect(screen.queryByText(/missing/)).toBeNull();

    const actions = screen.getAllByRole('button');
    expect(actions[0]?.textContent).toContain('true:true:no-group:+7999');
    expect(actions[1]?.textContent).toContain('true:false:favorites-1:no-phone');
    if (actions[0] === undefined) throw new Error('Действие сотрудника не найдено');
    fireEvent.click(actions[0]);
    expect(onToggleFavorite).toHaveBeenCalledWith('person-1');
  });

  test('использует fallback имени и пропускает необязательные контакты', () => {
    const employee = createEmployee('single', 'ОдноИмя');
    employee.firstName = undefined;
    employee.lastName = undefined;
    employee.photoUrl = undefined;
    employee.phone = null;
    employee.mobilePhone = null;
    render(
      <EmployeeTable employees={[employee]} favoriteIds={[]} onToggleFavorite={jest.fn()} />
    );

    expect(screen.getAllByText('ОдноИмя')).toHaveLength(2);
    expect(screen.getByText('no-photo')).toBeTruthy();
  });
});
