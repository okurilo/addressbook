import { strict as assert } from 'node:assert';
import { test } from 'node:test';
import {
  getDirectoryNavigationPath,
  getPeopleSearchPath,
  getSelectedPersonPath,
} from './getDirectoryNavigationPath';
import { routePaths } from './routePaths';

test('сохраняет поиск людей между контактами и кадровой структурой', () => {
  assert.equal(
    getDirectoryNavigationPath(routePaths.structure, '?q=Иванов&personId=person-1'),
    `${routePaths.structure}?q=%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2`
  );
  assert.equal(
    getDirectoryNavigationPath(routePaths.contacts, '?q=Иванов'),
    `${routePaths.contacts}?q=%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2`
  );
});

test('переносит глобальный фильтр во все разделы', () => {
  assert.equal(
    getDirectoryNavigationPath(routePaths.referencePhones, '?q=Иванов'),
    `${routePaths.referencePhones}?q=%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2`
  );
  assert.equal(
    getDirectoryNavigationPath(routePaths.favorites, '?q=Иванов'),
    `${routePaths.favorites}?q=%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2`
  );
});

test('Enter сохраняет текущий раздел и активирует q', () => {
  assert.equal(
    getPeopleSearchPath(routePaths.favorites, '', ' Иванов '),
    `${routePaths.favorites}?q=%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2`
  );
  assert.equal(
    getPeopleSearchPath(
      `${routePaths.structure}/department-1`,
      '?personId=person-1&personQuery=Иванов',
      'Петров'
    ),
    `${routePaths.structure}?q=%D0%9F%D0%B5%D1%82%D1%80%D0%BE%D0%B2`
  );
  assert.equal(
    getPeopleSearchPath(routePaths.referencePhones, '?categoryId=support', 'Иванов'),
    `${routePaths.referencePhones}?categoryId=support&q=%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2`
  );
});

test('выбор человека завершает глобальный поиск и не сохраняет q', () => {
  assert.equal(
    getSelectedPersonPath('person-1', 'Иванов'),
    `${routePaths.contacts}?personId=person-1&personQuery=%D0%98%D0%B2%D0%B0%D0%BD%D0%BE%D0%B2`
  );
});
