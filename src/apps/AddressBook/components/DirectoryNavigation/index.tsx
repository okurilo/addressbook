import { Text } from '@pulse/ui/components/Text';
import { useTheme } from 'styled-components';
import { useLocation, useNavigate } from '@reach/router';
import { routePaths } from '../../routes/routePaths';
import { ignorePromise } from '../../utils/ignorePromise';
import { Nav, NavButton } from './styled';

type NavigationItem = {
  key: 'contacts' | 'structure' | 'referencePhones';
  label: string;
  href: string;
  matches: (pathname: string) => boolean;
};

const normalizePathname = (pathname: string): string => pathname.replace(/\/+$/u, '') || '/';

const navigationItems: NavigationItem[] = [
  {
    key: 'contacts',
    label: 'все контакты',
    href: routePaths.contacts,
    matches: (pathname) => {
      const normalizedPathname = normalizePathname(pathname);

      return (
        normalizedPathname === routePaths.contacts ||
        normalizedPathname === routePaths.favorites ||
        normalizedPathname.startsWith(`${routePaths.contacts}/employee/`)
      );
    },
  },
  {
    key: 'structure',
    label: 'кадровая структура',
    href: routePaths.structure,
    matches: (pathname) => {
      const normalizedPathname = normalizePathname(pathname);

      return (
        normalizedPathname === routePaths.structure ||
        normalizedPathname.startsWith(`${routePaths.structure}/`)
      );
    },
  },
  {
    key: 'referencePhones',
    label: 'справочные телефоны',
    href: routePaths.referencePhones,
    matches: (pathname) => normalizePathname(pathname) === routePaths.referencePhones,
  },
];

export const DirectoryNavigation = (): JSX.Element => {
  const { tokens } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Nav aria-label="навигация по разделам справочника">
      {navigationItems.map((item) => {
        const isActive = item.matches(location.pathname);

        return (
          <NavButton
            key={item.key}
            type="button"
            $active={isActive}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => {
              const nextParams = new URLSearchParams(location.search);
              nextParams.delete('page');
              const nextSearch = nextParams.toString();
              ignorePromise(navigate(`${item.href}${nextSearch === '' ? '' : `?${nextSearch}`}`));
            }}
          >
            <Text
              color={
                isActive ? tokens.current.core.text.primary : tokens.current.core.text.secondary
              }
              variant={isActive ? 'body1Semibold' : 'body1Regular'}
            >
              {item.label}
            </Text>
          </NavButton>
        );
      })}
    </Nav>
  );
};
