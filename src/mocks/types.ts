export type MockScenario = 'success' | 'loading' | 'empty' | 'error';

export type MockScenarioRecord = {
  code: number;
  body: unknown;
};
