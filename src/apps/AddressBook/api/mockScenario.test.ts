import { getMockScenario, setMockScenario } from './mockScenario';

describe('mockScenario', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test.each(['success', 'loading', 'empty', 'error'] as const)(
    'читает допустимый сценарий %s',
    (scenario) => {
      window.localStorage.setItem('addressbook-mock-scenario', scenario);
      expect(getMockScenario()).toBe(scenario);
    }
  );

  test('использует success для неизвестного значения', () => {
    window.localStorage.setItem('addressbook-mock-scenario', 'unknown');
    expect(getMockScenario()).toBe('success');
  });

  test('сохраняет сценарий и уведомляет подписчиков', () => {
    const listener = jest.fn<void, [Event]>();
    window.addEventListener('mock-scenario-change', listener);

    setMockScenario('empty');

    expect(window.localStorage.getItem('addressbook-mock-scenario')).toBe('empty');
    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({ detail: 'empty' }) as CustomEvent<'empty'>
    );
    window.removeEventListener('mock-scenario-change', listener);
  });
});
