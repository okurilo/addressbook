<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Multiselect/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Multiselect`
- Строк кода: 195
- Экспорты: `ButtonTextProps`, `ChipData`, `SelectProps`, `Value`
- Импорты: `../Dropdown/types`, `csstype`, `react`, `react-window`
- Зависимости внутри выгрузки: [`src/components/Dropdown/types.ts`](<../Dropdown/types.ts.md>)

## Исходная типизация

```typescript
import { Property } from "csstype";
import { ReactElement, ReactNode } from "react";
import { FixedSizeListProps } from "react-window";
import { DropdownProps } from "../Dropdown/types";

export type Value = string | number;

// Если импортировать OptionProps из Option/types.ts, возникает циклическая зависимость,
// поэтому, пришлось оставить здесь локальную копию
interface OptionProps<ValueP extends Value = string> {
  value?: ValueP;
  children: ReactNode;
}

export interface SelectProps<ValueP extends Value = string> {
  /**
   * Плейсхолдер строки поиска.
   */
  placeholder?: string;
  /**
   * Дочерние компоненты-опции.
   */
  children:
    | ReactElement<OptionProps<ValueP>>
    | ReactElement<OptionProps<ValueP>>[];
  /**
   * Флаг заблокированного состояния.
   */
  isDisabled?: boolean;
  /**
   * Текущее состояние (открыт / закрыт).
   * @default false
   */
  isOpen?: boolean;
  /**
   * Обработчик изменения состояния выпадающего списка.
   */
  onSelectToggle?: (isOpen: boolean) => void;
  /**
   * Максимальная высота выпадающего списка.
   */
  optionsListMaxHeight?: Property.MaxHeight<number>;
  /**
   * Минимальная ширина компонента.
   */
  minWidth?: string;
  /**
   * Флаг наличия строки поиска.
   */
  withSearch?: boolean;
  /**
   * Текущее значение строки поиска.
   *
   * Пропс обязателен при withSearch === true.
   */
  searchValue?: string;
  /**
   * Обработчик изменения состояния строки поиска.
   *
   * Пропс обязателен при withSearch === true.
   */
  onSearchChange?: (value: string) => void;
  /**
   * Обработчик фильтрации списка опций.
   *
   * Если опцию нужно отрендерить, необходимо вернуть true.
   *
   * Если не нужно, соответственно, false.
   *
   * Пропс обязателен при withSearch === true.
   */
  onFilter?: (value: ReactNode) => boolean;
  /**
   * Обработчик выбора опции из списка.
   */
  onSelectOption: (value: string, index: number, selected: boolean) => void;
  /**
   * Плейсхолдер строки поиска.
   */
  searchPlaceholder?: string;
  /**
   * Флаг отображения лоадера.
   */
  isLoading?: boolean;
  /**
   * Флаг отображения пустого блока.
   */
  isShowEmpty?: boolean;
  /**
   * Текст для пустого блока.
   */
  emptyBlockText?: string;
  /**
   * Флаг отображения ошибки загрузки.
   */
  isShowReloadError?: boolean;
  /**
   * Текст для блока с ошибкой загрузки.
   */
  reloadErrorText?: string;
  /**
   * Текст для кнопки в блоке с ошибкой загрузки.
   */
  reloadErrorButtonLabel?: string;
  /**
   * Коллбэк для нажатия на кнопку внутри ошибки загрузки.
   */
  onReloadErrorClick?: () => void;
  /**
   * Список чипсов. Нужны для отображения выбранных опций.
   */
  chips?: ChipData[];
  /**
   * Обработчик удаления чипса.
   */
  onRemoveChip?: (value: string) => void;
  /**
   * Кнопки в выпадающем списке.
   */
  buttons?: OptionsListButtons;
  /**
   * Заголовок для адаптивной версии компонента.
   */
  adaptiveTitle?: string;
  /**
   * Высота адаптивной версии компонента.
   */
  adaptiveHeight?: string;
  /**
   * Флаг наличия виртуализации внутри компонента.
   * Рекомендуется при количестве элементов > 100.
   */
  withVirtualList?: boolean;
  /**
   * Пропсы для виртуального списка внутри компонента.
   */
  virtualListProps?: FixedSizeListProps;
  /**
   * Флаг наличия ленивой загрузки.
   */
  isLazyLoading?: boolean;
  /**
   * Обработчик появления в поле видимости последний опции.
   */
  onIntersectLastOption?: () => void;
  /**
   * Наличие сложных опций (внутри опций есть другие компоненты).
   */
  withComplexOptions?: boolean;
  /**
   * Обработчик поиска точного совпадения в списке опций.
   *
   * Если совпадение найдено, необходимо вернуть true.
   *
   * Если не найдено, соответственно, false.
   *
   * Пропс обязателен при withComplexOptions === true и withSearch === true.
   */
  onSearchExactMatch?: (searchValue: string, option: ReactElement) => boolean;
  /**
   * Текст для состояния, когда ничего не найдено.
   */
  notFoundText?: string;
  /**
   * Пропсы, которые необходимо передать в дропдаун.
   */
  dropdownProps?: DropdownProps;
}

export interface ButtonTextProps {
  $state: "filled" | "placeholder" | "disabled";
  isHiddenText: boolean;
}

type OptionsListButtons = {
  selectAll?: {
    onClick: () => void;
    text?: string;
  };
  clearAll?: {
    onClick: () => void;
    text?: string;
  };
  addValue?: {
    onClick: (value: string) => void;
    text?: string;
  };
};

export type ChipData = {
  value: string;
  label: string;
  isError?: boolean;
  isPermanent?: boolean;
};

```
