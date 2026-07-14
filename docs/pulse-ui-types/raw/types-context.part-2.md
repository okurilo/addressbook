# Context Snapshot for src
Generated: 2026-07-13T16:51:15.757Z
Total files: 264

---

### FILE: src/components/ModalNew/types.ts
```typescript
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import type { BreadcrumbsProps } from "../BreadcrumbsDynamic/types";
import type { Type as ButtonType } from "../Button/types";
import type { TagColor } from "../Tags/Tag/types";

export type ModalSize = "m" | "l";
export type ModalType = "default" | "fullscreen" | "alert";
export type DeviceType = "desktop" | "tablet" | "mobile";
export type ModalTagProps = {
  label: ReactNode;
  color?: TagColor;
};

export type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

export interface Button {
  /**
   * Текст кнопки
   */
  label: string;
  /**
   * Действие при нажатии.
   */
  onClick?: () => void;
  /**
   *  Флаг наличия логики закрытия модалки в кнопке.
   */
  isClose?: boolean;
  /**
   * Можно выбрать вид для кнопки из доступных.
   */
  type?: ButtonType;
  /**
   * Состояние для асинхронных операций.
   */
  isLoading?: boolean;
  /**
   * @deprecated
   * Кнопка переходя в состояние isLoading становится disabled.
   * Позволяет управлять состоянием disabled кнопки при ассинхронных операциях.
   *  @default true
   */
  isDisabledWhenLoading?: boolean;
  /**
   * @deprecated
   * Вместо компонента Loader используем состояние компонента Buttton.
   * Элемент для асинхронных операций.
   */
  loader?: ReactElement;
  /**
   *  Дополнительные атрибуты для кнопки.
   */
  attributes?: ButtonAttributes;
  /**
   *  Текст для поповера, когда кнопка задезейблена.
   *  Если передать строку по умолчанию используется стиль body2Regular
   */
  disabledText?: ReactNode;
  /**
   *  Текст атрибута aria-description.
   *  Если передана строка в disabledText, то aria-description будет равна disabledText
   */
  ariaDescription?: string;
}

export interface ActionsItem {
  /**
   * Текст ссылки.
   */
  label: string;
  /**
   * Адрес ссылки.
   */
  url?: string;
  /**
   * Действие при нажатии.
   */
  onAction?: () => void;
  /**
   * Заблокировать нажатие.
   */
  isDisabled?: boolean;
  /**
   *  Текст для поповера, когда элемент задезейблен.
   *  Если передать строку по умолчанию используется стиль body2Regular
   */
  disabledText?: ReactNode;
  /**
   *  Текст атрибута aria-description.
   *  Если передана строка в disabledText, то aria-description будет равна disabledText
   */
  ariaDescription?: string;
  icon?: ReactNode;
}

export interface ModalProps {
  /**
   * Заголовок.
   */
  title: string;
  /**
   * Тестовый id для заголовка.
   */
  titleTestId?: string;
  /**
   * Коллбэк при закрытии окна.
   */
  onClose: () => void;
  /**
   * Тип модального окна.
   * @default default
   */
  type?: ModalType;
  /**
   * Размер дефолтного модального окна.
   * @default l
   */
  defaultModalSize?: ModalSize;
  /**
   * Описание.
   */
  description?: string;
  /**
   * Тестовый id для описания.
   */
  descriptionTestId?: string;
  /**
   * Хлебные крошки.
   */
  breadcrumbs?: BreadcrumbsProps;
  /**
   * Тег или массив тегов.
   */
  tag?: ModalTagProps | ModalTagProps[];
  /**
   * Дополнительные действия (контекстное меню).
   */
  actionsMenu?: ActionsItem[];
  /**
   * Добавление кнопок в футер.
   */
  buttons?: {
    /**
     * Кнопка подтвердить
     */
    apply?: Button;
    /**
     * Тестовый id для кнопки подтвердить.
     */
    applyTestId?: string;
    /**
     * Кнопка отменить
     */
    cancel?: Button;
    /**
     * Тестовый id для кнопки отменить.
     */
    cancelTestId?: string;
    /**
     * Дополнительная кнопка
     */
    tertiary?: Button;
    /**
     * Тестовый id для дополнительной кнопки.
     */
    tertiaryTestId?: string;
  };
  /**
   * Отображение прогресса по шагам.
   */
  steps?: { current: number; all: number };
  /**
   * Разрешить закрытие окна при клике на оверлей.
   *  @default true
   */
  isClosableOverlay?: boolean;
  /**
   * Затемнять фон окна.
   * @default true
   */
  isTransparentOverlay?: boolean;
  /**
   * Разрешить закрыть окно клавишей Escape.
   * @default true
   */
  isCloseByEsc?: boolean;
  /**
   * Добавить html-класс контейнеру.
   */
  wrapClassName?: string;
  /**
   * Флаг активности/неактивности кнопки Actions.
   */
  isDisabledActions?: boolean;
  /**
   * Кастомный заголовок модального окна, если передан - заменяет оригинальный.
   */
  header?: ReactNode;
  /**
   * Флаг наличия/отсутствия разделителей в Body модалки.
   */
  hasDividers?: boolean;
  /**
   * Идентификатор для систем автоматизированного тестирования.
   */
  dataTestId?: string;
  /**
   * Идентификатор заголовка для систем автоматизированного тестирования.
   */
  titleDataTestId?: string;
  /**
   * Должен быть true, если закрытие модального окна вызовет окно подтверждения закрытия.
   */
  needConfirm?: boolean;
  /**
   * Данный props предназначен только для использования в конструкторе.
   */
  isConstructor?: boolean;
  /**
   * Счетчика в заголовке.
   */
  counter?: number;
  /**
   * Коллбэк клика на иконку глаза в заголовке модалки.
   */
  onTitleIconClick?: (isIconOpen: boolean) => void;
  /**
   * Контент мобального окна содержит PDFViewer.
   */
  pdfContent?: boolean;
}

```

### FILE: src/components/Multiselect/ChipsList/types.ts
```typescript
import { ChipData } from "../types";

export type ChipsListProps = {
  chips: ChipData[];
  onRemove?: (value: string) => void;
  maxWidth: number;
};

```

### FILE: src/components/Multiselect/Option/types.ts
```typescript
import type { FC, ReactNode } from "react";

import type { Value } from "../types";

export interface OptionProps<ValueP extends Value = string> {
  value?: ValueP;
  children: ReactNode;
  disabled?: boolean;
  selected?: boolean;
  isError?: boolean;
  errorText?: string;
}

export type OptionPropsGeneric<ValueP extends Value = string> = FC<
  OptionProps<ValueP>
>;

export interface InternalOptionProps {
  onClick?: () => void;
  minWidth?: string;
}

```

### FILE: src/components/Multiselect/OptionsList/types.ts
```typescript
import { ReactElement } from "react";
import { OptionProps } from "../Option";
import { InternalOptionProps } from "../Option/types";
import { SelectProps, Value } from "../types";

type Children<ValueP extends Value> = ReactElement<
  OptionProps<ValueP> & InternalOptionProps
>;
export interface OptionsListProps<ValueP extends Value> {
  children: Children<ValueP> | Children<ValueP>[];
  maxHeight?: SelectProps["optionsListMaxHeight"];
  withSearch?: SelectProps["withSearch"];
  searchValue?: SelectProps["searchValue"];
  onSearchChange?: SelectProps["onSearchChange"];
  onFilter?: SelectProps["onFilter"];
  onSelectOption: SelectProps["onSelectOption"];
  searchPlaceholder?: SelectProps["searchPlaceholder"];
  isLoading?: SelectProps["isLoading"];
  isShowEmpty?: SelectProps["isShowEmpty"];
  emptyBlockText?: SelectProps["emptyBlockText"];
  isShowReloadError?: SelectProps["isShowReloadError"];
  reloadErrorText?: SelectProps["reloadErrorText"];
  reloadErrorButtonLabel?: SelectProps["reloadErrorButtonLabel"];
  onReloadErrorClick?: SelectProps["onReloadErrorClick"];
  buttons?: SelectProps["buttons"];
  isAdaptive?: boolean;
  withVirtualList?: SelectProps["withVirtualList"];
  virtualListProps?: SelectProps["virtualListProps"];
  isLazyLoading?: SelectProps["isLazyLoading"];
  onIntersectLastOption?: SelectProps["onIntersectLastOption"];
  withComplexOptions?: SelectProps["withComplexOptions"];
  onSearchExactMatch?: SelectProps["onSearchExactMatch"];
}

```

### FILE: src/components/Multiselect/types.ts
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

### FILE: src/components/Notification/types.ts
```typescript
import { ReactNode } from "react";

export type Type = "info" | "attention" | "warning";

export interface Internationalization {
  expand: {
    unwrap: string;
    wrap: string;
  };
}

export interface NotificationProps {
  /**
   * Тип отображения компонента.
   * @default info
   */
  $type?: Type;
  /**
   * Кнопка для перехода.
   * CellButton/Link.
   */
  linkElement?: ReactNode;
  /**
   * Интернациолизация кнопки "скрыть/раскрыть"
   */
  internationalization?: Internationalization;
  /**
   * Идентификатор для систем автоматизированного тестирования.
   */
  dataTestId?: string;
  /**
   * Настраиваемая ширина компонента.
   * @default "auto"
   */
  $width?: number | string;
  /**
   * Обработчик закрытия компонента.
   */
  onClose?: () => void;
}

```

### FILE: src/components/Pagination/Navigation/Item/types.ts
```typescript
import type { DefaultTheme, StyledComponentProps } from "styled-components";

export interface ItemStyledProps {
  /** @default false */
  $isActive?: boolean;
}

export type ItemProps = StyledComponentProps<
  "button",
  DefaultTheme,
  Pick<ItemStyledProps, "$isActive">,
  never
>;

```

### FILE: src/components/Pagination/Navigation/List/types.ts
```typescript
import { NavigationCountProps } from "../types";

export interface ListItemsProps {
  onForward: (
    nextActiveIdx: number,
    firstIdxOnPage?: number,
    lastIdxOnPage?: number
  ) => void;
  onBackward: (
    nextActiveIdx: number,
    firstIdxOnPage?: number,
    lastIdxOnPage?: number
  ) => void;
  itemsOnPage: NavigationCountProps["$itemsOnPage"];
}

export interface ListCountProps {
  currentPage: number;
  totalPages: number;
  onChange: NavigationCountProps["$onChange"];
  itemsOnPage: NavigationCountProps["$itemsOnPage"];
}

```

### FILE: src/components/Pagination/Navigation/Select/types.ts
```typescript
import { NavigationCountProps } from "../types";

export interface SelectProps {
  value: string;
  onSelectChange: NavigationCountProps["$onSelectChange"];
  selectOptions: NonNullable<NavigationCountProps["$navigationSelectOptions"]>;
  selectText: string | undefined;
}

```

