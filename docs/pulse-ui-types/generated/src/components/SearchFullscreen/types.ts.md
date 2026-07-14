<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/SearchFullscreen/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `SearchFullscreen`
- Строк кода: 205
- Экспорты: `ChipData`, `DropdownItem`, `ForwardRef`, `Item`, `PrefixLengthType`, `SearchProps`
- Импорты: `../Dropdown/Items/SelectionSheetItem/types`, `react`
- Зависимости внутри выгрузки: [`src/components/Dropdown/Items/SelectionSheetItem/types.ts`](<../Dropdown/Items/SelectionSheetItem/types.ts.md>)

## Исходная типизация

```typescript
import type { PropsWithChildren, Ref } from "react";
import {
  ChangeEventHandler,
  Component,
  LegacyRef,
  MutableRefObject,
} from "react";
import type { SelectionSheetItemProps } from "../Dropdown/Items/SelectionSheetItem/types";

export type ChipData = {
  /**
   * Значение чипса
   */
  value: string;
  /**
   * Отображаемый текст чипса
   */
  label: string;
  /**
   * Наличие ошибки у чипса
   */
  isError?: boolean;
  /**
   * Постоянный чипс
   */
  isPermanent?: boolean;
  /**
   * Тип чипса
   */
  type?: "default" | "warnings";
};

export type DropdownItem = Omit<SelectionSheetItemProps, "onSelect"> &
  Partial<Pick<SelectionSheetItemProps, "onSelect">> & {
    id: string;
  };

type SearchButtonOptions = {
  /**
   * Текст

   */
  text?: string;
  /**
   * Коллбэк при клике на кнопку
   */
  onClick?: () => void;
  /**
   * Использовать popover
   * @deprecated
   */
  withPopover?: boolean;
  /**
   * Элементы выпадающего списка
   * @deprecated
   */
  items?: Item[];
  /**
   * ID опции, выбранной по умолчанию в выпадающем списке
   * @deprecated
   */
  defaultSelectedId?: string;

  /**
   * Показать кнопку с Dropdown
   */
  withDropdown?: boolean;
  /**
   * Фиксированная ширина Dropdown
   */
  dropdownFixedWidth?: number;
  /**
   * элементы для отрисовки items в Dropdown
   */
  dropdownItems?: DropdownItem[];
  /**
   * ID выбранного элемента
   */
  dropdownSelectedItem?: string;
  /**
   * Колбэк для установки выбранного элемента
   */
  onDropdownSelectedItem?: (id: string) => void;
};

export interface Item extends PropsWithChildren {
  /**
   * Уникальный идентификатор
   */
  id: string;
  /**
   * Коллбэк при клике
   */
  onClick?: (id: string) => void;
}

export type ForwardRef =
  | ((instance: HTMLInputElement | null) => void)
  | LegacyRef<Component<HTMLInputElement, unknown, unknown>>
  | MutableRefObject<HTMLInputElement | null>
  | null;

export interface SearchProps {
  /**
   * Значение инпута
   */
  $value: string;
  /**
   * Коллбэк изменения значения инпута
   */
  $onChange: ChangeEventHandler<HTMLInputElement>;
  /**
   * Текст плейсхолдера
   */
  $placeholder?: string;
  /**
   * Опции кнопки поиска
   */
  searchButtonOptions?: SearchButtonOptions;
  /**
   * Наличие кнопки очистки инпута
   */
  withClearButton?: boolean;
  /**
   * Наличие кнопки сортировки
   */
  withSortButton?: boolean;
  /**
   * Наличие кнопки фильтрации
   */
  withFilterButton?: boolean;
  /**
   * Коллбэк очистки значения инпута
   */
  $onClear?: () => void;
  /**
   * Коллбэк сортировки
   */
  $onSort?: () => void;
  /**
   * Коллбэк фильтрации
   */
  $onFilter?: () => void;
  /**
   * Коллбэк нажатия на Enter
   */
  $onKeyDown?: (value: string) => void;
  /**
   * Коллбэк удаления чипа
   */
  onChipRemove?: (value: string) => void;
  /**
   * Начальное состояние чипсов
   */
  initialChips?: ChipData[];
  /**
   * Очищать чипсы при клике на кнопку очистки (clear value)
   * Если true — при клике на cross-иконку будут очищаться и значение, и все чипсы
   * Если false — будет очищаться только значение, чипсы останутся
   */
  isClearChipsOnClear?: boolean;
  /**
   * Строка - плейсхолдер с информацией о найденных объектах
   */
  totalFoundPlaceholder?: string;
  /**
   * Количество найденных объектов
   */
  totalFound?: string;
  /**
   * Строка - плейсхолдер с информацией о ненайденных объектах
   */
  totalNotFoundPlaceholder?: string;
  /**
   * Количество ненайденных объектов
   */
  totalNotFound?: string;
  /**
   * Коллбэк нажатия на информацию о найденных объектах
   */
  onClickCopyFound?: (chips?: ChipData[]) => void;
  /**
   * Коллбэк нажатия на информацию о ненайденных объектах
   */
  onClickCopyNotFound?: (chips?: ChipData[]) => void;
  /**
   * Максимальная ширина списка чипсов в компоненте
   */
  chipsListMaxWidth?: number;
  /**
   * Показывает скелетоны загрузки вместо чипсов
   */
  showSkeletons?: boolean;
  /**
   * Ref на нативный <input> компонента.
   * Позволяет управлять фокусом из родительских компонентов.
   */
  inputRef?: Ref<HTMLInputElement>;
  /**
   * Автофокус на input при монтировании компонента
   */
  autoFocus?: boolean;
}

export type PrefixLengthType = number;

```
