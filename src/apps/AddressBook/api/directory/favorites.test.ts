import { http } from '../../../../http-requests/http';
import {
  addFavoriteEmployee,
  fetchAllCustomPeopleGroupEmployees,
  fetchCustomPeopleGroupPage,
  fetchCustomPeopleGroups,
  fetchFavoriteEmployees,
  findFavoritesTeam,
  normalizeTeamMembers,
  removeFavoriteEmployee,
} from './favorites';
import type { CustomPeopleGroup, PeopleTeam } from './favorites';

jest.mock('../../../../http-requests/http', () => ({
  http: { get: jest.fn(), post: jest.fn() },
}));

type GetMock = jest.Mock<Promise<unknown>, [string, { input?: { signal?: AbortSignal } }?]>;
type PostMock = jest.Mock<Promise<unknown>, [string, unknown]>;

const getMock = http.get as unknown as GetMock;
const postMock = http.post as unknown as PostMock;
const favoriteTeam: PeopleTeam = {
  id: 'favorites-id',
  type: 'группа',
  typeOrder: 1,
  name: '  ИзБрАнНыЕ ',
  isCustom: true,
};

const member = (id: string) => ({
  personId: id,
  firstName: 'Иван',
  lastName: `Петров ${id}`,
  contacts: { officePhone: '1234', mobile: '+7999', officeEmail: `${id}@example.test` },
});

describe('favorites API', () => {
  beforeEach(() => {
    getMock.mockReset();
    postMock.mockReset();
  });

  test('находит только custom-группу «Избранные» без учёта регистра и пробелов', () => {
    expect(
      findFavoritesTeam([
        { ...favoriteTeam, id: 'not-custom', isCustom: false },
        favoriteTeam,
      ])
    ).toBe(favoriteTeam);
    expect(findFavoritesTeam([])).toBeNull();
  });

  test('нормализует участников и пропускает записи без id', () => {
    expect(normalizeTeamMembers({ content: [member('person-1'), { fullName: 'Без id' }] })).toEqual([
      expect.objectContaining({
        id: 'person-1',
        fullName: 'Петров person-1 Иван',
        avatarInitials: 'ИП',
        phone: '1234',
        mobilePhone: '+7999',
        email: 'person-1@example.test',
      }),
    ]);
    expect(() => normalizeTeamMembers({})).toThrow('Team response does not contain content');
  });

  test('пустой content завершает пагинацию даже при last=false', async () => {
    getMock.mockResolvedValueOnce({ content: [], last: false });

    const result = await fetchCustomPeopleGroupPage('group/id', 2);

    expect(result).toEqual({ employees: [], nextPage: 3, isLastPage: true });
    expect(getMock.mock.calls[0]?.[0]).toBe(
      '/srv/v7/people/teams/group%2Fid?page=2&size=20&isCustom=true'
    );
  });

  test('загружает первую страницу каждой custom-группы', async () => {
    getMock
      .mockResolvedValueOnce([favoriteTeam, { ...favoriteTeam, id: 'regular', isCustom: false }])
      .mockResolvedValueOnce({ content: [member('person-1')], last: true });

    await expect(fetchCustomPeopleGroups()).resolves.toEqual([
      expect.objectContaining({
        id: 'favorites-id',
        nextPage: 1,
        isLastPage: true,
        lastPageSignature: 'person-1',
      }),
    ]);
  });

  test('дочитывает группу, дедуплицирует людей и останавливается на последней странице', async () => {
    const group: CustomPeopleGroup = {
      id: 'group-1',
      name: 'Команда',
      employees: normalizeTeamMembers({ content: [member('person-1')] }),
      nextPage: 1,
      isLastPage: false,
      lastPageSignature: 'person-1',
    };
    getMock.mockResolvedValueOnce({
      content: [member('person-1'), member('person-2')],
      last: true,
    });

    const result = await fetchAllCustomPeopleGroupEmployees(group);

    expect(result.map(({ id }) => id)).toEqual(['person-1', 'person-2']);
  });

  test('возвращает пустое избранное, когда специальной группы нет', async () => {
    getMock.mockResolvedValueOnce([]);
    await expect(fetchFavoriteEmployees()).resolves.toEqual([]);
  });

  test('создаёт группу при первом добавлении и обновляет существующую', async () => {
    getMock.mockResolvedValueOnce([]);
    postMock.mockResolvedValueOnce(undefined);
    await addFavoriteEmployee('person-1');
    expect(postMock).toHaveBeenLastCalledWith('/srv/v7/people/custom-groups', {
      name: 'избранные',
      persons: ['person-1'],
    });

    getMock.mockResolvedValueOnce([favoriteTeam]);
    postMock.mockResolvedValueOnce(undefined);
    await addFavoriteEmployee('person-2');
    expect(postMock).toHaveBeenLastCalledWith('/srv/v7/people/custom-groups/update', {
      name: favoriteTeam.name,
      groupId: favoriteTeam.id,
      personsToAdd: ['person-2'],
      personsToDelete: [],
    });
  });

  test('удаляет сотрудника только при наличии группы избранного', async () => {
    getMock.mockResolvedValueOnce([]);
    await removeFavoriteEmployee('person-1');
    expect(postMock).not.toHaveBeenCalled();

    getMock.mockResolvedValueOnce([favoriteTeam]);
    postMock.mockResolvedValueOnce(undefined);
    await removeFavoriteEmployee('person-1');
    expect(postMock).toHaveBeenCalledWith('/srv/v7/people/custom-groups/update', {
      name: favoriteTeam.name,
      groupId: favoriteTeam.id,
      personsToAdd: [],
      personsToDelete: ['person-1'],
    });
  });
});