### FILE: src/components/Pagination/Navigation/types.ts
```typescript
export interface Option {
  value: string;
  label: string;
}

export interface NavigationProps {
  /**
   * Функция, срабатывающая при переходе на другую страницу (вперед).
   */
  $onForward?: (
    nextActiveIdx: number,
    firstIdxOnPage?: number,
    lastIdxOnPage?: number
  ) => void;
  /**
   * Функция, срабатывающая при переходе на другую страницу (назад).
   */
  $onBackward?: (
    nextActiveIdx: number,
    firstIdxOnPage?: number,
    lastIdxOnPage?: number
  ) => void;
  /**
   * Количество элементов на одной странице.
   * Параметр обязательный, если используется селект с выбором количества элементов на странице.
   */
  $itemsOnPage?: number;
  /**
   * Функция, срабатывающая при изменении количества элементов на странице.
   * Параметр обязательный, если используется селект с выбором количества элементов на странице.
   */
  $onSelectChange?: (itemsCount: number) => void;
  /**
   * Список опций числа элементов на странице.
   * Параметр обязательный, если используется селект с выбором количества элементов на странице.
   */
  $navigationSelectOptions?: Option[];
  /**
   * Текст в селекте.
   */
  $navigationSelectText?: string;
  /**
   * Показать/скрыть селект с выбором количества элементов на странице.
   * В мобильной версии селект должен быть всегда скрыт.
   */
  $isShowNavigationSelect?: boolean;
}

export interface NavigationCountProps {
  /**
   * Текущая открытая страница.
   */
  $currentPage?: number;
  /**
   * Общее количество страниц.
   */
  $totalPages: number;
  /**
   * Количество элементов на одной странице.
   * Параметр обязательный, если используется селект с выбором количества элементов на странице.
   */
  $itemsOnPage?: number;
  /**
   * Показать/скрыть селект с выбором количества элементов на странице.
   * В мобильной версии селект должен быть всегда скрыт.
   */
  $isShowNavigationSelect?: boolean;
  /**
   * Список опций числа элементов на странице.
   * Параметр обязательный, если используется селект с выбором количества элементов на странице.
   */
  $navigationSelectOptions?: Option[];
  /**
   * Текст в селекте.
   */
  $navigationSelectText?: string;
  /**
   * Функция, срабатывающая при переходе на другую страницу.
   */
  $onChange: (
    newCurrentPage: number,
    firstIdxOnPage?: number,
    lastIdxOnPage?: number
  ) => void;
  /**
   * Функция, срабатывающая при изменении количества элементов на странице.
   * Параметр обязательный, если используется селект с выбором количества элементов на странице.
   */
  $onSelectChange?: (itemsCount: number) => void;
}

```

### FILE: src/components/PDFViewer/Toc/types.ts
```typescript
export type OutlineItem = {
  title: string;
  pageNumber?: number;
  items: OutlineItem[];
};

export type TocProps = {
  outline: OutlineItem[];
  onItemClick: (pageNumber: number) => void;
};

```

### FILE: src/components/PDFViewer/types.ts
```typescript
import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import React from "react";

export type ZoomPreset =
  | "auto"
  | "actual"
  | "fit-height"
  | "fit-width"
  | 50
  | 75
  | 100
  | 125
  | 150
  | 200
  | 300
  | 400;

export type ZoomValue = ZoomPreset;

export interface ToolbarProps {
  currentPage: number;
  totalPages: number;
  zoom: ZoomValue;
  isSidebarOpen: boolean;
  onPageChange: (page: number) => void;
  onZoomChange: (zoom: ZoomValue) => void;
  onToggleSidebar: () => void;
  onPrint: () => void;
  isPrintButtonVisible: boolean;
  onDownload: () => void;
  isDownLoadButtonVisible: boolean;
  inFloatingModal: boolean | undefined;
  internalisation: Partial<Pick<InternalisationProps, "toolbar">> | undefined;
  onRotate: () => void;
}

export interface SidebarProps {
  isOpen: boolean;
  totalPages: number;
  currentPage: number;
  thumbnails: (string | null)[];
  onPageSelect: (page: number) => void;
  onClose: () => void;
  outlines: Outline[] | null;
}

export interface UsePDFViewerOptions {
  source: string | ArrayBuffer;
  rotationIndex: number;
  initialPage?: number;
  initialZoom?: ZoomValue;
  onUserClickDownload?: () => void;
  onUserClickPrint?: () => void;
}

export interface UsePDFViewerReturn {
  pdfDocument: PDFDocumentProxy | null;
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  goToPrev: () => void;
  goToNext: () => void;
  zoom: ZoomValue;
  setZoom: (zoom: ZoomValue) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  thumbnails: (string | null)[];
  pageCanvasRefs: React.RefObject<(HTMLCanvasElement | null)[]>;
  pageTextLayerRefs: React.RefObject<(HTMLDivElement | null)[]>;
  viewerContainerRef: React.RefObject<HTMLDivElement>;
  scrollToPage: (page: number) => void;
  print: () => void;
  download: () => void;
  outlines: Outline[] | null;
}

export interface InternalisationProps {
  toolbar: {
    sidebarToggleAriaLabel: { open: string; close: string };
    nextPageButtonAriaLabel: string;
    prevPageButtonAriaLabel: string;
    inputPageNumberAriaLabel: string;
    printButtonAriaLabel: string;
    downloadButtonAriaLabel: string;
    textOfPagesCount: string;
    zoomInAriaLabel: string;
    zoomOutAriaLabel: string;
    zoomOptions: Record<ZoomPreset, string>;
    rotation: string;
  };
  error: {
    title: string;
    description: string;
  };
  pageTranslation: string;
  pageFromTranslation: string;
}

export interface PDFViewerProps {
  source: string | ArrayBuffer;
  className?: string;
  inFloatingModal?: boolean;
  internalisation?: InternalisationProps;
  onUserClickPrint?: () => void;
  hidePrintButton?: boolean;
  onUserClickDownload?: () => void;
  hideDownloadButton?: boolean;
}

export type { PDFDocumentProxy, PDFPageProxy };

export type Outline = {
  title: string;
  bold: boolean;
  italic: boolean;
  color: Uint8ClampedArray<ArrayBufferLike>;
  dest: string | Array<unknown> | null;
  url: string | null;
  unsafeUrl: string | undefined;
  newWindow: boolean | undefined;
  count: number | undefined;
  items: Array<unknown>;
  pageNumber?: number;
};

```

### FILE: src/components/Popover/types.ts
```typescript
import type { CSSProperties, ReactElement, ReactNode } from "react";
import { FloatingProps } from "../../utils/floating-ui/types";

export interface PopoverProps {
  /**
   * Элемент триггера.
   */
  trigger: ReactElement;
  /**
   * Текущее состояние (открыт / закрыт).
   * @default false
   */
  isOpen?: boolean;
  /**
   * Обработчик изменения состояния.
   */
  onChange?: (isOpen: boolean) => void;
  /**
   * Позиция содержимого:
   * - absolute контент рендерится следующей нодой от триггера
   * - fixed контент рендерится в портале в body, полезно, когда на верхних уровнях триггера имеется элемент с overflow: hidden.
   * @default absolute
   */
  position?: FloatingProps["strategy"];
  /**
   * Базовое расположение контента.
   * @default bottom-start
   */
  placement?: FloatingProps["placement"];
  /**
   * Список возможных расположений в порядке приоритета, будет выбран первый полностью подходящий (где хватает места).
   */
  fallbackPlacements?: Array<Exclude<FloatingProps["placement"], undefined>>;
  /**
   * Свойство - обертка для указания отступа между триггером и контентом.
   * unit - px
   * @default 4
   */
  gutter?: number;
  /**
   * Изменение типа взаимодействия с триггером
   * @default ['click','dismiss']
   */
  interactionType?: FloatingProps["interactionType"];
  /**
   * Список применяемых (модификаторов)[https://floating-ui.com/docs/middleware]
   */
  middleware?: FloatingProps["middleware"];
  /**
   * Флаг заблокированного состояния.
   */
  disabled?: boolean;
  arrowComponent?: ReactElement;
  /**
   * Заголовок для Header в BottomSheet в мобильной версии.
   */
  mobileTitle?: string;
  /**
   * Кнопки для Footer в BottomSheet в мобильной версии.
   */
  mobileButtons?: ReactNode;
}

export interface PopoverContextProps {
  setTrigger?: (el: HTMLDivElement) => void;
  setContent?: (el: HTMLDivElement) => void;
  trigger?: HTMLDivElement;
  content?: HTMLDivElement;
  styles: { [key: string]: CSSProperties };
  attributes: { [key: string]: { [key: string]: string } | undefined };
  isOpen?: boolean;
  position?: FloatingProps["strategy"];
  handleSetOpen?: (open: boolean) => void;
}

export interface PopoverOutsideClickProps {
  ignoredElements?: HTMLElement[];
  onClick: () => void;
}

export interface PopoverContentProps {
  children?: ReactNode;
}

```

### FILE: src/components/PushNotifications/Item/types.ts
```typescript
import { ReactElement } from "react";

export interface ItemProps {
  $closeButton?: ReactElement;
  $actionButton?: ReactElement;
}

```

### FILE: src/components/PushNotifications/types.ts
```typescript
import { TransitionStatus } from "react-transition-group";

export interface PushNotificationsProps {
  /**
   * Флаг видимости.
   * Переключает состояние с плавной fade-анимацией.
   * @default true
   */
  $visible?: boolean;
}

export interface ContainerProps {
  state?: TransitionStatus;
}

```

### FILE: src/components/Radio/types.ts
```typescript
import type { InputHTMLAttributes } from "react";

export type State = "active" | "disabled" | "hover" | "focus" | "pressed";

export type VerticalAlign = "top" | "center";

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Состояние.
   */
  $state?: State;
  /**
   * Описание под лейблом.
   */
  description?: string;
  /**
   * Текст подсказки.
   */
  info?: string;
  /**
   * Вертикальное выравнивание. По умолчанию "center".
   */
  verticalAlign?: VerticalAlign;
}

```

### FILE: src/components/RadioGroup/types.ts
```typescript
import { ReactNode } from "react";

export interface RadioGroupProps {
  /**
   * Дочерние радио-кнопки.
   */
  children: ReactNode | ReactNode[];
  /**
   * Заголовок.
   */
  title?: string;
}

```

### FILE: src/components/Range/Marks/types.ts
```typescript
import { ReactNode } from "react";

export interface Mark {
  label: ReactNode | string;
  description?: ReactNode | string;
}

export interface MarksComponentProps {
  list?: Mark[];
}

```

