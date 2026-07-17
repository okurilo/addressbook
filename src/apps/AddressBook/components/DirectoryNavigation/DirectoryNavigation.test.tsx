import { fireEvent, render, screen } from '../../../../test-utils/test-utils';
import { useLocation, useNavigate } from '@reach/router';
import { routePaths } from '../../routes/routePaths';
import { DirectoryNavigation } from './index';

jest.mock('@reach/router', () => ({
  ...jest.requireActual('@reach/router'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

const locationMock = useLocation as jest.MockedFunction<typeof useLocation>;
const useNavigateMock = useNavigate as jest.MockedFunction<typeof useNavigate>;
const navigateMock = jest.fn() as jest.MockedFunction<ReturnType<typeof useNavigate>>;

const createLocation = (pathname: string): ReturnType<typeof useLocation> => ({
  ...window.location,
  pathname,
  search: '?q=Иван',
  state: null,
  key: 'navigation-location',
});

describe('DirectoryNavigation', () => {
  beforeEach(() => {
    locationMock.mockReset();
    useNavigateMock.mockReset();
    navigateMock.mockReset();
    navigateMock.mockResolvedValue(undefined);
    useNavigateMock.mockReturnValue(navigateMock);
  });

  test.each([
    [`${routePaths.contacts}/`, 'все контакты'],
    [routePaths.favorites, 'все контакты'],
    [`${routePaths.contacts}/employee/person-1`, 'все контакты'],
    [`${routePaths.structure}/unit-1`, 'кадровая структура'],
    [routePaths.referencePhones, 'справочные телефоны'],
  ])('определяет активный раздел для %s', (pathname, activeLabel) => {
    locationMock.mockReturnValue(createLocation(pathname));
    render(<DirectoryNavigation />);
    expect(screen.getByRole('button', { name: activeLabel }).getAttribute('aria-current')).toBe('page');
  });

  test('сохраняет query при навигации', () => {
    locationMock.mockReturnValue(createLocation('/unknown'));
    render(<DirectoryNavigation />);
    fireEvent.click(screen.getByRole('button', { name: 'кадровая структура' }));
    expect(navigateMock).toHaveBeenCalledWith(`${routePaths.structure}?q=Иван`);
  });
});
