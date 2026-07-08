import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from '@reach/router';
import { styled } from 'styled-components';
import { Input } from '@pulse/ui/Input';
import { Text } from '@pulse/ui/Text';
import { SearchIcon, StarIcon } from './icons';
import { routePaths } from '../routes/routePaths';
import { ignorePromise } from '../utils/ignorePromise';

const SearchRow = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  gap: theme.spacing.md,
  alignItems: 'center',
}));

const SearchField = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  minHeight: 56,
}));

const SearchInput = styled(Input)(({ theme }) => ({
  minHeight: 56,
  padding: `0 ${theme.spacing.xl + theme.spacing.md}px 0 ${theme.spacing.lg}px`,
  borderRadius: theme.radius.lg,
  border: `1px solid ${theme.colors.border}`,
  boxShadow: 'none',
  fontSize: 17,
}));

const SearchAdornment = styled('span')(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing.lg,
  color: theme.colors.textSecondary,
  pointerEvents: 'none',
}));

const FavoriteButton = styled('button')<{ $active: boolean }>(({ theme, $active }) => ({
  minHeight: 56,
  padding: `0 ${theme.spacing.lg}px`,
  borderRadius: theme.radius.lg,
  border: `1px solid ${$active ? theme.colors.accent : theme.colors.border}`,
  background: $active ? theme.colors.accentSoft : theme.colors.surface,
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing.sm,
  color: $active ? theme.colors.accent : theme.colors.textPrimary,
  cursor: 'pointer',
}));

const FavoriteIcon = styled('span')<{ $active: boolean }>(({ theme, $active }) => ({
  width: 36,
  height: 36,
  borderRadius: theme.radius.pill,
  border: `1px solid ${$active ? theme.colors.accent : theme.colors.border}`,
  background: $active ? theme.colors.surface : theme.colors.surfaceMuted,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const DirectorySearch = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const queryFromUrl = searchParams.get('q') ?? '';
  const [value, setValue] = useState(queryFromUrl);
  const isFavoritesRoute = location.pathname === routePaths.favorites;

  useEffect(() => {
    setValue(queryFromUrl);
  }, [queryFromUrl]);

  return (
    <SearchRow>
      <SearchField>
        <SearchInput
          value={value}
          placeholder="Корпоративный поиск"
          aria-label="Корпоративный поиск"
          onChange={(event) => {
            const nextValue = event.currentTarget.value;
            const nextParams = new URLSearchParams(location.search);

            setValue(nextValue);

            if (nextValue.trim() === '') {
              nextParams.delete('q');
            } else {
              nextParams.set('q', nextValue);
            }

            const nextSearch = nextParams.toString();
            const destination =
              location.pathname === routePaths.contacts
                ? `${routePaths.contacts}${nextSearch === '' ? '' : `?${nextSearch}`}`
                : routePaths.contacts + (nextSearch === '' ? '' : `?${nextSearch}`);

            ignorePromise(navigate(destination, { replace: true }));
          }}
        />
        <SearchAdornment>
          <SearchIcon size={22} />
        </SearchAdornment>
      </SearchField>
      <FavoriteButton
        type="button"
        $active={isFavoritesRoute}
        onClick={() => {
          ignorePromise(navigate(routePaths.favorites));
        }}
      >
        <FavoriteIcon $active={isFavoritesRoute} aria-hidden="true">
          <StarIcon />
        </FavoriteIcon>
        <Text weight="medium">Избранное</Text>
      </FavoriteButton>
    </SearchRow>
  );
};