### FILE: src/components/Range/types.ts
```typescript
import { ReactNode } from "react";
import type { DefaultTheme, StyledComponentProps } from "styled-components";
import * as c from "./constants";

import { Mark } from "./Marks/types";

export type ColorVars =
  | typeof c.DEFAULT
  | typeof c.PRIMARY
  | typeof c.SECONDARY;
export type Tuple<T> = [T, T];

export interface RangeSliderProps {
  /**
   * Цвет.
   * @default "default"
   */
  $color?: ColorVars;
  /**
   * Флаг заблокированного состояния.
   * @default false
   */
  $disabled?: boolean;
  title?: ReactNode | string;
  progressView?: ReactNode | string;
  marks?: Mark[];
  /**
   * Минимальное значение.
   * @default 0
   */
  min?: number;
  /**
   * Максимальное значение.
   * @default 100
   */
  max?: number;
  /**
   * Шаг.
   * @default 1
   */
  step?: number;
}

export interface SingleRangeSliderProps extends RangeSliderProps {
  value: number;
  onChange?(value: number): void;
}

export interface MultiRangeSlideProps extends RangeSliderProps {
  value: Tuple<number>;
  onChange?(value: Tuple<number>): void;
}

export interface ProgressProps
  extends StyledComponentProps<
    "div",
    DefaultTheme,
    Record<string, unknown>,
    never
  > {
  $disabled?: boolean;
  $state?: string;
  $color?: ColorVars | string;
}

export type Thumb = "left" | "right" | null;

export type RangeZIndexes = {
  leftIndex: number;
  rightIndex: number;
};

export type GetRangeZIndexesArgs = {
  baseZIndex: number;
  activeThumb: Thumb;
  start: number;
  end: number;
  min: number;
  max: number;
};

```

### FILE: src/components/Rating/Star/types.ts
```typescript
export interface StarProps extends Record<string, unknown> {
  $isActive?: boolean;
  onChange: () => void;
}

export interface StarStyledProps {
  $isActive: StarProps["$isActive"];
}

```

### FILE: src/components/Rating/types.ts
```typescript
export interface RatingProps {
  /**
   * Оценка от 1 до 5
   * @default 0
   */
  $rate?: number;
  $onChange?: (rate: number) => void;
}

```

### FILE: src/components/Scrollbar/types.ts
```typescript
import type { DefaultTheme } from "styled-components";

export interface ScrollbarProps {
  theme: DefaultTheme;
  /**
   * Текущая платформа.
   */
  platform?: "win";
}

```

### FILE: src/components/Search/types.ts
```typescript
import { ChangeEventHandler, InputHTMLAttributes } from "react";

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  name?: string;
  value: string;
  /**
   * Колбэк для обновления value.
   */
  onChange: ChangeEventHandler<HTMLInputElement>;
  /**
   * Текст плейсхолдера.
   * @default "поиск"
   */
  placeholder?: string;
}

```

### FILE: src/components/SearchFullscreen/ChipsInput/ChipsList/types.ts
```typescript
import { ChipData } from "../../types";

export type ChipsListProps = {
  /**
   * Массив чипсов
   */
  chips: ChipData[];
  /**
   * Коллбэк удаления чипса
   */
  $onRemove?: (value: string) => void;
  /**
   * Максимальная ширина списка чипсов
   */
  maxWidth: number;
  /**
   * Показывать скелетоны загрузки вместо чипсов
   */
  showSkeletons?: boolean;
};

```

### FILE: src/components/SearchFullscreen/ChipsInput/types.ts
```typescript
import { InputHTMLAttributes } from "react";
import { ChipData } from "../types";

export interface ChipsInputProps {
  /**
   * Массив чипсов
   */
  $chips: ChipData[];
  /**
   * Пропсы для инпута
   */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  /**
   * Коллбэк удаления чипса
   */
  $onRemove?: (value: string) => void;
  /**
   * Максимальная ширина списка чипсов
   */
  chipsListMaxWidth: number | undefined;
  /**
   * Показывать скелетоны загрузки вместо чипсов
   */
  showSkeletons?: boolean;
}

```

### FILE: src/components/SearchFullscreen/SearchButtonDropdown/types.ts
```typescript
import { Size } from "../../Button/types";
import { DropdownItem } from "../types";

export interface SearchButtonDropdownProps {
  defaultText?: string;
  items: DropdownItem[];
  selectedItem?: string;
  onSelectedItem?: (id: string) => void;
  fixedWidth?: number;
}

export type ActionsSize = Exclude<Size, "xs" | "s" | "m-alt">;

```

### FILE: src/components/SearchFullscreen/SearchButtonPopover/types.ts
```typescript
import { Size } from "../../Button/types";
import { Item } from "../types";

export interface ActionsProps {
  /**
   * Текст на кнопке
   */
  text?: string;
  /**
   * Коллбэк при клике на кнопку
   */
  onClick?: () => void;
  /**
   * Опции выпадающего списка
   */
  items?: Item[];
  /**
   * ID опции, выбранной по умолчанию в выпадающем списке
   */
  defaultSelectedId?: string;
}

export type ActionsSize = Exclude<Size, "xs" | "s" | "m-alt">;

```

### FILE: src/components/SearchFullscreen/types.ts
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

### FILE: src/components/Section/types.ts
```typescript
import { MouseEventHandler, ReactNode } from "react";

export type Size = "s" | "m" | "l" | "xl";

export interface SectionProps {
  /**
   * Размер компонента.
   * @default "m"
   */
  size: Size;
  /**
   * Заголовок.
   */
  title: string;
  /**
   * Подзаголовок.
   */
  subtitle?: string;
  /**
   * Счетчик.
   */
  counter?: number;
  /**
   * Контент для Popover с подсказкой.
   */
  info?: ReactNode;
  /**
   * Состояние развернутости.
   */
  isExpanded?: boolean;
  /**
   * Обработчик изменения состояния развернутости.
   */
  onExpandedChange?: () => void;
  disabled?: boolean;
  /**
   * Ставит ограничение высоты контента в 400px.
   * @default true
   */
  haveHeightLimit?: boolean;
  /**
   * Обработчик клика по кнопке "Добавить".
   */
  addButtonHandler?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Обработчик клика по кнопке "Редактировать".
   */
  editButtonHandler?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Контент для дополнительных действий.
   * Необходимо передавать Items обернутых Menu из компонента ActionsSheet/Menu.
   */
  moreActionsContent?: ReactNode;
  /**
   * Контент для действий в мобильной версии.
   * Необходимо передавать Items обернутых Menu из компонента ActionsSheet/Menu.
   */
  mobileActions?: ReactNode;
}

```

### FILE: src/components/Select/Option/types.ts
```typescript
import type { FC, ReactElement, ReactNode } from "react";

import type { SelectProps, Value } from "../types";

export interface OptionProps<ValueP extends Value = string> {
  value?: SelectProps<ValueP>["value"];
  children: ReactNode;
  disabled?: boolean;
  isError?: boolean;
  errorText?: string;
  isNodeOption?: boolean;
}

export type OptionPropsGeneric<ValueP extends Value = string> = FC<
  OptionProps<ValueP>
>;

export interface InternalOptionProps {
  selected?: boolean;
  onClick?: () => void;
  minWidth?: string;
  checkbox?: boolean;
  description?: string;
  isSkeletonOption?: boolean;
  customSkeleton?: ReactElement;
}

```

### FILE: src/components/Select/OptionsList/types.ts
```typescript
import { ReactElement } from "react";
import { OptionProps } from "../Option";
import { InternalOptionProps } from "../Option/types";
import { SelectProps, Value } from "../types";

type Children<ValueP extends Value> = ReactElement<
  OptionProps<ValueP> & InternalOptionProps
>;
type OptionsListButtons = {
  clearAll?: {
    text?: string;
  };
};

export interface OptionsListProps<ValueP extends Value> {
  value: SelectProps<ValueP>["value"];
  onChange: SelectProps<ValueP>["onChange"];
  setIsOpened: (isOpened: boolean) => void;
  children: Children<ValueP> | Children<ValueP>[];
  maxHeight?: SelectProps["optionsListMaxHeight"];
  withSearch?: SelectProps["withSearch"];
  searchPlaceholder?: SelectProps["searchPlaceholder"];
  searchValue?: SelectProps["searchValue"];
  onSearchChange?: SelectProps["onSearchChange"];
  onFilter?: SelectProps["onFilter"];
  isShowEmpty?: SelectProps["isShowEmpty"];
  emptyBlockText?: SelectProps["emptyBlockText"];
  isShowReloadError?: SelectProps["isShowReloadError"];
  reloadErrorText?: SelectProps["reloadErrorText"];
  reloadErrorButtonLabel?: SelectProps["reloadErrorButtonLabel"];
  onReloadErrorClick?: SelectProps["onReloadErrorClick"];
  isLoading?: SelectProps["isLoading"];
  withVirtualList?: SelectProps["withVirtualList"];
  virtualListProps?: SelectProps["virtualListProps"];
  buttons?: OptionsListButtons;
  hasClearButton?: boolean;
  onClearButtonClick?: () => void;
  notFoundText?: SelectProps["notFoundText"];
  isLazyLoading?: SelectProps["isLazyLoading"];
  onIntersectLastOption?: SelectProps["onIntersectLastOption"];
  withComplexOptions?: SelectProps["withComplexOptions"];
}

```

### FILE: src/components/Select/types.ts
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

### FILE: src/components/Skeleton/types.ts
```typescript
import { LayoutProps, SpaceProps, ColorProps } from "styled-system";
import type { DefaultTheme } from "styled-components";

export interface SkeletonProps extends LayoutProps, SpaceProps, ColorProps {}

export type SkeletonRectProps = SkeletonProps;
export type SkeletonCircleProps = SkeletonProps;

type TypographyVariant = keyof DefaultTheme["typography"];

export interface SkeletonTextProps extends SkeletonProps {
  /**
   * Высота первой строки
   */
  firstLineHeight?: TypographyVariant;
  /**
   * Высота строки
   */
  lineHeight?: TypographyVariant;
  /**
   * Количество повторений
   */
  lines?: number;
}

```

### FILE: src/components/Snackbar/Content/types.ts
```typescript
export interface ContentProps {
  /**
   * Компактный режим с текстом и действием в одну строку
   *
   * @default false
   */
  compact?: boolean;
}

```

### FILE: src/components/SplitView/InternalUnit/types.ts
```typescript
import { RefObject } from "react";
import { SplitViewProps } from "../types";

export interface InternalUnitProps
  extends Omit<
    SplitViewProps,
    "defaultWidth" | "minWidth" | "keepContentMounted"
  > {
  isResizing: boolean;
  handleResizeRef: RefObject<HTMLDivElement>;
  toggleSplitViewWidth: () => void;
}

```

### FILE: src/components/SplitView/types.ts
```typescript
import { PropsWithChildren } from "react";

export interface SplitViewProps {
  /**
   * Ссылка для открытия в новой вкладке.
   */
  url: string;
  /**
   * Флаг для управления открытием компонента.
   */
  isOpen: boolean;
  /**
   * Обработчик закрытия компонента.
   */
  onClose: () => void;
  /**
   * Дополнительные действия.
   */
  moreMenu?: MoreMenuItem[];
  /**
   * Значение по умолчанию для ширины компонента.
   */
  defaultWidth?: number;
  /**
   * Минимальная ширина компонента.
   */
  minWidth?: number;
  /**
   * Флаг, указывающий, нужно ли оставлять смонтированным содержимое компонента при его скрытии.
   */
  keepContentMounted?: boolean;
  /**
   * Заголовок для действия открытия в новой вкладке.
   */
  newTabActionTitle?: string;
}

export interface MoreMenuItem extends PropsWithChildren {
  /**
   * Уникальный идентификатор подэлемента.
   */
  id: string;
  /**
   * Обработчик клика по элементу.
   */
  onClick?: () => void;
}

```

