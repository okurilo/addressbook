import { useEffect, useState } from 'react';
import { Text } from '@pulse/ui/components/Text';
import { useTheme } from 'styled-components';
import { useLocation, useNavigate } from '@reach/router';
import { CloseIcon, SearchIcon, StarIcon } from '../icons';
import { getDepartmentPath, getEmployeePath, routePaths } from '../../routes/routePaths';
import { ignorePromise } from '../../utils/ignorePromise';
import { fetchSearchSuggestions } from '../../api/directory/client';
import type { Employee } from '../../api/directory/types';
import { useDebouncedValue } from '../useDebouncedValue';
import {
  SearchRow,
  SearchField,
  SearchInput,
  SearchAdornment,
  ClearButton,
  Suggestions,
  SuggestionButton,
  SuggestionMeta,
  SuggestionState,
  SuggestionSectionLabel,
  FavoriteButton,
  FavoriteIcon,
} from './styled';

type DirectorySuggestion = {
  key: string;
  value: string;
  kind: 'person' | 'group';
  targetId: string;
  employee?: Employee;
  meta?: string;
};

export const DirectorySearch = (): JSX.Element => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const queryFromUrl = searchParams.get('q') ?? '';
  const [value, setValue] = useState(queryFromUrl);
  const [suggestions, setSuggestions] = useState<DirectorySuggestion[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
  const debouncedValue = useDebouncedValue(value, 500);
  const isFavoritesRoute = location.pathname === routePaths.favorites;
  const isStructureRoute = location.pathname.startsWith(routePaths.structure);

  useEffect(() => {
    setValue(queryFromUrl);
  }, [queryFromUrl]);

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const normalizedQuery = debouncedValue.trim();

    if (normalizedQuery === '' || !isSuggestionsOpen) {
      setSuggestions([]);
      setIsSuggestionsLoading(false);
      return () => controller.abort();
    }

    const loadSuggestions = async (): Promise<void> => {
      setIsSuggestionsLoading(true);

      try {
        const result = await fetchSearchSuggestions(
          normalizedQuery,
          controller.signal,
          isStructureRoute
        );

        if (!isActive) {
          return;
        }

        const peopleSuggestions: DirectorySuggestion[] = result.items
          .slice(0, 6)
          .map((employee) => ({
            key: `person:${employee.id}`,
            value: employee.fullName,
            kind: 'person',
            targetId: employee.id,
            employee,
          }));
        const groupSuggestions: DirectorySuggestion[] = result.organizations
          .slice(0, 6)
          .map((organization) => ({
            key: `group:${organization.id}`,
            value: organization.fullName,
            kind: 'group',
            targetId: organization.id,
            meta:
              [organization.typeName, organization.layerName]
                .filter((item): item is string => item !== undefined && item !== '')
                .join(' · ') || 'Подразделение',
          }));

        setSuggestions([...peopleSuggestions, ...groupSuggestions]);
      } catch {
        if (isActive && !controller.signal.aborted) {
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
  }, [debouncedValue, isSuggestionsOpen, isStructureRoute]);

  const clearSearchAndNavigate = (destination: string, state?: { employee: Employee }): void => {
    setValue('');
    setSuggestions([]);
    setIsSuggestionsOpen(false);
    ignorePromise(navigate(destination, { state }));
  };

  const clearSearch = (): void => {
    const nextParams = new URLSearchParams(location.search);
    nextParams.delete('q');
    nextParams.delete('page');
    const nextSearch = nextParams.toString();

    setValue('');
    setSuggestions([]);
    setIsSuggestionsOpen(false);
    ignorePromise(
      navigate(`${location.pathname}${nextSearch === '' ? '' : `?${nextSearch}`}`, {
        replace: true,
      })
    );
  };

  const submitSearch = (): void => {
    const nextParams = new URLSearchParams(location.search);
    const normalizedValue = value.trim();

    if (normalizedValue === '') {
      nextParams.delete('q');
    } else {
      nextParams.set('q', normalizedValue);
    }
    nextParams.delete('page');

    const isEmployeeRoute = location.pathname.startsWith(`${routePaths.contacts}/employee/`);
    const pathname = isEmployeeRoute ? routePaths.contacts : location.pathname;
    const nextSearch = nextParams.toString();
    setIsSuggestionsOpen(false);
    ignorePromise(
      navigate(`${pathname}${nextSearch === '' ? '' : `?${nextSearch}`}`, {
        replace: true,
      })
    );
  };

  return (
    <SearchRow>
      <SearchField>
        <SearchInput
          value={value}
          placeholder="поиск"
          aria-label="поиск"
          onChange={(event) => {
            const nextValue = event.currentTarget.value;
            setValue(nextValue);
            setIsSuggestionsLoading(nextValue.trim() !== '');
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
              submitSearch();
            }
          }}
        />
        {value !== '' ? (
          <ClearButton
            type="button"
            aria-label="Очистить поиск"
            onMouseDown={(event) => {
              event.preventDefault();
            }}
            onClick={clearSearch}
          >
            <CloseIcon />
          </ClearButton>
        ) : null}
        <SearchAdornment>
          <SearchIcon size={22} />
        </SearchAdornment>
        {isSuggestionsOpen && value.trim() !== '' ? (
          <Suggestions role="listbox" aria-label="Результаты поиска">
            {isSuggestionsLoading ? (
              <SuggestionState>
                <Text variant="body2Regular">
                  {isStructureRoute ? 'Ищем в кадровой структуре…' : 'Ищем сотрудников и подразделения…'}
                </Text>
              </SuggestionState>
            ) : null}
            {!isSuggestionsLoading && suggestions.length === 0 ? (
              <SuggestionState>
                <Text variant="body2Regular">Ничего не найдено</Text>
              </SuggestionState>
            ) : null}
            {!isSuggestionsLoading
              ? suggestions
                  .filter((suggestion) => suggestion.kind === 'person')
                  .map((suggestion) => (
                  <SuggestionButton
                    key={suggestion.key}
                    type="button"
                    role="option"
                    aria-selected="false"
                    onMouseDown={(event) => {
                      event.preventDefault();
                    }}
                    onClick={() => {
                      if (suggestion.employee !== undefined) {
                        clearSearchAndNavigate(getEmployeePath(suggestion.targetId), {
                          employee: suggestion.employee,
                        });
                      }
                    }}
                  >
                    <Text variant="body2Semibold">{suggestion.value}</Text>
                    <SuggestionMeta>
                      <Text
                        variant="caption1Regular"
                        color={theme.tokens.current.core.text.secondary}
                      >
                        {[suggestion.employee?.shortStructure, suggestion.employee?.position]
                          .filter((item): item is string => item !== undefined && item !== '')
                          .join(' · ')}
                      </Text>
                    </SuggestionMeta>
                  </SuggestionButton>
                ))
              : null}
            {!isSuggestionsLoading && suggestions.some((item) => item.kind === 'group') ? (
              <SuggestionSectionLabel>
                <Text variant="caption1Semibold">Найдено в кадровой структуре</Text>
              </SuggestionSectionLabel>
            ) : null}
            {!isSuggestionsLoading
              ? suggestions
                  .filter((suggestion) => suggestion.kind === 'group')
                  .map((suggestion) => (
                    <SuggestionButton
                      key={suggestion.key}
                      type="button"
                      role="option"
                      aria-selected="false"
                      onMouseDown={(event) => {
                        event.preventDefault();
                      }}
                      onClick={() => {
                        clearSearchAndNavigate(getDepartmentPath(suggestion.targetId));
                      }}
                    >
                      <Text variant="body2Semibold">{suggestion.value}</Text>
                      <SuggestionMeta>
                        <Text
                          variant="caption1Regular"
                          color={theme.tokens.current.core.text.secondary}
                        >
                          {suggestion.meta}
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
          const nextParams = new URLSearchParams(location.search);
          nextParams.delete('page');
          const nextSearch = nextParams.toString();
          ignorePromise(
            navigate(`${routePaths.favorites}${nextSearch === '' ? '' : `?${nextSearch}`}`)
          );
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
