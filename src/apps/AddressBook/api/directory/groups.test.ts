import { http } from '../../../../http-requests/http';
import { fetchGroups, fetchRootGroups, getGroupPath, getVisibleGroups } from './groups';
import type { GroupNode } from './groups';

jest.mock('../../../../http-requests/http', () => ({
  http: { get: jest.fn(), post: jest.fn() },
}));

type GetMock = jest.Mock<Promise<unknown>, [string, { input?: { signal?: AbortSignal } }?]>;
const getMock = http.get as unknown as GetMock;

const leaf = (id: string, name = id): GroupNode => ({
  id,
  name,
  type: 'unit',
  hasChild: false,
  children: [],
});

describe('groups API and tree helpers', () => {
  beforeEach(() => {
    getMock.mockReset();
  });

  test('передаёт только закодированный id и AbortSignal', async () => {
    const signal = new AbortController().signal;
    getMock.mockResolvedValueOnce(leaf('unit/1'));
    await fetchGroups('unit/1', signal);
    expect(getMock).toHaveBeenCalledWith('posts/api/v1/addressbook/groups?id=unit%2F1', {
      input: { signal },
    });

    getMock.mockResolvedValueOnce(leaf('current'));
    await fetchGroups();
    expect(getMock).toHaveBeenLastCalledWith('posts/api/v1/addressbook/groups', {
      input: { signal: undefined },
    });
  });

  test('отдельно загружает корневые группы', async () => {
    getMock.mockResolvedValueOnce([leaf('root')]);
    await expect(fetchRootGroups()).resolves.toEqual([leaf('root')]);
    expect(getMock.mock.calls[0]?.[0]).toBe('posts/api/v1/addressbook/groups/root');
  });

  test('строит путь к текущему узлу через parentTree', () => {
    const target = leaf('target');
    const sibling = leaf('sibling');
    const branch: GroupNode = { ...leaf('branch'), hasChild: true, children: [target] };
    const root: GroupNode = { ...leaf('root'), hasChild: true, children: [sibling, branch] };
    const current = { ...target, parentTree: root };

    expect(getGroupPath(current).map(({ id }) => id)).toEqual(['root', 'branch', 'target']);
    expect(getGroupPath(leaf('single'))).toEqual([leaf('single')]);
  });

  test('показывает детей или сам листовой узел', () => {
    const child = leaf('child');
    expect(getVisibleGroups({ ...leaf('root'), children: [child] })).toEqual([child]);
    expect(getVisibleGroups(child)).toEqual([child]);
  });
});