### FILE: src/components/Stories/Container/types.ts
```typescript
export interface UseSwipeStackSwitch {
  currentStackId: number;
  onSwitch: (nextStackId: number) => void;
}

```

### FILE: src/components/Stories/context/types.ts
```typescript
import { StoriesProps } from "../types";
import { StoryObject, TogglePauseStateFunc } from "../renderers/types";

export interface GlobalContextProps
  extends Omit<StoriesProps, "onClose" | "stories"> {
  togglePauseState: TogglePauseStateFunc;
}

export interface StoriesContextProps {
  stackList: StoryObject[][];
}

export interface StorySlideContextProps {
  currentStackId: number;
  videoDuration?: number;
  stories: StoryObject[];
  next?: () => void;
  previous?: () => void;
  updateVideoDuration?: (duration: number) => void;
}

```

### FILE: src/components/Stories/Header/types.ts
```typescript
import { StoryObject } from "../renderers/types";
import type { TogglePauseStateFunc } from "../renderers/types";

export interface HeaderProps {
  story: StoryObject;
  isPaused?: boolean;
  isLoaded: boolean;
  togglePauseState: TogglePauseStateFunc;
  isMuted?: boolean;
  setMuted?: (state: boolean) => void;
}

```

### FILE: src/components/Stories/Modal/types.ts
```typescript
import { StoriesProps } from "../types";

export interface ModalProps {
  onClose: StoriesProps["onClose"];
}

```

### FILE: src/components/Stories/NavigationButtons/types.ts
```typescript
export interface NavigationButtonProps {
  previous?: () => void;
  next?: () => void;
}

```

### FILE: src/components/Stories/Progress/types.ts
```typescript
import { StoryObject } from "../renderers/types";

export interface ProgressProps {
  currentId: number;
  stackItem: StoryObject[];
  stackItemIndex: number;
}

```

### FILE: src/components/Stories/Provider/types.ts
```typescript
import { StoriesProps } from "../types";

export type ProviderProps = Omit<StoriesProps, "onClose">;

```

### FILE: src/components/Stories/renderers/types.ts
```typescript
import type { FC } from "react";

export type TogglePauseStateFunc = (action: boolean | undefined) => void;

export interface StoryObject {
  setSet?: string;
  url?: string;
  header?: {
    heading: string;
    subheading: string;
    profileImage: string;
    onClickProfileImage?: () => void;
  };
  type?: "image" | "video";
  duration?: number;
  content?: RendererProps;
  renderer?: RendererProps;
  hasProgressBar?: boolean;
}

export type StoryStack = (StoryObject | string)[];

export type StoriesStacksList = StoryStack[];

export type RendererProps = FC<{
  previous?: () => void;
  next?: () => void;
  togglePauseState: TogglePauseStateFunc;
  isPaused?: boolean;
  story: StoryObject;
  messageHandler: (type: string, story: StoryObject) => void;
  hasHeader?: boolean;
  /** текст ошибки в сторис с типом noContent, который надо вообще удалить */
  loadingErrorText?: string;
}>;

export type TesterFunc = (story: StoryObject) => {
  condition: boolean;
  priority: number;
};

```

### FILE: src/components/Stories/Story/types.ts
```typescript
import { StoryObject } from "../renderers/types";

export interface StoryProps {
  currentId: number;
  stackItem: StoryObject[];
  stackItemIndex: number;
}

```

### FILE: src/components/Stories/types.ts
```typescript
import { StoryStack, StoriesStacksList, StoryObject } from "./renderers/types";

type StoryProgress = (
  storyIndex: number,
  stackIndex: number,
  story: StoryObject
) => void;

export interface StoriesProps {
  onClose: () => void;
  stories: StoryStack | StoriesStacksList;
  /**
   * @default false
   */
  isPaused?: boolean;
  /**
   * @default false
   */
  loop?: boolean;
  /**
   * @default 5000
   */
  defaultDuration?: number;
  /**
   * @default 0
   */
  currentIndex?: number;
  /**
   * @default 0
   */
  currentStackIndex?: number;
  /**
   * @default false
   */
  keyboardNavigation?: boolean;
  onAllStoriesEnd?: (id: number, stories: StoryObject[]) => void;
  onStoryStart?: StoryProgress;
  onStoryEnd?: StoryProgress;
  onNext?: () => void;
  onPrevious?: () => void;
}

```

### FILE: src/components/storybook/StoryHeader/types.ts
```typescript
import { ReactNode } from "react";

export interface StoryHeaderProps {
  title: string;
  description?: string;
  sourceUrl?: string;
  docsUrl?: string;
  pixsoUrl?: string;
  cover?: ReactNode;
}

```

### FILE: src/components/Summary/SummaryItem/types.ts
```typescript
import type { ReactNode } from "react";
import type { TooltipMode } from "../../Tooltip/types";
import type { FloatingProps } from "../../../utils/floating-ui/types";

export interface LabelProps {
  /**
   * Текст лейбла.
   */
  label?: string;
  /**
   * Ширина лейбла.
   */
  labelWidth?: number;
  /**
   * Всплывающий текст, отображаемый при наведении.
   */
  tooltipValue?: string | ReactNode;
  /**
   * Цветовой режим всплывающего текста.
   */
  tooltipMode?: TooltipMode;
  /**
   * Расположение всплывающего текста.
   */
  tooltipPlacement?: FloatingProps["placement"];
}

export interface ValueProps {
  /**
   * Текст значения.
   */
  value?: string;
  /**
   * Описание.
   */
  description?: string;
  /**
   * Флаг, указывающий нужно ли переносить описание на новую строку.
   */
  hasDescriptionOwnLine?: boolean;
  /**
   * Текст ошибки.
   */
  error?: string;
  /**
   * Тип кнопки при наведении.
   */
  button?: "default" | "more";
  /**
   * Обработчик клика по элементу.
   */
  onClickButton?: (...args: unknown[]) => void;
}

export type SummaryItemProps = LabelProps & ValueProps;

```

### FILE: src/components/Summary/types.ts
```typescript
import type { ReactElement, ReactNode } from "react";
import type { SummaryItemProps } from "./SummaryItem/types";

export type СolumnsCount = 1 | 2;

export type Layout = "horizontal" | "vertical";

export interface SummaryProps {
  /**
   * Содержит от одного до нескольких SummaryItem.
   */
  children?:
    | ReactElement<SummaryItemProps>
    | ReactElement<SummaryItemProps>[]
    | ReactNode;
  /**
   * Горизонтальное или вертикальное расположение нескольких SummaryItem.
   */
  layout?: Layout;
  /**
   * Флаг, указывающий, нужно ли сделать колонки горизонтальными.
   */
  isHorizontalColumn?: boolean;
  /**
   * Количество колонок.
   */
  columnCount?: СolumnsCount;
}

export type LayoutContextArgs = Pick<
  SummaryProps,
  "layout" | "isHorizontalColumn"
>;

export type ColumnProps = Pick<
  SummaryProps,
  "isHorizontalColumn" | "columnCount"
>;

```

### FILE: src/components/Switch/types.ts
```typescript
import { InputHTMLAttributes } from "react";

export type Size = "s" | "m" | "l";

export interface SwitchContentProps
  extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Неактивность тумблера.
   * @default false
   */
  $disabled?: boolean;
  /**
   * Размер компонента.
   * @default l
   */
  $size?: Size;
}

```

### FILE: src/components/Tabs/Tab/types.ts
```typescript
import type { MouseEvent, ReactNode } from "react";
import type { Type } from "../types";

export type States = "active" | "hover" | "focus" | "selected" | "pressed";

type TabBaseProps = {
  /**
   * @default false
   */
  $isActive?: boolean;
  /**
   * @default primary
   */
  $type?: Type;
  $state?: States;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  children?: ReactNode;
};

type RegularTabExtras = {
  description?: never;
  /**
   * @default false
   */
  $badge?: boolean;
};

type DescriptionTabExtras = {
  description: string;
  $badge?: never;
};

export type TabProps = TabBaseProps & (RegularTabExtras | DescriptionTabExtras);

```

### FILE: src/components/Tabs/types.ts
```typescript
import { MouseEvent } from "react";

export type Type = "primary" | "secondary" | "tertiary" | "description";

interface BaseTabsProps {
  /**
   * Вариант отображения.
   * @default primary
   */
  $type: Type;
  /**
   * index активного таба
   */
  selectedIndex?: number;
  /**
   * Обработчик переключения табов.
   */
  onTabChange?: (event: MouseEvent<HTMLElement>, selectedId: number) => void;
}

export interface TertiaryTabsProps extends BaseTabsProps {
  $type: "tertiary";
  /**
   * Флаг вертикального расположения табов.
   * Работает только для $type = "tertiary".
   */
  isVerticalMode?: boolean;
}

export interface PrimarySecondaryTabsProps extends BaseTabsProps {
  $type: "primary" | "secondary";
  isVerticalMode?: never;
}

export interface DescriptionTabsProps extends BaseTabsProps {
  $type: "description";
  isVerticalMode?: never;
}

export type TabsProps =
  | TertiaryTabsProps
  | PrimarySecondaryTabsProps
  | DescriptionTabsProps;

```

### FILE: src/components/Tags/Chips/types.ts
```typescript
import { ButtonHTMLAttributes } from "react";

type State =
  | "default"
  | "hover"
  | "focus"
  | "active"
  | "selection"
  | "disabled";
export type Type = "default" | "warnings" | "alert";
export type Size = "s" | "m";

export interface ChipsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Текущее состояние.
   */
  $state?: State;
  /**
   * Вариант отображения.
   * @default default
   */
  $type?: Type;
  /**
   * Размер.
   * @default s
   */
  $size?: Size;
  $isSelection?: boolean;
}

```

### FILE: src/components/Tags/Filter/types.ts
```typescript
import type { Color } from "../Tag/types";

export type State = "default" | "disabled";

export interface FilterProps {
  /**
   * @default default
   */
  $state?: State;
  /**
   * Значение счетчика.
   */
  $counter?: number;
  /**
   * Цвет фона.
   * @default yellow
   */
  $color?: Color;
}

```

### FILE: src/components/Tags/Hashtag/types.ts
```typescript
export type State = "default" | "hover" | "focus" | "active" | "disabled";

export type Size = "m" | "s";

export interface HashtagProps {
  /**
   * Текущее состояние.
   */
  $state?: State;
  /**
   * Размер.
   * @default s
   */
  $size?: Size;
}

```

### FILE: src/components/Tags/Selectable/types.ts
```typescript
type State = "default" | "hover" | "focus" | "selected" | "active";
type Size = "m" | "l";

export interface SelectableProps {
  $state?: State;
  /**
   * Размер.
   * @default m
   */
  $size?: Size;
  /**
   * Флаг выбранного состояния.
   */
  $selected?: boolean;
}

```

