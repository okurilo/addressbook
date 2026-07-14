<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Select/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Select`
- Строк кода: 156
- Экспорты: `ButtonTextProps`, `SelectProps`, `Value`, `ValueO`
- Импорты: `csstype`, `react`, `react-window`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { Property } from "csstype";
import type { ReactElement, ReactNode } from "react";
import { FixedSizeListProps } from "react-window";

export type Value = string | number;

export type ValueO = { value: Value; label: Value };

// Если импортировать OptionProps из Option/types.ts, возникает циклическая зависимость,
// поэтому, пришлось оставить здесь локальную копию
interface OptionProps<ValueP extends Value = string> {
  value?: SelectProps<ValueP>["value"];
  children: ReactNode;
}

export interface SelectProps<ValueP extends Value = string> {
  /**
   * Дочерние компоненты-опции.
   */
  children:
    | ReactElement<OptionProps<ValueP>>
    | ReactElement<OptionProps<ValueP>>[];
  /**
   * Плейсхолдер.
   */
  placeholder?: string;
  /**
   * Текущее выбранное значение.
   */
  value?: ValueP | ValueO;
  /**
   * Обработчик изменения состояния.
   */
  onChange?: (value: ValueP, index: number) => void;
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
   * Максимальная высота выпадающего списка
   */
  optionsListMaxHeight?: Property.MaxHeight<number>;
  /**
   * Минимальная ширина компонента
   */
  minWidth?: string;
  /**
   * Флаг наличия строки поиска.
   */
  withSearch?: boolean;
  /**
   * Плейсхолдер строки поиска.
   */
  searchPlaceholder?: string;
  /**
   * Текущее значение строки поиска.
   * Если задано значение searchValue, необходимо также передать в пропсы onSearchChange и onFilter.
   */
  searchValue?: string;
  /**
   * Обработчик изменения состояния строки поиска.
   */
  onSearchChange?: (value: string) => void;
  /**
   * Обработчик фильтрации списка опций.
   * Если опцию нужно отрендерить, необходимо вернуть true.
   * Если не нужно, соответственно, false.
   */
  onFilter?: (
    child: ReactNode,
    value: Value | ValueO | undefined | null
  ) => boolean;
  /**
   * Заголовок для мобильной версии
   */
  mobileTitle?: string;
  /**
   * Кнопки для мобильной версии
   */
  mobileButtons?: ReactNode;
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
   * Флаг отображения лоадера.
   */
  isLoading?: boolean;
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
   * Показывать кнопку "Очистить"
   */
  hasClearButton?: boolean;
  /**
   * Обработчик нажатия на кнопку "Очистить"
   */
  onClearButtonClick?: () => void;
  /**
   * Текст, отображающий отсутствие найденных значений.
   */
  notFoundText?: string;
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
}

export interface ButtonTextProps {
  $state: "filled" | "placeholder" | "disabled";
  isHiddenText: boolean;
}

```
