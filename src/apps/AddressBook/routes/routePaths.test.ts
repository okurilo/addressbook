import { getDepartmentPath, getEmployeePath, routePaths } from './routePaths';

describe('routePaths', () => {
  test('строит публичные пути и кодирует динамические сегменты', () => {
    expect(routePaths.contacts).toBe('/platform/globalsearch/addressbook');
    expect(getEmployeePath('person/id with space')).toBe(
      '/platform/globalsearch/addressbook/employee/person%2Fid%20with%20space'
    );
    expect(getDepartmentPath('unit/id')).toBe(
      '/platform/globalsearch/addressbook/structure/unit%2Fid'
    );
  });
});
