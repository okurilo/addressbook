import { http } from '../../../../http-requests/http';

export type GroupHierarchy = {
  id: string;
  type: string;
  name: string;
  hasChild: boolean;
  children: string[];
  parentTree: string;
};

export const getGroupHierarchyPath = (id?: string): string => {
  if (id === undefined) {
    return '/addressbook/groups';
  }

  return `/addressbook/groups?id=${encodeURIComponent(id)}`;
};

export const getGroupHierarchy = async (
  id?: string,
  signal?: AbortSignal
): Promise<GroupHierarchy> =>
  http.get<GroupHierarchy>(getGroupHierarchyPath(id), {
    input: { signal },
  });
