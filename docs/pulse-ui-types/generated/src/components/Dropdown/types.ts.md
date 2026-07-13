<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Dropdown/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Dropdown`
- Строк кода: 165
- Экспорты: `ActionButtonProps`, `BaseDropdownProps`, `DefaultDropdownProps`, `DropdownProps`, `DropdownWithPaddingAndSearchProps`, `DropdownWithPaddingProps`, `DropdownWithSearchProps`, `VirtualListOptions`
- Импорты: `../../utils/floating-ui/types`, `../Button`, `../CellButton`, `../Search`, `@floating-ui/react`, `react`, `react-window`
- Зависимости внутри выгрузки: [`src/components/Button/types.ts`](<../Button/types.ts.md>), [`src/components/CellButton/types.ts`](<../CellButton/types.ts.md>), [`src/components/Search/types.ts`](<../Search/types.ts.md>), [`src/utils/floating-ui/types.ts`](<../../utils/floating-ui/types.ts.md>)

## Исходная типизация

```typescript
import type {
  ComponentType,
  CSSProperties,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import {
  FixedSizeListProps,
  ListChildComponentProps,
  ListOnItemsRenderedProps,
} from "react-window";
import { Middleware } from "@floating-ui/react";
import { SearchProps } from "../Search";
import { CellButtonProps } from "../CellButton";
import { ButtonProps } from "../Button";
import type { FloatingProps } from "../../utils/floating-ui/types";

export type ActionButtonProps = Omit<CellButtonProps, "size | type"> &
  HTMLAttributes<HTMLButtonElement>;
type GroupedButtonProps = Omit<ButtonProps, "size | type"> &
  HTMLAttributes<HTMLButtonElement>;
export type VirtualListOptions = {
  height: string | number;
  itemCount: number;
  itemSize: number;
  children: ComponentType<ListChildComponentProps<unknown>>;
  style?: CSSProperties;
  onItemsRendered?: (props: ListOnItemsRenderedProps) => unknown;
  restProps?: FixedSizeListProps<unknown>;
};

export interface BaseDropdownProps {
  /**
   * Элемент триггера.
   */
  trigger: ReactElement;
  /**
   * Выравнивание.
   * @default start
   */
  align?: "start" | "end";
  /**
   * Направление.
   * @default bottom
   */
  direction?: "bottom" | "top";
  /**
   * Список применяемых (модификаторов)[https://floating-ui.com/docs/middleware]
   */
  middleware?: Middleware[];
  /**
   * Заголовок для мобильной версии.
   */
  mobileTitle?: string;
  /**
   * Кнопки для мобильной версии.
   */
  mobileButtons?: ReactNode;
  /**
   * Высота мобильной версии.
   */
  mobileHeight?: string;
  /**
   * Текущее состояние (открыт / закрыт).
   * @default false
   */
  isOpen: boolean;
  /**
   * Обработчик изменения состояния.
   */
  onChange: (isOpen: boolean) => void;
  /**
   * Максимальная высота Dropdown`а.
   */
  maxHeight?: number | string;
  /**
   * Если true, то ширина Dropdown будет равна ширине триггера.
   */
  sameWidth?: boolean;
  /**
   * Props для компонента Search в Dropdown.
   */
  searchProps?: SearchProps;
  /**
   * Если true, то показывается Search в Dropdown.
   */
  isSearchShown?: boolean;
  /**
   * Текст, который показывается, если поиск не дал результатов.
   */
  searchNoResultsText?: string;
  /**
   * Текст, который показывается, если поиск не дал результатов и поле ввода пустое.
   */
  searchEmptyText?: string;
  /**
   * Кнопки действий внизу Dropdown.
   * Только для Dropdown без отступов.
   */
  actionButtons?: ActionButtonProps[];
  /**
   * Если true, то будет выведен вариант Dropdown с отступами 8px 16px.
   */
  withPadding?: boolean;
  /**
   * Кнопки apply и cancel.
   * Только для Dropdown с отступами.
   */
  buttonsGroup?: {
    applyButton: GroupedButtonProps;
    cancelButton: GroupedButtonProps;
  };
  /**
   * Позиционирование Floating.
   */
  strategy?: FloatingProps["strategy"];
  /**
   * Настройки виртуального списка.
   */
  virtualListOptions?: VirtualListOptions;
  /**
   * Фиксированная ширина Dropdown.
   *
   * Если не указана, то ширина будет подстраиваться под контент или зависеть от ширины тригера при sameWidth = true.
   *
   * Ширина не может быть меньше 72.
   * Ширина не может быть больше 662 для Dropdown с withPadding = true.
   */
  fixedWidth?: number;
}

export interface DefaultDropdownProps extends BaseDropdownProps {
  withPadding?: never;
  buttonsGroup?: never;
  searchProps?: never;
  isSearchShown?: never;
  searchNoResultsText?: never;
  searchEmptyText?: never;
}

export interface DropdownWithSearchProps extends BaseDropdownProps {
  withPadding?: never;
  buttonsGroup?: never;
}

export interface DropdownWithPaddingProps extends BaseDropdownProps {
  withPadding: true;
  actionButtons?: never;
  searchProps?: never;
  isSearchShown?: never;
  searchNoResultsText?: never;
  searchEmptyText?: never;
}

export interface DropdownWithPaddingAndSearchProps extends BaseDropdownProps {
  withPadding: true;
  actionButtons?: never;
}

export type DropdownProps =
  | DefaultDropdownProps
  | DropdownWithSearchProps
  | DropdownWithPaddingProps
  | DropdownWithPaddingAndSearchProps;

```
