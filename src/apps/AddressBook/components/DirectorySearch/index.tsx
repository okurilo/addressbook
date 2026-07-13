import { useEffect, useState } from 'react';
import { Text } from '@pulse/ui/components/Text';
import { useTheme } from 'styled-components';
import { SearchIcon, StarIcon } from '../icons';
import { routePaths } from '../../routes/routePaths';
import { useLocation, useNavigate } from '@reach/router';
import { ignorePromise } from '../../utils/ignorePromise';
import {
  SearchRow,
  SearchField,
  SearchInput,
  SearchAdornment,
  FavoriteButton,
  FavoriteIcon,
} from './styled';

export const DirectorySearch = (): JSX.Element => {
  const theme = useTheme();
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
          placeholder="поиск"
          aria-label="поиск"
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
        <Text
          variant={isFavoritesRoute ? 'body1Semibold' : 'body1Regular'}
          color={
            isFavoritesRoute
              ? theme.tokens.current.accent.primary
              : theme.tokens.current.text.primary
          }
        >
          избранное
        </Text>
      </FavoriteButton>
    </SearchRow>
  );
};
