import type { MockScenario } from '../mocks/types';

const STORAGE_KEY = 'addressbook-mock-scenario';

export const getMockScenario = (): MockScenario => {
  const scenario = window.localStorage.getItem(STORAGE_KEY);

  if (
    scenario === 'success' ||
    scenario === 'loading' ||
    scenario === 'empty' ||
    scenario === 'error'
  ) {
    return scenario;
  }

  return 'success';
};

export const setMockScenario = (scenario: MockScenario): void => {
  window.localStorage.setItem(STORAGE_KEY, scenario);
  window.dispatchEvent(new CustomEvent('mock-scenario-change', { detail: scenario }));
};

