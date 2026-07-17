import { fireEvent, render, screen, waitFor } from '../../../../Components/Adressbook/test-utils';
import { createEmployee } from '../../test-utils/employee';
import { GroupActions } from './index';

const createObjectUrlMock = jest.fn<string, [Blob]>();
const revokeObjectUrlMock = jest.fn<void, [string]>();
const initialCreateObjectUrl = URL.createObjectURL;
const initialRevokeObjectUrl = URL.revokeObjectURL;

describe('GroupActions', () => {
  let consoleError: jest.SpyInstance<void, Parameters<typeof console.error>>;
  let linkClick: jest.SpyInstance<void, []>;

  beforeAll(() => {
    URL.createObjectURL = createObjectUrlMock;
    URL.revokeObjectURL = revokeObjectUrlMock;
  });

  beforeEach(() => {
    createObjectUrlMock.mockReset();
    revokeObjectUrlMock.mockReset();
    createObjectUrlMock.mockReturnValue('blob:meeting');
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    linkClick = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleError.mockRestore();
    linkClick.mockRestore();
  });

  afterAll(() => {
    URL.createObjectURL = initialCreateObjectUrl;
    URL.revokeObjectURL = initialRevokeObjectUrl;
  });

  test('показывает пропущенных сотрудников и формирует ICS без повторной загрузки', async () => {
    const loadAllEmployees = jest.fn<Promise<ReturnType<typeof createEmployee>[]>, []>();
    const employee = createEmployee('person-1');
    employee.email = 'first,team;test\\mail@example.test';
    const withoutEmail = createEmployee('person-2');
    withoutEmail.email = '  ';
    render(
      <GroupActions
        employees={[employee, withoutEmail]}
        hasUnloadedEmployees={false}
        loadAllEmployees={loadAllEmployees}
      />
    );

    expect(screen.getByText(/Без email: 1/)).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Поставить встречу · ICS' }));

    expect(loadAllEmployees).not.toHaveBeenCalled();
    await waitFor(() => expect(createObjectUrlMock).toHaveBeenCalledWith(expect.any(Blob)));
    expect(linkClick).toHaveBeenCalledTimes(1);
    expect(revokeObjectUrlMock).toHaveBeenCalledWith('blob:meeting');
  });

  test('дочитывает участников перед действием и переиспользует результат', async () => {
    const loaded = createEmployee('person-2');
    const loadAllEmployees = jest.fn<Promise<ReturnType<typeof createEmployee>[]>, []>();
    loadAllEmployees.mockResolvedValueOnce([loaded]);
    render(
      <GroupActions
        employees={[createEmployee('person-1')]}
        hasUnloadedEmployees
        loadAllEmployees={loadAllEmployees}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Написать всем' }));
    expect(screen.getByRole('button', { name: 'Загружаем участников…' })).toBeTruthy();
    await waitFor(() => expect(loadAllEmployees).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByRole('button', { name: 'Поставить встречу · ICS' }));
    await waitFor(() => expect(createObjectUrlMock).toHaveBeenCalled());
    expect(loadAllEmployees).toHaveBeenCalledTimes(1);
  });

  test('показывает ошибку загрузки и позволяет повторить', async () => {
    const loadAllEmployees = jest.fn<Promise<ReturnType<typeof createEmployee>[]>, []>();
    loadAllEmployees
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValueOnce([createEmployee('person-1')]);
    render(
      <GroupActions employees={[]} hasUnloadedEmployees loadAllEmployees={loadAllEmployees} />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Написать всем' }));
    await waitFor(() => expect(screen.getByText(/Не удалось загрузить всех участников/)).toBeTruthy());
    fireEvent.click(screen.getByRole('button', { name: 'Написать всем' }));
    await waitFor(() => expect(loadAllEmployees).toHaveBeenCalledTimes(2));
  });

  test('отключает действия, когда email отсутствуют', () => {
    const employee = createEmployee('person-1');
    employee.email = '';
    render(
      <GroupActions
        employees={[employee]}
        hasUnloadedEmployees={false}
        loadAllEmployees={jest.fn()}
      />
    );

    expect(screen.getByText('В активной группе нет доступных email.')).toBeTruthy();
    expect((screen.getByRole('button', { name: 'Написать всем' }) as HTMLButtonElement).disabled).toBe(true);
  });
});
