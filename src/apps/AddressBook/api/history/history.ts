import { http } from '../../../../http-requests/http';
import { SearchContextEnum } from './types';
import type { PutSearchHistoryBody, SearchHistoryItem, SearchHistoryPath } from './types';

const personContexts: SearchHistoryPath[] = [
  SearchContextEnum.persons,
  SearchContextEnum.employee,
  SearchContextEnum.sberpeople,
];

type GetSearchHistoryParams = {
  paths?: SearchHistoryPath;
  signal?: AbortSignal;
  size?: number;
};

export const getSearchHistory = async ({
  paths = SearchContextEnum.persons,
  signal,
  size = 4,
}: GetSearchHistoryParams = {}): Promise<SearchHistoryItem[]> => {
  const params = new URLSearchParams();
  params.append('paths', paths);
  params.append('size', `${size}`);
  const history = await http.get<SearchHistoryItem[]>(
    `globalsearch/api/v3/history?${params.toString()}`,
    {
      input: { signal },
    }
  );

  return history.filter((item) => personContexts.includes(item.key.context));
};

export const putSearchHistory = async (
  body: PutSearchHistoryBody,
  path: SearchHistoryPath = SearchContextEnum.persons
): Promise<void> => {
  const params = new URLSearchParams();
  const pathsValue = path === 'all' ? 'all' : `${path},all`;
  params.append('paths', pathsValue);

  return http.post<void>(`globalsearch/api/v3/history?${params.toString()}`, body);
};

export const selectSearchHistory = async (id: string): Promise<void> =>
  http.post<void>(
    `globalsearch/api/v3/history/${encodeURIComponent(id)}?path=globalsearch:all`,
    {}
  );
