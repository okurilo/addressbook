import { routePaths } from './routePaths';

export const getDirectoryNavigationPath = (
  targetPath: string,
  currentSearch: string
): string => {
  const query = new URLSearchParams(currentSearch).get('q');

  if (query === null || query.trim() === '') {
    return targetPath;
  }

  const nextParams = new URLSearchParams();
  nextParams.set('q', query);

  return `${targetPath}?${nextParams.toString()}`;
};

export const getPeopleSearchPath = (
  currentPath: string,
  currentSearch: string,
  query: string
): string => {
  const targetPath =
    currentPath === routePaths.structure ||
    currentPath.startsWith(`${routePaths.structure}/`)
      ? routePaths.structure
      : currentPath === routePaths.favorites
      ? routePaths.favorites
      : currentPath === routePaths.referencePhones
      ? routePaths.referencePhones
      : routePaths.contacts;
  const nextParams = new URLSearchParams(currentSearch);
  const normalizedQuery = query.trim();

  nextParams.delete('personId');
  nextParams.delete('personQuery');

  if (normalizedQuery === '') {
    nextParams.delete('q');
  } else {
    nextParams.set('q', normalizedQuery);
  }

  const nextSearch = nextParams.toString();

  return `${targetPath}${nextSearch === '' ? '' : `?${nextSearch}`}`;
};

export const getSelectedPersonPath = (personId: string, personQuery: string): string => {
  const nextParams = new URLSearchParams();
  nextParams.set('personId', personId);
  nextParams.set('personQuery', personQuery);

  return `${routePaths.contacts}?${nextParams.toString()}`;
};
