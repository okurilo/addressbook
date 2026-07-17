import { http } from '../../../../http-requests/http';
import { getSearchHistory, putSearchHistory, selectSearchHistory } from './history';
import { SearchContextEnum } from './types';
import type { PutSearchHistoryBody, SearchHistoryItem } from './types';

jest.mock('../../../../http-requests/http', () => ({
  http: { get: jest.fn(), post: jest.fn() },
}));

type GetMock = jest.Mock<Promise<unknown>, [string, { input?: { signal?: AbortSignal } }?]>;
type PostMock = jest.Mock<Promise<unknown>, [string, unknown]>;

const getMock = http.get as unknown as GetMock;
const postMock = http.post as unknown as PostMock;
const historyItem = (context: SearchContextEnum): SearchHistoryItem => ({
  id: `history-${context}`,
  path: context,
  text: context,
  key: { context, id: `person-${context}` },
});

describe('history API', () => {
  beforeEach(() => {
    getMock.mockReset();
    postMock.mockReset();
  });

  test('запрашивает четыре person-записи и фильтрует посторонние контексты', async () => {
    const signal = new AbortController().signal;
    getMock.mockResolvedValueOnce([
      historyItem(SearchContextEnum.persons),
      historyItem(SearchContextEnum.employee),
      historyItem(SearchContextEnum.service),
    ]);

    const result = await getSearchHistory({ signal });

    expect(result.map(({ key }) => key.context)).toEqual([
      SearchContextEnum.persons,
      SearchContextEnum.employee,
    ]);
    expect(getMock).toHaveBeenCalledWith('globalsearch/api/v3/history?paths=persons&size=4', {
      input: { signal },
    });
  });

  test('сохраняет историю одновременно в выбранный путь и all', async () => {
    const body: PutSearchHistoryBody = {
      text: 'Иван',
      key: { context: SearchContextEnum.persons, id: 'person-1' },
      tags: [],
    };
    postMock.mockResolvedValueOnce(undefined);

    await putSearchHistory(body, SearchContextEnum.employee);

    expect(postMock).toHaveBeenCalledWith(
      'globalsearch/api/v3/history?paths=employee%2Call',
      body
    );
  });

  test('не дублирует all и кодирует id выбранной записи', async () => {
    postMock.mockResolvedValue(undefined);

    await putSearchHistory(
      { text: 'Все', key: { context: SearchContextEnum.all, id: 'all' }, tags: [] },
      SearchContextEnum.all
    );
    await selectSearchHistory('id/with space');

    expect(postMock).toHaveBeenNthCalledWith(
      1,
      'globalsearch/api/v3/history?paths=all',
      expect.any(Object)
    );
    expect(postMock).toHaveBeenNthCalledWith(
      2,
      'globalsearch/api/v3/history/id%2Fwith%20space?path=globalsearch:all',
      {}
    );
  });
});
