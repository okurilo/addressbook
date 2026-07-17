import { fireEvent, render, screen } from '../test-utils';
import { Chip } from './Chip';
import { ConnectCell } from './ConnectCell';
import { IconButton } from './IconButton';
import { NameCell } from './NameCell';
import { PositionCell } from './PositionCell';
import { StructureCell } from './StructureCell';

describe('базовые компоненты таблицы Adressbook', () => {
  test('Chip и IconButton передают клики', () => {
    const onClick = jest.fn<void, []>();
    render(
      <>
        <Chip text="Телефон" onClick={onClick}>
          <span>иконка</span>
        </Chip>
        <IconButton onClick={onClick}>действие</IconButton>
      </>
    );

    fireEvent.click(screen.getByRole('button', { name: 'иконка Телефон' }));
    fireEvent.click(screen.getByRole('button', { name: 'действие' }));
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  test('рендерит ячейки имени, должности и структуры', () => {
    render(
      <>
        <NameCell
          pid="person-1"
          data={{ name: 'Иван Петров', photo: '', initials: 'ИП' }}
        />
        <PositionCell position="Разработчик" block="ИТ" />
        <StructureCell structure="Платформа" />
      </>
    );

    expect(screen.getByText('Иван Петров')).toBeTruthy();
    expect(screen.getByText('Разработчик')).toBeTruthy();
    expect(screen.getByText('ИТ')).toBeTruthy();
    expect(screen.getByText('Платформа')).toBeTruthy();
  });

  test('ConnectCell вызывает внешний renderActions с контекстом', () => {
    const renderActions = jest.fn(() => <span>Действия</span>);
    render(
      <ConnectCell personId="person-1" isFavorite personalPhone="+7999" />,
      { providerOptions: { addressbook: { people: [], renderActions } } }
    );

    expect(screen.getByText('Действия')).toBeTruthy();
    expect(renderActions).toHaveBeenCalledWith(
      'person-1',
      true,
      undefined,
      undefined,
      '+7999'
    );
  });
});