### FILE: src/components/Tags/Tag/types.ts
```typescript
export type TagColor =
  | "yellow"
  | "blue"
  | "purple"
  | "orange"
  | "magenta"
  | "green"
  | "red"
  | "teal"
  | "cyan"
  | "lime"
  | "grey"
  | "white";

export type Color = TagColor;

export interface TagProps {
  /**
   * Размер.
   * @default m
   */
  $size?: "s" | "m";
  /**
   * Цвет фона.
   * @default yellow
   */
  $color?: Color;
  /**
   * Флаг включения кликабельности компонента.
   * @default false
   */
  isClickable?: boolean;
}

```

### FILE: src/components/Text/types.ts
```typescript
import { DefaultTheme } from "styled-components";
import { ColorProps, ResponsiveValue, SpaceProps } from "styled-system";

type Variant = keyof DefaultTheme["typography"];

export interface TextProps
  extends ColorProps<DefaultTheme>,
    SpaceProps<DefaultTheme> {
  variant: Variant | ResponsiveValue<Variant, DefaultTheme>;
}

```

### FILE: src/components/TimeCounter/types.ts
```typescript
import { HTMLProps } from "react";

export interface TimeCounterProps extends HTMLProps<HTMLInputElement> {
  /**
   * Коллбэк уменьшения значения.
   */
  $decrease: () => void;
  /**
   * Коллбэк увеличения значения.
   */
  $increase: () => void;
}

```

### FILE: src/components/TimePicker/types.ts
```typescript
import { HTMLProps, ReactNode, Ref } from "react";

export interface TimePickerProps extends HTMLProps<HTMLInputElement> {
  children?: ReactNode;
  ref?: Ref<HTMLInputElement>;
  /**
   * Префикс.
   */
  $prefix?: "от" | "до";
  /**
   * Постфикс.
   */
  $postfix?: ReactNode;
}

```

### FILE: src/components/Title/Action/types.ts
```typescript
import { Size } from "../types";

export interface ActionProps {
  $size?: Size;
}

```

### FILE: src/components/Title/types.ts
```typescript
import { ComponentPropsWithRef } from "react";

export type SizeForTitleAsTab = "H4" | "subheadline";

export type Size = "H1" | "H2" | "H3" | SizeForTitleAsTab | "footnote";

type BaseTitleProps = Omit<ComponentPropsWithRef<"div">, "size"> & {
  /**
   * Флаг, является ли активным.
   */
  $isActive?: boolean;
};

export type TitlePropsTab = BaseTitleProps & {
  /**
   * Флаг, является ли табом.
   */
  $isTab: true;
  /**
   * Размер.
   */
  $size: SizeForTitleAsTab;
};

export type TitlePropsRegular = BaseTitleProps & {
  /**
   * Флаг, является ли табом.
   */
  $isTab?: false | undefined;
  /**
   * Размер.
   */
  $size?: Size;
};

export type TitleProps = TitlePropsRegular | TitlePropsTab;

export type TitleStates = "selected";

export interface TitleContextType {
  $size?: TitleProps["$size"];
  $state?: TitleStates;
}

export type TitleStyledProps = TitleProps & {
  $state?: TitleStates;
};

```

### FILE: src/components/ToolSelector/types.ts
```typescript
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { Type } from "../Button/types";

export type Size = "s" | "m" | "l";

export interface ToolSelectorProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Иконка.
   */
  icon: ReactNode;
  /**
   * Размер элемента.
   * @default "m"
   */
  size?: Size;
  /**
   * Тип элемента.
   * @default primary
   */
  $type?: Exclude<Type, "mono" | "monoSecondary">;
  /**
   * Активность элемента.
   * @default false
   */
  $active?: boolean;
  /**
   * Отключение элемента.
   * @default false
   */
  disabled?: boolean;
}

```

### FILE: src/components/Tooltip/types.ts
```typescript
import type { MutableRefObject, ReactElement } from "react";
import { FloatingProps } from "../../utils/floating-ui/types";

export type TooltipType = "rich" | "default";

export type TooltipMode = "dark" | "light";

export interface TooltipProps extends Pick<FloatingProps, "delay"> {
  /**
   * Элемент триггера.
   */
  $trigger: ReactElement;
  /**
   * Тип отображения.
   * @default 'default'
   */
  $type?: TooltipType;
  /**
   * Вариант отображения.
   * @default 'dark'
   */
  $mode?: TooltipMode;
  /**
   * Размер смещения между положением всплывающей подсказки и элементом
   * @default 18
   */
  $offset?: number;
  /**
   * Позиция.
   * @default 'bottom'
   */
  $placement?: FloatingProps["placement"];
  /**
   * Стилевой компонент для стрелки всплывающего укна
   */
  arrowComponent?: ReactElement;
  /**
   * Изменение типа взаимодействия с триггером
   * @default ['hover','focus','dismiss']
   */
  interactionType?: FloatingProps["interactionType"];
  /**
   * Список применяемых (модификаторов)[https://floating-ui.com/docs/middleware]
   */
  middleware?: FloatingProps["middleware"];
  /**
   * Стратегия, используемая при позиционировании содержимого:
   * - absolute контент рендерится следующей нодой от триггера
   * - fixed контент рендерится в портале в body
   * @default fixed
   */
  strategy?: FloatingProps["strategy"];
}

export type ArrowElem = SVGSVGElement | null;

export interface TooltipContextProps {
  $type: TooltipType;
  arrowRef: MutableRefObject<ArrowElem>;
}

```

### FILE: src/components/Tree/Node/types.ts
```typescript
import { ReactNode } from "react";

export interface NodeProps {
  $label?: ReactNode;
  /**
   * @default false
   */
  $isOpen?: boolean;
}

export interface NestedContentProps {
  $isOpen?: boolean;
}

export interface ArrowProps {
  $isOpen?: boolean;
}

```

### FILE: src/components/Upload/Dropzone/types.ts
```typescript
import { Size } from "../types";

export interface DropzoneProps {
  $size: Size;
  isDisabled: boolean;
  isMobile: boolean;
  firstHalfTitle: string;
  secondHalfTitle: string;
  subtitle: string | undefined;
  handleClickOnInput: () => void;
}

```

### FILE: src/components/Upload/FileList/Progress/types.ts
```typescript
export interface ProgressProps {
  percent: number;
}

```

### FILE: src/components/Upload/FileList/types.ts
```typescript
import { Errors, FileWithId, Progress, UploadProps } from "../types";

export interface FileListProps {
  files: FileWithId[];
  errors?: Errors;
  progress?: Progress;
  handleFileRemove: (id: string) => void;
  handleClickOnInput: () => void;
  withCounter?: boolean;
  counterText?: string;
  withRepeatButton?: boolean;
  repeatButtonText?: string;
  onClickFile?: (file: FileWithId) => void;
  moreButtonText?: UploadProps["moreButtonText"];
}

```

### FILE: src/components/Upload/types.ts
```typescript
import { ComponentProps, ReactElement } from "react";

export type Size = "small" | "large";

export type State = "default" | "hover" | "loading" | "loaded";

type ErrorText = string;

export type Errors = Record<string, ErrorText>;

type ProgressPercent = number | undefined;

export type Progress = {
  [id: string]: ProgressPercent;
};

export interface FileProps {
  $file: FileWithId;
  $error?: string;
  $progress?: number;
  $withRepeatButton?: boolean;
  $repeatButtonText?: string;
  $withRemoveButton?: boolean;
  $isLoading?: boolean;
  $handleRetry: (id: string) => void;
  $handleFileRemove: (id: string) => void;
  $onClick?: (file: FileWithId) => void;
  $isShowWeight?: boolean;
  $isAbleToOpenWhenError?: boolean;
}

export type FileButton = {
  element: ReactElement;
  onClick: (id: string) => void;
};

export type FileState = "ready" | "loading";

export type FileWithId = {
  id: string;
  file: File;
  buttons?: FileButton[];
  state?: FileState;
  props?: Partial<FileProps>;
};

export interface UploadProps {
  /**
   * Размер компонента.
   */
  size?: Size;
  /**
   * Основной заголовок компонента.
   */
  title?: string;
  /**
   * Заголовок компонента.
   */
  label?: string;
  /**
   * Описание компонента.
   */
  description?: string;
  /**
   * Ошибка.
   */
  error?: string;
  /**
   * Типы файлов, с которыми работает компонент.
   * @example ".jpg,.jpeg,.png"
   */
  fileTypes?: string;
  /**
   * Список файлов, которые должны быть загружены в компонент.
   */
  filesWithId: FileWithId[];
  /**
   * Дополнительные пропсы для инпута компонента.
   */
  inputProps?: Omit<ComponentProps<"input">, "onChange"> & {
    "data-testid"?: string;
  };
  /**
   * Первая часть заголовка.
   */
  firstHalfTitle: string;
  /**
   * Вторая часть заголовка.
   */
  secondHalfTitle: string;
  /**
   * Подзаголовок.
   */
  subtitle?: string;
  /**
   * Список компонентов с ошибками.
   *
   * Ключ - id файла.
   *
   * Свойство - текст ошибки.
   * @example {
   *  "czxc7": "Произошла ошибка!"
   * }
   */
  errors?: Errors;
  /**
   * Список компонентов со шкалой загрузки.
   *
   * Ключ - id файла.
   *
   * Свойство - процент загрузки.
   * @example {
   *  "czxc7": 75
   * }
   */
  progress?: Progress;
  /**
   * Максимальное количество файлов в компоненте.
   *
   * При превышении лимита компонент становится неактивным.
   *
   * Минимальное рабочее значение - 1.
   */
  maxFilesCount?: number;
  /**
   * Наличие счетчика файлов.
   */
  withCounter?: boolean;
  /**
   * Текст в счетчике файлов.
   */
  counterText?: string;
  /**
   * Наличие кнопки повтора загрузки файла.
   */
  withRepeatButton?: boolean;
  /**
   * Текст для кнопки повтора загрузки файла.
   */
  repeatButtonText?: string;
  /*
   * Обработчик клика по файлу.
   */
  onClickFile?: (file: FileWithId) => void;
  /**
   * Обработчик удаления файла.
   *
   * @returns Возвращаемое булевое значение из промиса означает успешное/неуспешное удаление файла.
   */
  onRemoveFile: (
    fileList: FileWithId[],
    removeFile?: FileWithId
  ) => Promise<boolean> | boolean;
  /**
   * Обработчик добавления файла.
   *
   * @returns Возвращаемое булевое значение означает успешное/неуспешное добавление файла.
   */
  onAddFile: (fileList: FileWithId[], addFiles: FileWithId[]) => void;
  /*
   * Текст кнопки показа/скрытия файлов в списке файлов.
   */
  moreButtonText?: {
    show?: string;
    hide?: string;
  };
  /*
   * Флаг дизейбла компонента.
   */
  isDisabled?: boolean;
}

```

### FILE: src/components/Videoplayer/ControlBar/PlaylistControl/types.ts
```typescript
import { VideoplayerActions, VideoShortInfo } from "../../types";

export interface PlaylistControlProps {
  $videoShortInfo: VideoShortInfo;
  $actionType: Extract<VideoplayerActions, "prev" | "next">;
}

```

