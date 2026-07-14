import { http } from '../../../../http-requests/http';
import type {
  PutSearchHistoryBody,
  SearchHistoryItem,
  SearchHistoryPath,
} from './types';

type GetSearchHistoryParams = {
  paths?: SearchHistoryPath;
  signal?: AbortSignal;
  size?: number;
};

export const getSearchHistory = async ({
  paths = 'all',
  signal,
  size = 4,
}: GetSearchHistoryParams = {}): Promise<SearchHistoryItem[]> => {
  const params = new URLSearchParams();
  params.append('paths', paths);
  params.append('size', `${size}`);

  return http.get<SearchHistoryItem[]>(
    `globalsearch/api/v3/history?${params.toString()}`,
    {
      input: { signal },
    }
  );
};

export const putSearchHistory = async (
  body: PutSearchHistoryBody,
  path: SearchHistoryPath = 'all'
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

export const deleteSearchHistory = async (id: string): Promise<void> => {
  const params = new URLSearchParams();
  params.append('path', 'all');

  return http.delete<void>(
    `globalsearch/api/v3/history/history/${encodeURIComponent(id)}?${params.toString()}`
  );
};
