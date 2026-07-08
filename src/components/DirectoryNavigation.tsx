import { useLocation, useNavigate } from '@reach/router';
import { styled } from 'styled-components';
import { Text } from '@pulse/ui/Text';
import { routePaths } from '../routes/routePaths';

type NavigationItem = {
  key: 'contacts' | 'structure' | 'referencePhones';
  label: string;
  href: string;
  matches: (pathname: string) => boolean;
};

const navigationItems: NavigationItem[] = [
  {
    key: 'contacts',
    label: 'Все контакты',
    href: routePaths.contacts,
    matches: (pathname) => pathname === routePaths.contacts || pathname.startsWith('/employee/'),
  },
  {
    key: 'structure',
    label: 'Кадровая структура',
    href: routePaths.structure,
    matches: (pathname) => pathname === routePaths.structure || pathname.startsWith('/structure/'),
  },
  {
    key: 'referencePhones',
    label: 'Справочные телефоны',
    href: routePaths.referencePhones,
    matches: (pathname) => pathname === routePaths.referencePhones,
  },
];

const Nav = styled('nav')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing.xl,
  borderBottom: `1px solid ${theme.colors.border}`,
}));

const NavButton = styled('button')<{ $active: boolean }>(({ theme, $active }) => ({
  minHeight: 52,
  padding: 0,
  border: 'none',
  borderBottom: `4px solid ${$active ? theme.colors.accent : 'transparent'}`,
  background: 'transparent',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
}));

export const DirectoryNavigation = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Nav aria-label="Навигация по разделам справочника">
      {navigationItems.map((item) => {
        const isActive = item.matches(location.pathname);

        return (
          <NavButton
            key={item.key}
            type="button"
            $active={isActive}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => {
              void navigate(item.href);
            }}
          >
            <Text weight={isActive ? 'semibold' : 'medium'} tone={isActive ? 'primary' : 'secondary'}>
              {item.label}
            </Text>
          </NavButton>
        );
      })}
    </Nav>
  );
};