### FILE: src/components/Videoplayer/ControlBar/Volume/types.ts
```typescript
import { TransitionStatus } from "react-transition-group";

export interface VolumeBarProps {
  state?: TransitionStatus;
}

```

### FILE: src/components/Videoplayer/Playlist/types.ts
```typescript
import type { ReactNode } from "react";
import { Source, Track } from "../types";

export interface VideoCellProps {
  $prefix?: JSX.Element;
  $isPlaying?: boolean;
}

export interface PreviewProps {
  $src: string;
}

export interface VideoCellContextProps {
  $isPlaying?: boolean;
  hovered?: boolean;
}

export interface Playlist {
  title: string;
  items: PlaylistItem[];
}

export interface PlaylistProps {
  $header?: ReactNode;
  $counter?: ReactNode;
}

export interface PlaylistItem {
  // sources[] так как можно передать массив с разным качеством
  sources: Source[];
  smallPoster?: string;
  videoPoster?: string;
  title?: string;
  duration?: number;
  textTracks?: Track[];
}

```

### FILE: src/components/Videoplayer/ProgressBar/types.ts
```typescript
import { ControlBarProps } from "../types";

export type ProgressBarType = "default" | "actual" | "buffered" | "hovered";

export interface ProgressBarProps {
  $type?: ProgressBarType;
  $hovered?: boolean;
  $onHoverPreviewChange?: ControlBarProps["$onHoverPreviewChange"];
}

export interface PreviewImageProps {
  $src?: string;
}

export interface TimeTooltipProps {
  time: number;
  $onHoverPreviewChange: ControlBarProps["$onHoverPreviewChange"];
}

export interface BufferedTimeRangesProps {
  timeRanges?: TimeRanges;
  duration: number;
  currentTime: number;
}

```

### FILE: src/components/Videoplayer/SettingsMenu/types.ts
```typescript
export interface SettingsItemProps {
  $selected?: boolean;
}

export interface SettingsMenuProps {
  $mainMenu?: boolean;
}

export interface ItemMenuProps {
  onClick: () => void;
  title: string;
  value?: string | number;
}

```

### FILE: src/components/Videoplayer/Tag/types.ts
```typescript
export type TagType = "time" | "popup" | "video";

export interface TagProps {
  $type?: TagType;
}

```

### FILE: src/components/Videoplayer/types.ts
```typescript
import {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  RefObject,
  SetStateAction,
  VideoHTMLAttributes,
} from "react";

import { TransitionStatus } from "react-transition-group";
import Hls, { HlsConfig } from "hls.js";

export type { HlsConfig } from "hls.js";

export type VideoElement = HTMLVideoElement;
export type ContainerElement = HTMLDivElement;
export type HlsElement = Hls | null;

export type VideoRef = RefObject<VideoElement>;
export type ContainerRef = RefObject<ContainerElement>;
type HlsRef = RefObject<HlsElement>;

export interface ContainerProps {
  $ratio: number;
  isCursorVisible: boolean;
}

export interface VideoPlaylistOptions {
  $prevVideo?: VideoShortInfo;
  $nextVideo?: VideoShortInfo;
}

export interface ControlBarProps extends VideoPlaylistOptions {
  state?: TransitionStatus;
  $onHoverPreviewChange: VideoplayerProps["$onHoverPreviewChange"];
}

export interface TransitionWrapperProps extends Omit<ControlBarProps, "state"> {
  interactionsStarted: boolean;
  hovered: boolean;
  activeMenu: VideoplayerMenu;
  isActive: boolean;
}

export interface Source {
  src: string;
  type?: string;
  /**
   * Example: 720, 1080
   */
  quality?: number;
  label?: string;
}

export interface VideoplayerProps
  extends VideoPlaylistOptions,
    VideoHTMLAttributes<HTMLVideoElement> {
  $sources: Source[];
  $poster?: string;
  $currentProgress?: number;
  $onInit?: (player: HTMLVideoElement) => void;
  $handleSendProgress?: (percent: number, currentTime: number) => void;
  $onHoverPreviewChange?: (hoveredTime: number) => string;
  $registerProgressDelay?: number;
  $error?: Error;
  $textTracks?: Track[];
  /**
   * Для поддержки [HLS](https://www.w3.org/TR/media-timed-events/#http-live-streaming) используется библиотека [hls.js](https://github.com/video-dev/hls.js).
   * Можно передать нужные параметры через [HlsConfig](https://github.com/video-dev/hls.js/blob/master/docs/API.md#hlsdefaultconfig-getset).
   */
  $hlsConfig?: HlsConfig;
}

export interface VideoplayerContextProps {
  videoRef: VideoRef;
  containerRef: ContainerRef;
  hlsRef: HlsRef;
  $sources: VideoplayerProps["$sources"];
  activeMenu?: VideoplayerMenu;
  setActiveMenu?: Dispatch<SetStateAction<VideoplayerMenu>>;
}

export type VideoplayerMenu =
  | "main"
  | "quality"
  | "subtitles"
  | "playbackRate"
  | "audiotracks"
  | null;

export type VideoplayerActions =
  | "prev"
  | "next"
  | "fullscreen"
  | "settings"
  | "repeat"
  | "mute"
  | "play"
  | "pausePlay"
  | "rewindForward"
  | "rewindBackward";

/** Качество видео - ссылка */
export type VideoQualitySettings = Record<string, string>;

export interface ActionTooltipMessage {
  on: string;
  off: string;
}

export type TooltipMessages = string | ActionTooltipMessage;

export interface IconWrapperProps {
  $icon?: ReactNode;
  $onClick: MouseEventHandler;
  $actionType: VideoplayerActions;
}

export interface TagContent {
  content: string;
  hotkey?: string;
}

export interface VideoShortInfo {
  /**
   * Обработчик перехода на видео.
   */
  onClick: () => void;
  previewImg?: string;
  description?: string;
}

export interface SkeletonProps {
  $isError?: boolean;
}

export interface Error {
  title?: string;
  description?: string;
}

export interface PlaybackContextProps {
  currentTime: number;
  duration: number;
  bufferedTimes?: TimeRanges;
}

/**
 * Tracks
 */
export type TrackKind =
  | "subtitles"
  | "captions"
  | "descriptions"
  | "chapters"
  | "metadata";

interface TrackBase {
  /**
   * Адрес файла текстовой дорожки.
   *
   * Текстовые дорожки из другого домена:
   * Если необходимо чтобы видео было с одного домена, а текстовые дорожки - с другого, нужно включить CORS на сервере, который обслуживает ваши текстовые дорожки.
   * В дополнение к включению CORS, также потребуется добавить атрибут crossorigin к самому элементу видео.
   * <Videoplayer crossOrigin="anonymous" ... />
   */
  src: string;
  /**
   * Отображаемое название дорожки.
   *
   * Используется в меню выбора языка субтитров.
   */
  label: string;
  /**
   * Тип дорожки.
   *
   * Возможные варианты: https://developer.mozilla.org/ru/docs/Web/HTML/Element/track#attr-kind
   */
  kind: TrackKind;
}

interface SubtitlesTrack extends TrackBase {
  kind: "subtitles";
  srclang: string;
}

type OtherTrack = TrackBase & {
  kind: Exclude<TrackKind, "subtitles">;
  /**
   * Язык дорожки.
   *
   * Возможные варианты: https://htmlbook.ru/html/value/lang
   * Если для атрибута kind установлено значение subtitles, должен быть определён атрибут srclang.
   */
  srclang?: never;
};

export type Track = SubtitlesTrack | OtherTrack;

type HotkeyData = {
  keyCode: KeyboardEvent["code"];
  label: string;
};

export type VideoHotkeys = Record<
  Exclude<VideoplayerActions, "settings" | "repeat" | "prev" | "next">,
  HotkeyData
>;

```

### FILE: src/hooks/useDraggableModal/types.ts
```typescript
import { MutableRefObject, RefObject } from "react";

import { PositionX, PositionY } from "../../types/common";

export type UseDraggableModalParams = {
  /** Элемент, рядом с которым надо отрендерить модальное окно. Без него, отобразится по центру экрана. */
  anchorRef?: RefObject<HTMLElement>;

  /** Вариант позиционирования, относительно элемента-якоря, по горизонтали.
   * @default 'right'
   */
  positionX?: PositionX;

  /** Вариант позиционирования, относительно элемента-якоря, по вертикали.
   * @default 'bottom'
   */
  positionY?: PositionY;

  /** Координаты, установленные пользователем после перемещения. */
  userPositionRef?: MutableRefObject<[number, number] | null>;

  /** Размер, установленный пользователем после изменения размера. */
  userSizeRef?: MutableRefObject<[number, number] | null>;

  /** Количество пикселей до элемент-якоря. */
  offset?: number;

  /** Флаг для состояния показать/скрыть. Используется только при реализации модального окна с постоянным нахождением в DOM. */
  isOpen?: boolean | null;
};

```

### FILE: src/hooks/usePointers/types.ts
```typescript
export interface UsePointersResult {
  hasCoarsePointer: boolean;
  hasFinePointer: boolean;
}

```

### FILE: src/hooks/useScreenSize/types.ts
```typescript
export type ThemeScreenSize = "desktop" | "mobile" | "tablet";

```

### FILE: src/icons/__stories__/components/IconFilter/types.ts
```typescript
export interface IconsFilterProps<T extends string> {
  disabled?: boolean;
  text: string;
  selectValue: T;
  onChange: (value: T) => void;
  values: readonly T[];
}

```

### FILE: src/icons/__stories__/components/IconsSection/types.ts
```typescript
import type {
  IconCategory,
  AllType,
  IconSize,
  IconType,
  IconColor,
  NoneType,
  ColoredType,
} from "../../icons";

export interface IconsSectionProps {
  index?: number;
  sectionName: IconCategory;
  search: string;
  selectedCategory: IconCategory | AllType;
  selectedSize: IconSize;
  selectedType: IconType | AllType;
  selectedColor: IconColor | NoneType | ColoredType;
}

```

### FILE: src/icons/__stories__/components/IconWithCopyButton/ButtonsGroup/types.ts
```typescript
export interface ButtonGroupProps {
  values: Array<{
    name: string;
    valueForCopy: string;
    successText: string;
    errorText: string;
  }>;
  name: string;
}

```

### FILE: src/icons/__stories__/components/IconWithCopyButton/types.ts
```typescript
import type {
  ColoredType,
  IconColor,
  IconNames,
  IconSize,
  NoneType,
} from "../../icons";

export interface IconWithCopyButtonProps {
  name: IconNames;
  size: IconSize;
  selectedColor: IconColor | ColoredType | NoneType;
}

```

