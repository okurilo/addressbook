import { act, renderHook } from '../../../test-utils/test-utils';
import { useDebouncedValue } from './useDebouncedValue';

describe('useDebouncedValue', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('обновляет значение только после задержки', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebouncedValue(value, delay),
      { initialProps: { value: 'старое', delay: 500 } }
    );

    rerender({ value: 'новое', delay: 500 });
    act(() => {
      jest.advanceTimersByTime(499);
    });
    expect(result.current).toBe('старое');

    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe('новое');
  });

  test('отменяет предыдущий таймер при повторном изменении', () => {
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 100), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });
    act(() => {
      jest.advanceTimersByTime(50);
    });
    rerender({ value: 'c' });
    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(result.current).toBe('c');
  });
});
