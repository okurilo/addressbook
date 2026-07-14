import { useEffect, useState } from 'react';
import { Text } from '@pulse/ui/components/Text';
import type { Suggestion } from '@pulse/ui/components/Input';
import { useTheme } from 'styled-components';
import { SearchIcon, StarIcon } from '../icons';
import { getDepartmentPath, getEmployeePath, routePaths } from '../../routes/routePaths';
import { useLocation, useNavigate } from '@reach/router';
import { ignorePromise } from '../../utils/ignorePromise';
import { fetchEmployees } from '../../api/directory/client';
import type { Employee } from '../../api/directory/types';
import { fetchGroups, getVisibleGroups } from '../../api/directory/groups';
import { useDebouncedValue } from '../useDebouncedValue';
import {
  SearchRow,
  SearchField,
  SearchInput,
  SearchAdornment,
  FavoriteButton,
  FavoriteIcon,
} from './styled';

type DirectorySuggestion = Suggestion & {
  kind: 'person' | 'group';
  targetId: string;
  employee?: Employee;
};

const isDirectorySuggestion = (value: string | Suggestion): value is DirectorySuggestion =>
  typeof value !== 'string' &&
  (value.kind === 'person' || value.kind === 'group') &&
  typeof value.targetId === 'string';

export const DirectorySearch = (): JSX.Element => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const queryFromUrl = searchParams.get('q') ?? '';
  const [value, setValue] = useState(queryFromUrl);
  const [suggestions, setSuggestions] = useState<DirectorySuggestion[]>([]);
  const debouncedValue = useDebouncedValue(value, 500);
  const isFavoritesRoute = location.pathname === routePaths.favorites;

  useEffect(() => {
    setValue(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    if (debouncedValue.trim() === '') {
      setSuggestions([]);
      return () => controller.abort();
    }

    const loadSuggestions = async (): Promise<void> => {
      try {
        const [peopleResponse, rootGroup] = await Promise.all([
          fetchEmployees(debouncedValue, controller.signal, null),
          fetchGroups(undefined, controller.signal),
        ]);

        if (!isActive) {
          return;
        }

        const peopleSuggestions: DirectorySuggestion[] = peopleResponse.items.map((employee) => ({
          key: `person:${employee.id}`,
          value: employee.fullName,
          kind: 'person',
          targetId: employee.id,
          employee,
        }));
        const normalizedQuery = debouncedValue.trim().toLocaleLowerCase('ru');
        const groupSuggestions: DirectorySuggestion[] = getVisibleGroups(rootGroup)
          .filter((group) => group.name.toLocaleLowerCase('ru').includes(normalizedQuery))
          .map((group) => ({
            key: `group:${group.id}`,
            value: group.name,
            kind: 'group',
            targetId: group.id,
          }));

        setSuggestions([...peopleSuggestions, ...groupSuggestions]);
      } catch {
        if (isActive && !controller.signal.aborted) {
          setSuggestions([]);
        }
      }
    };

    void loadSuggestions();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [debouncedValue]);

  const clearSearchAndNavigate = (destination: string, state?: { employee: Employee }): void => {
    setValue('');
    setSuggestions([]);
    ignorePromise(navigate(destination, { state }));
  };

  const submitSearch = (): void => {
    const nextParams = new URLSearchParams(location.search);
    const normalizedValue = value.trim();

    if (normalizedValue === '') {
      nextParams.delete('q');
    } else {
      nextParams.set('q', normalizedValue);
    }

    const isStructureRoute =
      location.pathname === routePaths.structure ||
      location.pathname.startsWith(`${routePaths.structure}/`);
    const pathname = isStructureRoute ? location.pathname : routePaths.contacts;
    const nextSearch = nextParams.toString();
    ignorePromise(navigate(`${pathname}${nextSearch === '' ? '' : `?${nextSearch}`}`, {
      replace: true,
    }));
  };

  return (
    <SearchRow>
      <SearchField>
        <SearchInput
          value={value}
          suggestions={suggestions}
          placeholder="поиск"
          aria-label="поиск"
          onChange={(event) => {
            setValue(event.currentTarget.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              submitSearch();
            }
          }}
          onSuggestionSelect={(suggestion) => {
            if (!isDirectorySuggestion(suggestion)) {
              return;
            }

            if (suggestion.kind === 'person' && suggestion.employee !== undefined) {
              clearSearchAndNavigate(getEmployeePath(suggestion.targetId), {
                employee: suggestion.employee,
              });
              return;
            }

            clearSearchAndNavigate(getDepartmentPath(suggestion.targetId));
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
          ignorePromise(navigate(routePaths.favorites + location.search));
        }}
      >
        <FavoriteIcon $active={isFavoritesRoute} aria-hidden="true">
          <StarIcon />
        </FavoriteIcon>
        <Text
          variant={isFavoritesRoute ? 'body1Semibold' : 'body1Regular'}
          color={
            isFavoritesRoute
              ? theme.tokens.current.core.accent.primary
              : theme.tokens.current.core.text.primary
          }
        >
          избранное
        </Text>
      </FavoriteButton>
    </SearchRow>
  );
};