### FILE: src/icons/__stories__/icons/types.ts
```typescript
import type { FC, SVGProps } from "react";
import {
  ALL,
  NONE,
  OUTLINE,
  FILLED,
  COLORED,
  SERVICES,
  SERVICES_PULSE_PRO,
  STATUS,
  GENERAL,
  USER,
  ARROWS,
  ALERTS_FEEDBACK,
  FILES,
  SOCIAL,
  MY_INCOME_AND_BENEFITS,
  MY_DAY,
  EDUCATION,
  HEALTH,
  GOALS,
  GRATITUDE,
  REACTIONS,
  OTHER,
} from "./constants";

export type AllType = typeof ALL;
export type ColoredType = typeof COLORED;
export type NoneType = typeof NONE;

export type IconType = typeof OUTLINE | typeof FILLED | typeof COLORED;

export type IconCategory =
  | typeof SERVICES
  | typeof SERVICES_PULSE_PRO
  | typeof STATUS
  | typeof GENERAL
  | typeof GOALS
  | typeof GRATITUDE
  | typeof USER
  | typeof ARROWS
  | typeof ALERTS_FEEDBACK
  | typeof FILES
  | typeof SOCIAL
  | typeof MY_INCOME_AND_BENEFITS
  | typeof MY_DAY
  | typeof EDUCATION
  | typeof OTHER
  | typeof REACTIONS
  | typeof HEALTH;

export interface IconsValue {
  type: IconType;
  category: IconCategory;
  Svg: FC<SVGProps<SVGSVGElement>>;
}

export const sections: IconCategory[] = [
  GRATITUDE, // благодарности
  OTHER, // другие
  HEALTH, // здоровье
  SOCIAL, // медиа
  MY_DAY, // мой день
  MY_INCOME_AND_BENEFITS, // мой доход и льготы
  GENERAL, // общее
  USER, // пользователь
  EDUCATION, // развитие
  REACTIONS, // реакции
  SERVICES, // сервисы
  SERVICES_PULSE_PRO, // сервисы ПульсПро
  STATUS, // статус
  ALERTS_FEEDBACK, // уведомления
  ARROWS, // управление
  FILES, // файлы
  GOALS, // цели
];

```

### FILE: src/icons/__stories__/types.ts
```typescript
import type { AllType, IconCategory, IconType } from "./icons";

export type IconTypeFilter = IconType | AllType;

export type IconCategoriesValue = {
  categories: (IconCategory | AllType)[];
};

```

### FILE: src/illustrations/__stories__/components/ButtonsGroup/types.ts
```typescript
export interface ButtonGroupProps {
  sizes: string[];
  name: string;
}

```

### FILE: src/illustrations/__stories__/components/Card/types.ts
```typescript
import type { IllustrationNames } from "../../../illustrations";

export type Size =
  | "650x650"
  | "320x320"
  | "250x250"
  | "160x160"
  | "120x120"
  | "100x100"
  | "72x72"
  | "48x48";

export type Sizes = Array<Size>;

export interface CardProps {
  padding?: number;
  name: IllustrationNames;
  sizes: Sizes;
}

```

### FILE: src/illustrations/__stories__/components/Cards/types.ts
```typescript
import { IllustrationNames } from "@pulse/illustrations/components/Illustration/illustrations/illustrations";
import type { Sizes } from "../Card";

export interface CardsProps {
  padding?: number;
  isGroupCards?: true;
  values: IllustrationNames[];
  search: string;
  sizes: Sizes;
}

```

### FILE: src/illustrations/__stories__/components/Story/types.ts
```typescript
import type { Dispatch, SetStateAction } from "react";

export interface StoryProps {
  searchValue: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

```

### FILE: src/illustrations/__stories__/utils/getMiniIllustration/types.ts
```typescript
import type { FC, SVGProps } from "react";
import type { IllustrationNames } from "../../illustrations";
import type { Sizes } from "../../components";

export type Illustrations = Partial<
  Record<IllustrationNames, FC<SVGProps<SVGSVGElement>>>
>;

export interface IllustrationsConfig {
  title: string;
  data: Illustrations;
  sizes: Sizes;
}

```

### FILE: src/illustrations/__stories__/utils/types.ts
```typescript
import type { FC, SVGProps } from "react";
import type { IllustrationNames } from "@pulse/illustrations/components/Illustration/illustrations";
import type { Sizes } from "../components";

export type Illustrations = Partial<
  Record<IllustrationNames, FC<SVGProps<SVGSVGElement>>>
>;

export interface IllustrationsConfig {
  title: string;
  data: Illustrations;
  sizes: Sizes;
}

```

### FILE: src/patterns/ui/Accordion/types.ts
```typescript
import { ReactNode } from "react";

export interface AccordionProps {
  children: ReactNode;
  title: string;
}

```

### FILE: src/patterns/ui/LinksSection/types.ts
```typescript
import { FC, SVGProps } from "react";

export interface LinksSectionProps {
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  items: Item[];
}

interface Item {
  id: string;
  text: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  link?: string;
}

```

### FILE: src/patterns/ui/Navigation/types.ts
```typescript
export type Section = {
  id: string;
  title: string;
};

export type NavigationProps = {
  data: Section[];
};

```

### FILE: src/patterns/ui/NumberBadge/types.ts
```typescript
export interface NumberBadgeProps {
  number: string;
  text: string;
  isMultipleNumbers?: boolean;
}

```

### FILE: src/patterns/ui/StatusText/types.ts
```typescript
export type TextType = "right" | "wrong";

export interface StatusTextProps {
  text?: string;
  type?: TextType;
}

export interface StatusTextBaseProps {
  type?: TextType;
}

```

### FILE: src/templates/Approvals/types.ts
```typescript
import { AnyValue } from "../../types";
import { TemplateProps } from "../types";

interface IUser {
  fullName: string;
  avatarUrl?: string;
  position?: string;
}

type ApprovalStatus = "in_progress" | "completed" | "rejected";

export interface IStep {
  /**
   * ID шага
   */
  id: string;
  /**
   * Заголовок шага
   */
  title: string;
  /**
   * Статус шага
   */
  status: ApprovalStatus;
  /**
   * Данные ответсвенного лица
   */
  user: IUser;
  /**
   * Дата начала шага
   */
  date?: string;
  /**
   * Порядковый номер шага
   */
  order?: number;
}

interface IButton {
  type: "primary" | "secondary";
  text: string;
  prompt?: string;
  agentId?: string;
  additionalProperties?: Record<string, string | number>;
}

export interface IApprovalsProps extends TemplateProps {
  /**
   * Заголовок
   */
  title: string;
  /**
   * Подзаголовок
   */
  subtitle?: string;
  /**
   * ID процесса
   */
  requestId?: string;
  /**
   * Дата начала процесса
   */
  requestDate?: string;
  /**
   * Текущий статус процесса
   */
  status: ApprovalStatus;
  /**
   * Массив шагов процесса
   */
  items: IStep[];
  /**
   * Данные для кнопок
   */
  buttons?: IButton[];
}

export interface ISortedStep {
  type: "step" | "placeholder";
  key: string;
  step?: IStep;
}

export interface SuggestionPayload {
  prompt: string;
  agentId: string;
  additionalProperties: Record<string, AnyValue>;
}

```

### FILE: src/templates/Calendar.Range/types.ts
```typescript
import type { ButtonHTMLAttributes } from "react";
import type { ButtonProps } from "../../components/Button";
import type { TemplateProps } from "../types";

export interface ArrowProps
  extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  flip?: boolean;
}

export interface CalendarRangeProps extends TemplateProps {
  /**
   * Тип кнопки
   * @default 'primary'
   */
  button: {
    label: string;
    type?: Extract<ButtonProps["$type"], "primary" | "secondary">;
  };
  /**
   * Локаль
   */
  locale: string;
  /**
   * Дополнительный текст
   */
  label?: string;
  /**
   * Заголовок
   */
  title: string;
}

export interface Day {
  day: number;
  isActive?: boolean;
  isCurrent?: boolean;
  isExternal: boolean;
  isToday: boolean;
  isWeekend: boolean;
  key: string;
  name: string;
  original: Date;
}

```

### FILE: src/templates/Calendar.Single/types.ts
```typescript
import type { ButtonHTMLAttributes } from "react";
import type { ButtonProps } from "../../components/Button";
import type { TemplateProps } from "../types";

export interface ArrowProps
  extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  flip?: boolean;
}

export interface CalendarSingleProps extends TemplateProps {
  /**
   * Тип кнопки
   * @default 'primary'
   */
  button: {
    label: string;
    type?: Extract<ButtonProps["$type"], "primary" | "secondary">;
  };
  /**
   * Локаль
   */
  locale: string;
  /**
   * Дополнительный текст
   */
  label?: string;
  /**
   * Заголовок
   */
  title: string;
}

```

### FILE: src/templates/Choose.Multi/types.ts
```typescript
import type { ButtonProps } from "../../components/Button";
import type { TemplateProps } from "../types";

interface ItemProps
  extends Record<string, boolean | number | string | null | undefined> {
  caption?: string;
  checked?: boolean;
  disabled?: boolean;
  id: number | string;
  label: string;
}

export interface ChooseMultiProps extends TemplateProps {
  /**
   * Тип кнопки
   * @default 'primary'
   * @todo сделать обязательным
   */
  button?: {
    label: string;
    type?: Extract<ButtonProps["$type"], "primary" | "secondary">;
  };
  /**
   * Подписи к кнопкам
   * @deprecated
   */
  buttons?: {
    reset?: string;
    submit: string;
  };
  /**
   * Параметры промпта (обязателен, если не задан `required`)
   * @todo улучшить типизацию
   */
  prompt?: {
    /**
     * Пустой промпт (откидывается, если не выбран ни один из вариантов)
     */
    empty: string;
  };
  /**
   * Массив элементов
   */
  items: Array<ItemProps>;
  /**
   * Дополнительный текст
   */
  label?: string;
  /**
   * Локаль
   */
  locale: string;
  /**
   * Если задано, то кнопка будет отключена, если количество выбранных
   * элементов меньше `min` или больше `max`
   *
   * @default
   * { max: Number.MAX_SAFE_INTEGER, min: 0 }
   */
  required?: {
    max?: number;
    min?: number;
  };
  /**
   * Заголовок
   */
  title: string;
}

```

### FILE: src/templates/Choose.Single/types.ts
```typescript
import type { ButtonProps } from "../../components/Button";
import type { TemplateProps } from "../types";

interface ItemProps
  extends Record<string, boolean | number | string | null | undefined> {
  caption?: string;
  checked?: boolean;
  disabled?: boolean;
  id: number | string;
  label: string;
}

export interface ChooseSingleProps extends TemplateProps {
  /**
   * Тип кнопки
   *
   * @default 'primary'
   * @todo сделать обязательным
   */
  button?: {
    label: string;
    type?: Extract<ButtonProps["$type"], "primary" | "secondary">;
  };
  /**
   * Подписи к кнопкам
   *
   * @deprecated use `button`
   */
  buttons?: {
    reset?: string;
    submit: string;
  };
  /**
   * Параметры промпта (обязателен, если `required` не задан)
   *
   * @todo улучшить типизацию
   */
  prompt?: {
    /**
     * Пустой промпт (если не выбран ни один из вариантов)
     */
    empty: string;
  };
  /**
   * Массив элементов
   */
  items: ItemProps[];
  /**
   * Дополнительный текст
   */
  label?: string;
  /**
   * Если `true`, то кнопка `submit` будет отключена, если не выбран ни один элемент

   * @default false
   */
  required?: boolean;
  /**
   * Заголовок
   */
  title: string;
}

```

