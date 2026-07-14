import { http } from '../../../../http-requests/http';

export type GroupNode = {
  id: string;
  type: string;
  name: string;
  hasChild: boolean;
  children: GroupNode[];
  parentTree?: GroupNode;
};

const GROUPS_PATH = 'posts/api/v1/addressbook/groups';

export const fetchGroups = async (
  id?: string,
  signal?: AbortSignal
): Promise<GroupNode> => {
  const path = id === undefined
    ? GROUPS_PATH
    : `${GROUPS_PATH}?id=${encodeURIComponent(id)}`;
  return http.get<GroupNode>(path, {
    input: { signal },
  });
};

export const getGroupPath = (group: GroupNode): GroupNode[] => {
  const findPath = (node: GroupNode, targetId: string): GroupNode[] | null => {
    if (node.id === targetId) {
      return [node];
    }

    for (const child of node.children) {
      const childPath = findPath(child, targetId);

      if (childPath !== null) {
        return [node, ...childPath];
      }
    }

    return null;
  };

  if (group.parentTree === undefined) {
    return [group];
  }

  return findPath(group.parentTree, group.id) ?? [group];
};

export const getVisibleGroups = (root: GroupNode): GroupNode[] =>
  root.children.length > 0 ? root.children : [root];
