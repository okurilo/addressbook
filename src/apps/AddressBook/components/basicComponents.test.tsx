import { fireEvent, render, screen } from '../../../Components/Adressbook/test-utils';
import { EmployeeAvatar } from './EmployeeAvatar';
import { PagePlaceholder } from './PagePlaceholder';
import { RetryState } from './RetryState';
import { ShowMoreButton } from './ShowMoreButton';

describe('базовые компоненты AddressBook', () => {
  test('показывает avatar с инициалами', () => {
    render(<EmployeeAvatar initials="ИП" status="available" />);
    expect(screen.getByText('ИП')).toBeTruthy();
  });

  test('рендерит placeholder', () => {
    render(<PagePlaceholder title="Раздел" description="Скоро появится" />);
    expect(screen.getByText('Раздел')).toBeTruthy();
    expect(screen.getByText('Скоро появится')).toBeTruthy();
  });

  test('вызывает повтор загрузки', () => {
    const onRetry = jest.fn<void, []>();
    render(<RetryState title="Ошибка" description="Не удалось" onRetry={onRetry} />);
    fireEvent.click(screen.getByRole('button', { name: 'Повторить' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  test('кнопка дозагрузки меняет состояние и вызывает обработчик', () => {
    const onClick = jest.fn<void, []>();
    const { rerender } = render(<ShowMoreButton isLoading={false} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Показать ещё' }));
    expect(onClick).toHaveBeenCalledTimes(1);

    rerender(<ShowMoreButton isLoading onClick={onClick} />);
    const loadingButton = screen.getByRole('button', { name: 'Загружаем…' });
    expect((loadingButton as HTMLButtonElement).disabled).toBe(true);
  });
});
