import { strictEqual } from 'node:assert';
import { test } from 'node:test';
import { getGroupHierarchyPath } from './groupHierarchy';

test('формирует URL корневой структуры без id', () => {
  strictEqual(getGroupHierarchyPath(), '/addressbook/groups');
});

test('формирует URL выбранной структуры с id', () => {
  strictEqual(
    getGroupHierarchyPath('18013b60-f57d-41be-9ac6-fd0b3a0d0131'),
    '/addressbook/groups?id=18013b60-f57d-41be-9ac6-fd0b3a0d0131'
  );
});