### FILE: src/templates/Digits.Buttons/types.ts
```typescript
import type { Type as ButtonType } from "../../components/Button/types";
import type { TemplateProps } from "../types";
import type { DigitsProps } from "../Digits/types";

export interface DigitsButtonsProps extends DigitsProps, TemplateProps {
  /**
   * Массив кнопок
   * @todo переделать на объект с двумя кнопками
   */
  buttons: Array<{
    /**
     * ID
     */
    id: string | number;
    /**
     * Текст
     */
    label: string;
    /**
     * Тип
     */
    type?: ButtonType;
  }>;
}

```

### FILE: src/templates/Digits.Image/types.ts
```typescript
import type { ImageProps } from "../../blocks/Image/types";
import type { DigitsProps } from "../Digits/types";

export interface IDigitsImageProps extends DigitsProps {
  image: ImageProps;
}

```

### FILE: src/templates/Digits.Profile/types.ts
```typescript
import type { TemplateProps } from "../types";
import type { DigitsProps } from "../Digits/types";

export interface DigitsProfileProps extends DigitsProps, TemplateProps {
  /**
   * Данные профиля
   */
  profile: {
    title: string;
    description: string;
    src?: string;
  };
}

```

### FILE: src/templates/Digits/types.ts
```typescript
export interface DigitProps {
  /**
   * Значение
   */
  value: number;
  /**
   * Единица измерения
   * @default ''
   * @example 'руб.', 'ед.', 'человек' и тд
   */
  unit: string;
  /**
   * Подпись
   */
  title?: string;
  /**
   * ссылка, которая открывается по клику на title
   */
  href?: string;
}

export interface DigitsProps {
  /**
   * Заголовок
   */
  title: string;
  /**
   * Описание
   */
  description?: string;
  /**
   * Цифры
   */
  digits: DigitProps[];
}

```

### FILE: src/templates/Documents/types.ts
```typescript
import type { TemplateProps } from "../types";

export interface DocumentProps {
  /**
   * Размер файла в байтах
   * @example 22741123 => '23 МБ'
   */
  size: number;
  /**
   * Заголовок для документа
   * @example "заявление на перевод"
   */
  documentName: string;
  /**
   * Имя файла
   * @example "perevod_21_05_2025.pdf"
   */
  fileName: string;
  /**
   * Путь к файлу в content storage в формате `/[ИМЯ_ПАРТИЦИИ]/[ПУТЬ]` ИЛИ абсолютный путь к файлу (http://...)
   * @example "https://hr-ift.sberbank.ru/api-web/cs/api/1/common/coreui/neuro/test/IOS_qr_instruction.pdf"
   * @example "common/coreui/neuro/test/IOS_qr_instruction.pdf"
   */
  url: string;
  /**
   * Тип файла в MIME-type формате
   * @example "application/pdf"
   * @example "image/gif"
   */
  fileType: string;
  /**
   * Если true, то файл будет доступен для скачивания.
   */
  download?: boolean;
  /**
   * Если true, то файл будет доступен для подписания (если тип файла).
   @deprecated
   */
  subscribe?: boolean;
  /**
   * Если true, то файл будет доступен для подписания
   */
  sign?: boolean;
  /**
   * Текст кнопки
   * @default 'перейти к подписанию'
   */
  signText?: string;
}

export interface IDocumentsProps extends TemplateProps {
  /**
   * Заголовок виджета.
   */
  title: string;
  /**
   * Список документов для отображения в виджете.
   * Максимально - 5 документов.
   */
  documents: DocumentProps[];
  /**
   * Если true, то будет доступна возможность скачать все файлы.
   */
  downloadAll?: boolean;
}

```

### FILE: src/templates/Event/types.ts
```typescript
import type { TemplateProps } from "../types";

export interface EventProps extends TemplateProps {
  /**
   * Доступные даты
   */
  availableDates?: Array<{
    end?: string;
    start: string;
  }>;
  /**
   * Описание
   */
  description: string | undefined;
  /**
   * ID
   */
  id: number | string;
  /**
   * Изображение
   */
  image?: string;
  /**
   * Локаль
   */
  locale: string;
  /**
   * Название
   */
  name: string;
  /**
   * Место
   */
  place?: string;
  /**
   * Количество оставшихся мест
   */
  placesLeft?: number;
  /**
   * Количество мест всего
   */
  placesTotal?: number;
  /**
   * Тип
   */
  type: string | undefined;
}

```

### FILE: src/templates/Events/types.ts
```typescript
import type { TemplateProps } from "../types";

export type EventAction = "SEND_EVENT" | "SHOW_EVENT";

export interface EventProps extends Record<string, unknown> {
  date?: string;
  id: number | string;
  image?: string;
  multipleDates?: boolean;
  name: string | undefined;
  place?: string;
  placesLeft?: number;
  placesTotal?: number;
  type: string | undefined;
  timeEnd?: string;
  timeStart?: string;
}

export interface EventsProps extends TemplateProps {
  /**
   * An array or object of items
   */
  items: EventProps[];
  /**
   * A locale
   */
  locale: string;
}

export type EventsItemProps = Pick<EventsProps, "locale"> &
  EventProps &
  TemplateProps;

```

### FILE: src/templates/People/types.ts
```typescript
import badges from "../../blocks/Avatar/badges";
import type { TemplateProps } from "../types";

export interface ItemProps {
  /**
   * Аватар
   */
  avatar?: string;
  /**
   * Бейдж (на аватаре)
   */
  badge?: keyof typeof badges;
  /**
   * Дополнительный текст
   */
  caption?: string;
  /**
   * Электронная почта
   */
  email?: string;
  /**
   * ID
   */
  id: number | string;
  /**
   * Имя
   */
  name?: string;
  /**
   * Телефон
   */
  phone?: string;
  /**
   * Должность
   */
  position?: string;
  /**
   * Подразделение
   */
  unit?: string;
  /**
   * Обработчик события нажатия на карточку
   */
  onClick?: () => void;
}

export interface PeopleProps extends TemplateProps {
  /**
   * Массив карточек
   */
  items: Array<ItemProps> | undefined;
  /**
   * Заголовок
   */
  title: string;
}

```

### FILE: src/templates/Plug/types.ts
```typescript
export interface PlugProps {
  /**
   * Заголовок
   */
  title?: string;
  /**
   * Описание
   */
  description?: string;
}

```

### FILE: src/templates/Quantity/types.ts
```typescript
import type { TemplateProps } from "../types";

export interface QuantityProps extends TemplateProps {
  /**
   * Подпись кнопки
   */
  button: string;
  /**
   * Максимальное значение
   */
  max?: number;
  /**
   * Минимальное значение
   */
  min?: number;
  /**
   * Заголовок
   */
  title: string;
  /**
   *  Единица измерения
   *
   * @default "экз"
   */
  unit?: string;
  /**
   * Начальное значение
   */
  value?: number;
}

```

### FILE: src/templates/Summary/types.ts
```typescript
import type { TagColor } from "../../components/Tags/Tag/types";
import type { TemplateProps } from "../types";

export interface SummaryProps extends TemplateProps {
  /**
   * Подписи к кнопкам
   */
  buttons: {
    reset?: string;
    submit: string;
  };
  /**
   * Массив элементов
   */
  items: SummaryItemProps[];
  /**
   * Дополнительный текст
   */
  label?: string;
  /**
   * Промпты
   */
  prompt?: {
    reset?: string;
    submit: string;
  };
  /**
   * Заголовок
   */
  title: string;
}

export interface BaseSummaryItemProps {
  label: string;
}

export interface TagsSummaryItemProps extends BaseSummaryItemProps {
  tags: Array<{
    color: TagColor;
    label: string;
  }>;
}

export interface UserSummaryItemProps extends BaseSummaryItemProps {
  avatar?: string;
  name: string;
}

export interface ValueSummaryItemProps extends BaseSummaryItemProps {
  value: string;
}

export type SummaryItemProps =
  | TagsSummaryItemProps
  | UserSummaryItemProps
  | ValueSummaryItemProps;

```

### FILE: src/templates/types.ts
```typescript
import type { ISuggestSetAction } from "../types";

export interface TemplateProps extends Record<string, unknown> {
  /**
   * Обработчик события вызова экшна `suggest.set`
   */
  onSuggestSet: (
    value: ISuggestSetAction["value"],
    options?: { preventDisable: boolean }
  ) => void;
}

```

### FILE: src/utils/floating-ui/types.ts
```typescript
import {
  Placement,
  useInteractions,
  UseFloatingReturn,
  Middleware,
  Strategy,
  UseHoverProps,
} from "@floating-ui/react";
import { MutableRefObject, ReactElement } from "react";

type InteractionType = "hover" | "click" | "focus" | "dismiss" | "clientPoint";

export interface FloatingProps {
  isOpen?: boolean;
  onChange?: (isOpen: boolean) => void;
  disabled?: boolean;
  /**
   * Тип взаимодействия с триггером
   */
  interactionType?: InteractionType[];
  /**
   * Элемент триггера.
   */
  trigger?: ReactElement;
  /**
   * Базовое расположение контента.
   * @default bottom
   */
  placement?: Placement;
  /**
   * Стратегия, используемая при позиционировании содержимого
   * @default absolute
   */
  strategy?: Strategy;
  /**
   * Список применяемых (модификаторов)[https://floating-ui.com/docs/middleware]
   */
  middleware?: Middleware[];
  /**
   * Ожидание указанного времени перед стартом событий hover.
   * Используется для задержки перед показом элемента, в миллисекундах.
   *
   * Также можно указать объект с временем задержки как открытия, так и закрытия всплывающего элемента.
   *
   * @link https://floating-ui.com/docs/usehover#delay
   * @default 300
   */
  delay?: number | UseHoverProps["delay"];
  arrowComponent?: ReactElement;
  /**
   * Отступ между `arrowComponent` и краем всплывающего элемента.
   * @link https://floating-ui.com/docs/arrow#padding
   * @default 0
   */
  arrowPadding?: number;
}

export interface FloatingContextArgs
  extends Pick<UseFloatingReturn, "refs" | "context" | "floatingStyles">,
    Pick<
      ReturnType<typeof useInteractions>,
      "getFloatingProps" | "getReferenceProps"
    > {
  arrowComponent?: ReactElement;
  arrowRef: MutableRefObject<ArrowElem>;
  open: boolean;
  strategy: Strategy;
}

export type ArrowElem = SVGSVGElement | null;

```

### FILE: src/utils/fullscreen/types.ts
```typescript
export interface DocumentWithPrefixes {
  fullscreenElement: Element | null;
  msFullscreenElement?: Element;
  webkitFullscreenElement?: Element;
  msExitFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
  webkitFullscreenEnabled?: boolean;
  msFullscreenEnabled?: boolean;
}

export interface DivElementWithPrefixes {
  msRequestFullscreen?: () => void;
  webkitRequestFullscreen?: () => void;
}

```
