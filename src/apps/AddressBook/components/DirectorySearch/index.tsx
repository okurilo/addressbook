import { useEffect, useState } from 'react';
import { Text } from '@pulse/ui/components/Text';
import { useTheme } from 'styled-components';
import { SearchIcon, StarIcon } from '../icons';
import { routePaths } from '../../routes/routePaths';
import { useLocation, useNavigate } from '@reach/router';
import { fetchDirectoryEmployees } from '../../api/directory/search';
import type { Employee } from '../../api/directory/types';
import { useDebouncedValue } from '../useDebouncedValue';
import { ignorePromise } from '../../utils/ignorePromise';
import {
  SearchRow,
  SearchField,
  SearchInput,
  SearchAdornment,
  Suggestions,
  SuggestionButton,
  SuggestionMeta,
  SuggestionState,
  FavoriteButton,
  FavoriteIcon,
} from './styled';

const SEARCH_DEBOUNCE_MS = 500;

export const DirectorySearch = (): JSX.Element => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const queryFromUrl = searchParams.get('q') ?? '';
  const [value, setValue] = useState(queryFromUrl);
  const debouncedValue = useDebouncedValue(value, SEARCH_DEBOUNCE_MS);
  const [suggestions, setSuggestions] = useState<Employee[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const isFavoritesRoute = location.pathname === routePaths.favorites;
  const isStructureRoute =
    location.pathname === routePaths.structure ||
    location.pathname.startsWith(`${routePaths.structure}/`);

  useEffect(() => {
    setValue(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    const normalizedQuery = debouncedValue.trim();

    if (normalizedQuery === '' || !isSuggestionsOpen) {
      setSuggestions([]);
      setIsSuggestionsLoading(false);
      return undefined;
    }

    let isActive = true;
    const controller = new AbortController();

    const loadSuggestions = async (): Promise<void> => {
      setIsSuggestionsLoading(true);

      try {
        const response = await fetchDirectoryEmployees(normalizedQuery, controller.signal, null);

        if (isActive) {
          setSuggestions(response.items.slice(0, 6));
        }
      } catch {
        if (isActive) {
          setSuggestions([]);
        }
      } finally {
        if (isActive) {
          setIsSuggestionsLoading(false);
        }
      }
    };

    void loadSuggestions();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [debouncedValue, isSuggestionsOpen]);

  const submitPeopleSearch = (): void => {
    const normalizedQuery = value.trim();
    const nextParams = new URLSearchParams();

    if (normalizedQuery !== '') {
      nextParams.set('q', normalizedQuery);
    }

    const nextSearch = nextParams.toString();
    const searchRoute = isStructureRoute ? routePaths.structure : routePaths.contacts;

    setIsSuggestionsOpen(false);
    ignorePromise(navigate(`${searchRoute}${nextSearch === '' ? '' : `?${nextSearch}`}`));
  };

  const openEmployee = (employee: Employee): void => {
    const nextParams = new URLSearchParams();
    const normalizedQuery = value.trim();

    if (normalizedQuery !== '') {
      nextParams.set('q', normalizedQuery);
    }

    nextParams.set('personId', employee.id);
    setIsSuggestionsOpen(false);
    ignorePromise(navigate(`${routePaths.contacts}?${nextParams.toString()}`));
  };

  return (
    <SearchRow>
      <SearchField>
        <SearchInput
          value={value}
          placeholder="поиск"
          aria-label="поиск"
          onChange={(event) => {
            setValue(event.currentTarget.value);
            setIsSuggestionsOpen(true);
          }}
          onFocus={() => {
            setIsSuggestionsOpen(true);
          }}
          onBlur={() => {
            setIsSuggestionsOpen(false);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              submitPeopleSearch();
            }
          }}
        />
        <SearchAdornment>
          <SearchIcon size={22} />
        </SearchAdornment>
        {isSuggestionsOpen && value.trim() !== '' ? (
          <Suggestions role="listbox" aria-label="Результаты поиска людей">
            {isSuggestionsLoading ? (
              <SuggestionState>
                <Text variant="body2Regular">Ищем сотрудников…</Text>
              </SuggestionState>
            ) : null}
            {!isSuggestionsLoading && suggestions.length === 0 ? (
              <SuggestionState>
                <Text variant="body2Regular">Сотрудники не найдены</Text>
              </SuggestionState>
            ) : null}
            {!isSuggestionsLoading
              ? suggestions.map((employee) => (
                  <SuggestionButton
                    key={employee.id}
                    type="button"
                    role="option"
                    aria-selected="false"
                    onMouseDown={(event) => {
                      event.preventDefault();
                    }}
                    onClick={() => {
                      openEmployee(employee);
                    }}
                  >
                    <Text variant="body2Semibold">{employee.fullName}</Text>
                    <SuggestionMeta>
                      <Text
                        variant="caption1Regular"
                        color={theme.tokens.current.core.text.secondary}
                      >
                        {[employee.shortStructure, employee.position]
                          .filter((item) => item !== '')
                          .join(' · ')}
                      </Text>
                    </SuggestionMeta>
                  </SuggestionButton>
                ))
              : null}
          </Suggestions>
        ) : null}
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
