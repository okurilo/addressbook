import { fireEvent, render, screen } from '../test-utils';
import type { ProfileViewData } from './hooks/types';
import { useProfile } from './hooks/useProfile';
import { Profile } from './Profile';

jest.mock('./hooks/useProfile');
jest.mock('./Header/Star', () => ({ Star: () => <span>Звезда</span> }));

const profileMock = useProfile as jest.MockedFunction<typeof useProfile>;

const profileData: ProfileViewData = {
  isLoading: false,
  workAddress: 'Москва',
  mailSigma: 'sigma@example.test',
  sberchat: '@ivan.petrov',
  timezone: 'UTC+3',
  linearManager: { name: 'Сидоров Пётр', url: '/platform/profile/manager-1/' },
  linear: { position: 'Инженер', orgPath: [{ title: 'Блок' }, { title: 'Платформа' }] },
  agile: { position: 'Разработчик', orgPath: [{ title: 'Команда' }] },
  managers: [
    {
      userId: 'manager-1',
      position: 'Владелец продукта',
      lastName: 'Сидоров',
      firstName: 'Пётр',
      secondName: 'Иванович',
    },
  ],
  birthDate: { day: 17, month: 7 },
  tabNumber: '12345',
};

describe('Profile', () => {
  let consoleError: jest.SpyInstance<void, Parameters<typeof console.error>>;

  beforeEach(() => {
    profileMock.mockReset();
    profileMock.mockReturnValue(profileData);
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  test('показывает основные данные и переключает содержимое вкладок', () => {
    const onClose = jest.fn<void, []>();
    render(
      <Profile
        pid="person-1"
        onClose={onClose}
        person={{
          name: 'Иван Петров',
          photo: '',
          position: '',
          initials: 'ИП',
          internalPhone: '1234',
        }}
      />
    );

    expect(profileMock).toHaveBeenCalledWith('person-1');
    expect(screen.getByText('Иван Петров')).toBeTruthy();
    expect(screen.getByText('Блок / Платформа')).toBeTruthy();
    expect(screen.getByText('sigma@example.test')).toBeTruthy();

    fireEvent.click(screen.getByRole('tab', { name: 'инфо' }));
    expect(screen.getByText('17 июля')).toBeTruthy();

    fireEvent.click(screen.getByRole('tab', { name: 'сберджайл' }));
    expect(screen.getByText('Разработчик: Команда')).toBeTruthy();
    expect(screen.getByText('Сидоров Пётр Иванович')).toBeTruthy();

    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('показывает skeleton-ветки при загрузке отсутствующих данных', () => {
    profileMock.mockReturnValue({ isLoading: true });
    const { container } = render(
      <Profile
        pid="person-2"
        person={{ name: 'Анна Смирнова', photo: '', position: '', initials: 'АС' }}
      />
    );

    expect(screen.getByText('Анна Смирнова')).toBeTruthy();
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);
  });
});
