# Context Snapshot for src
Generated: 2026-07-13T16:51:15.757Z
Total files: 264

---

### FILE: src/blocks/AvatarStack/types.ts
```typescript
import { Avatar as UIAvatar } from "../../components/Avatar";
import { AvatarStack as UIAvatarStack } from "../../components/AvatarStack";
import type { InferStyledProps, Unwrap } from "../types";

type UIAvatarProps = Unwrap<InferStyledProps<typeof UIAvatar>>;

export interface AvatarStackProps {
  /**
   * Array of avatars (an array of 2 avatars if type is `double`)
   */
  items: Array<Pick<UIAvatarProps, "text" | "icon">> | undefined;
  /**
   * Maximum number of avatars to display (when type is `ordinary`)
   */
  max?: number;
  /**
   * Size
   * @default 'm'
   */
  size?: Extract<InferStyledProps<typeof UIAvatarStack>["$size"], "m" | "s">;
  /**
   * Type
   * @default 'ordinary'
   */
  type?: InferStyledProps<typeof UIAvatarStack>["$type"];
}

```

### FILE: src/blocks/Background/types.ts
```typescript
import type { CSSProperties } from "react";

export interface BackgroundProps {
  /**
   * Position
   */
  position?: CSSProperties["backgroundPosition"];
  /**
   * Url
   */
  url: string;
}

```

### FILE: src/blocks/Bar/types.ts
```typescript
import type { DefaultTheme } from "styled-components";

export interface BarData {
  /**
   * Color
   */
  color?: Exclude<
    keyof DefaultTheme["tokens"]["current"]["colors"],
    "black" | "white"
  >;
  category?: string;
  /**
   * Current value
   */
  value: number | undefined;
  label?: string;
}

export interface BarProps extends BarData {
  max: number | undefined;
  /**
   * true, если отображается в вертикальном списке Bar'ов
   *
   * нужен, чтобы корректно выстраивать grid
   */
  manyRows?: boolean;
}

```

### FILE: src/blocks/Cell/types.ts
```typescript
import type { CellProps as UICellProps } from "../../components/Cell/types";

type UICellPropsStrict = {
  [K in keyof UICellProps as string extends K ? never : K]: UICellProps[K];
};

export interface CellProps
  extends Omit<
    UICellPropsStrict,
    "about" | "avatarNode" | "avatarSrc" | "actionContent" | "badgeContent"
  > {
  /**
   * Основные данные
   */
  about: UICellProps["about"] | undefined;
  /**
   * URL аватара
   */
  avatar?: UICellProps["avatarSrc"];
  /**
   * Контент в правой части
   */
  children?: UICellProps["actionContent"];
}

```

### FILE: src/blocks/CellButton/types.ts
```typescript
import type { CellButtonProps as BaseCellButtonProps } from "../../components/CellButton";
import icons from "../Icon/icons";
import type { Unwrap } from "../types";

export interface CellButtonProps
  extends Unwrap<Pick<BaseCellButtonProps, "$size" | "$type" | "onClick">> {
  /**
   * Icon
   */
  icon?: keyof typeof icons;
  /**
   * Icon position
   */
  iconPosition?: "left" | "right";
  /**
   * Label
   */
  label: string;
}

```

### FILE: src/blocks/Chart/Column/types.ts
```typescript
import { LineChart as PulseChart } from "@pulse/charts/components/LineChart";
import type { ComponentProps } from "react";

export interface ColumnProps
  extends Pick<ComponentProps<typeof PulseChart>, "categories"> {
  data: number[][];
}

```

### FILE: src/blocks/Chart/Line/types.ts
```typescript
export interface LineProps {
  /**
   * Axis options
   */
  axis?: {
    x?: {
      label: string;
    };
    y?: {
      label: string;
    };
  };
  /**
   * Array of categories (x-axis values)
   */
  categories: string[] | undefined;
  /**
   * Array of series
   */
  data: number[][] | undefined;
}

```

### FILE: src/blocks/Chart/Micro/types.ts
```typescript
import { MicroChartProps as PulseChartProps } from "@pulse/charts/components/MicroChart";

export interface MicroProps extends Omit<PulseChartProps, "data"> {
  /**
   * Array of values
   */
  data: number[] | undefined;
}

```

### FILE: src/blocks/Chart/Pie/types.ts
```typescript
import { PieChart as PulsePieChart } from "@pulse/charts/components/PieChart";
import { ComponentProps } from "react";
import type { DefaultTheme } from "styled-components";

export type TextSize = "s" | "m";
export type TypographyVariant = "body1Semibold" | "h4Semibold";

interface PieData
  extends Omit<
    ComponentProps<typeof PulsePieChart>["data"][number],
    "additionalValue" | "color"
  > {
  color?: Exclude<
    keyof DefaultTheme["tokens"]["current"]["colors"],
    "black" | "white"
  > | null;
}
export interface PieProps {
  /**
   * Array of sections
   */
  data: Array<PieData> | undefined;
  /**
   * Label
   */
  label?: string;
  /**
   * Value
   * @todo remove string
   */
  value?: number | string;
  /**
   * Size
   * @default 's'
   */
  size?: "s" | "m";
}

```

### FILE: src/blocks/Counter/types.ts
```typescript
import { RoundGrade as UIRoundCounter } from "../../components/Grade/RoundGrade";
import type { InferStyledProps, Unwrap } from "../types";

export interface BaseCounterProps {
  /**
   * Value
   */
  value: string | number;
}

export type RoundCounterProps = Unwrap<
  InferStyledProps<typeof UIRoundCounter>
> &
  BaseCounterProps;

```

### FILE: src/blocks/Delta/ArrowIcon/types.ts
```typescript
import type { DefaultTheme } from "styled-components";

export interface ArrowIconProps {
  color: keyof DefaultTheme["tokens"]["current"]["colors"];
}

```

### FILE: src/blocks/Delta/types.ts
```typescript
export interface DeltaProps {
  /**
   * Locale
   */
  locale: string;
  /**
   * Period
   */
  period?: string;
  /**
   * Size
   * @default 's'
   */
  size?: "m" | "s";
  /**
   * Trend
   * @default NEUTRAL
   */
  trend?: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  /**
   * Unit
   */
  unit?: string;
  /**
   * Value
   */
  value: number | undefined;
}

```

### FILE: src/blocks/FallbackContainer/types.ts
```typescript
import { PropsWithChildren } from "react";

export interface FallbackContainerProps extends PropsWithChildren {
  isDataPresent: boolean | undefined;
  fallBackText?: string;
}

```

### FILE: src/blocks/File/types.ts
```typescript
export interface FileProps {
  /**
   * Label
   */
  label: string;
  /**
   * Url to a file
   */
  url: string;
}

```

### FILE: src/blocks/Form/types.ts
```typescript
import { FormField as UIFormField } from "../../components/deprecated/FormField";
import type { InferStyledProps } from "../types";

export type FormDataRecord = Record<string, string | File>;

export interface FieldProps
  extends Omit<InferStyledProps<typeof UIFormField>, "label"> {
  /**
   * HTML `id` attribute
   */
  id?: string;
  /**
   * Label
   */
  label?: string;
  /**
   * Validation messages
   */
  validation?: {
    tooLong?: string;
    tooShort?: string;
    typeMismatch?: string;
    valueMissing?: string;
  };
}

export interface FormProps {
  onSubmit?: (value: Record<string, FormDataEntryValue>) => void;
}

```

### FILE: src/blocks/Gigabox/types.ts
```typescript
export interface GigaBoxProps {
  children: React.ReactNode;
  state?: GigaBoxState;
  onStateChange?: (state: GigaBoxState) => void;
  prompt?: string;
}

export interface GroupedContent {
  [groupName: string]: {
    header: string;
    items: string[];
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  ungrouped?: string[];
}

export type GigaBoxState =
  | "idle"
  | "analysing"
  | "success"
  | "error"
  | undefined;

```

### FILE: src/blocks/Grade/types.ts
```typescript
import { RoundGrade as UIRoundGrade } from "../../components/Grade/RoundGrade";
import type { InferStyledProps, Unwrap } from "../types";

export interface BaseGradeProps {
  /**
   * Value
   */
  value: string | number;
}

export type RoundGradeProps = Unwrap<InferStyledProps<typeof UIRoundGrade>> &
  BaseGradeProps;

```

### FILE: src/blocks/Grid/types.ts
```typescript
import type { CSSProperties } from "react";

export interface GridProps {
  /**
   * Align
   * @default 'stretch'
   */
  align?: Extract<
    CSSProperties["alignItems"],
    "center" | "start" | "end" | "stretch"
  >;
}

```

### FILE: src/blocks/Icon/types.ts
```typescript
import type { HTMLAttributes } from "react";
import type { DefaultTheme } from "styled-components";
import icons from "./icons";

export interface IconProps
  extends Pick<HTMLAttributes<HTMLDivElement>, "onClick"> {
  /**
   * Color
   */
  color?: keyof DefaultTheme["tokens"]["current"]["core"]["icon"];
  /**
   * Name
   */
  icon: keyof typeof icons;
  /**
   * Size
   */
  size?: "s" | "m" | "l";
  /**
   * Tooltip
   */
  tooltip?: string;
}

```

### FILE: src/blocks/Image/types.ts
```typescript
import { CSSProperties } from "styled-components";
import { SVG_IMAGES } from "./constants";

export interface ImageProps {
  /**
   * An HTML alt attribute
   */
  alt: string;
  /**
   * An aspect ratio (any value consumable by aspect-ratio CSS property)
   */
  aspectRatio?: CSSProperties["aspectRatio"];
  /**
   * A url to an image (any value consumable by srcSet attribute)
   */
  src:
    | string
    | {
        "1x": string;
        "2x": string;
      };
  // TODO remove this
  width?: number;
  // TODO remove this
  type?: keyof typeof SVG_IMAGES;
}

```

### FILE: src/blocks/Info/types.ts
```typescript
export interface InfoProps {
  text?: string;
}

```

### FILE: src/blocks/Input/types.ts
```typescript
import { StyledInput as UIInput } from "../../components/Input";
import { TimeCounter as UITimeCounter } from "../../components/TimeCounter";
import type { ComponentProps } from "react";
import type { InferStyledProps } from "../types";

export interface DiscreteProps
  extends Omit<
    ComponentProps<typeof UITimeCounter>,
    "$decrease" | "$increase" | "defaultValue"
  > {
  label?: string;
}

export type TextProps = Pick<
  InferStyledProps<typeof UIInput>,
  | "autoFocus"
  | "defaultValue"
  | "disabled"
  | "id"
  | "max"
  | "maxLength"
  | "min"
  | "minLength"
  | "name"
  | "placeholder"
  | "required"
  | "type"
  | "onChange"
>;

```

### FILE: src/blocks/Link/types.ts
```typescript
import type { DefaultTheme } from "styled-components";

export interface LinkProps {
  // Открывать в новом окне
  blank?: boolean;
  // URL
  href: string;
  // Типографика
  type?: Extract<
    keyof DefaultTheme["typography"],
    | "body1Regular"
    | "body1Semibold"
    | "body2Regular"
    | "body2Semibold"
    | "captionRegular"
    | "captionSemibold"
  >;
  // Текст
  text: string;
}

```

### FILE: src/blocks/Progress/types.ts
```typescript
export interface ProgressProps {
  value: number | undefined;
}

```

### FILE: src/blocks/Select/Checkboxes/types.ts
```typescript
import type { CheckboxProps as PulseCheckboxProps } from "../../../components/Checkbox";
import type { CustomChangeEvent } from "../../../types";

interface OptionProps {
  /**
   * Если `true`, то элемент будет отключен
   */
  disabled?: boolean;
  /**
   * ID
   */
  id: string;
  /**
   * Подпись
   */
  label: string;
}

export interface CheckboxesProps {
  /**
   * Значение по умолчанию
   */
  defaultValue?: string[];
  /**
   * Массив элементов
   */
  items: OptionProps[];
  /**
   * Размер
   */
  size?: PulseCheckboxProps["$size"];
  /**
   * Обработчик события onChange
   */
  onChange?: (event: CustomChangeEvent<OptionProps[]>) => void;
}

```

### FILE: src/blocks/Select/Multi/types.ts
```typescript
import type { SelectProps } from "../../../components/Multiselect/types";
import type { CustomChangeEvent } from "../../../types";

interface OptionProps {
  /**
   * Дополнительный текст
   */
  caption?: string;
  /**
   * Если `true`, то элемент будет отключен
   */
  disabled?: boolean;
  /**
   * ID
   */
  id: string;
  /**
   * Подпись
   */
  label: string;
}

export interface MultiProps extends Pick<SelectProps, "placeholder"> {
  /**
   * Если `true`, то селект будет очищаемым
   */
  clearable?: boolean;
  /**
   * Значение по умолчанию
   */
  defaultValue?: string[];
  /**
   * Если `true`, то блок будет отключен
   */
  disabled?: boolean;
  /**
   * Подпись
   * @deprecated Подпись должна задаваться вне этого блока
   */
  label?: string;
  /**
   * Массив элементов
   */
  options: OptionProps[];
  /**
   * Если `true`, то селект будет фильтруемым
   */
  searchable?: boolean;
  /**
   * Обработчик события onChange
   */
  onChange?: (event: CustomChangeEvent<OptionProps[]>) => void;
}

```

### FILE: src/blocks/Select/Radio/types.ts
```typescript
import type { CustomChangeEvent } from "../../../types";

interface OptionProps {
  /**
   * Если `true`, то элемент будет отключен
   */
  disabled?: boolean;
  /**
   * ID
   */
  id: string;
  /**
   * Подпись
   */
  label: string;
}

export interface RadioProps {
  /**
   * Значение по умолчанию
   */
  defaultValue?: string;
  /**
   * Массив элементов
   */
  items: OptionProps[];
  /**
   * Обработчик события onChange
   */
  onChange?: (event: CustomChangeEvent<OptionProps>) => void;
}

```

### FILE: src/blocks/Select/Single/types.ts
```typescript
import { SelectProps } from "../../../components/Select/types";
import type { CustomChangeEvent } from "../../../types";

interface OptionProps {
  /**
   * Дополнительный текст
   */
  caption?: string;
  /**
   * Если `true`, то элемент будет отключен
   */
  disabled?: boolean;
  /**
   * ID
   */
  id: string;
  /**
   * Подпись
   */
  label: string;
}

export interface SingleProps extends Pick<SelectProps, "placeholder"> {
  /**
   * Если `true`, то селект будет очищаемым
   */
  clearable?: boolean;
  /**
   * Значение по умолчанию
   */
  defaultValue?: string;
  /**
   * Если `true`, то блок будет отключен
   */
  disabled?: boolean;
  /**
   * Подпись
   * @deprecated Подпись должна задаваться вне этого блока
   */
  label?: string;
  /**
   * Массив элементов
   */
  options: OptionProps[];
  /**
   * Если `true`, то селект будет фильтруемым
   */
  searchable?: boolean;
  /**
   * Обработчик события onChange
   */
  onChange?: (event: CustomChangeEvent<OptionProps>) => void;
}

```

### FILE: src/blocks/Stack/types.ts
```typescript
import type { CSSProperties } from "react";
import type { ClickableProps } from "../types";

export type StackMode = "none" | "dense" | "normal" | "sparse" | "wide";

export interface StackProps extends ClickableProps {
  /**
   * Выравнивание по основной оси (align-items)
   * @default 'start'
   */
  align?: Extract<
    CSSProperties["alignItems"],
    "baseline" | "center" | "end" | "start" | "stretch"
  >;
  /**
   * Выравнивание по дополнительной оси (justify-content)
   * @default 'start'
   */
  justify?: Extract<
    CSSProperties["justifyContent"],
    "center" | "end" | "space-between" | "start" | "stretch"
  >;
  /**
   * Размер отступов между ячейками
   * @default 'none'
   */
  mode?: StackMode;
}

```

### FILE: src/blocks/Table/types.ts
```typescript
export interface TableProps {
  /**
   * Array of columns
   */
  columns: string[];
  /**
   * Array of data
   */
  data: Array<Array<number | string>> | undefined;
  /**
   * Rows per page for pagination
   * @default 10
   */
  perPage?: number;
}

```

### FILE: src/blocks/Tags/types.ts
```typescript
import { TagProps } from "../Tag";

export interface TagsProps {
  tags: Pick<TagProps, "text" | "color">[] | undefined;
}

```

### FILE: src/blocks/Text/types.ts
```typescript
import type { CSSProperties, DefaultTheme } from "styled-components";

export interface TextProps {
  /**
   * Выравнивание по горизонтали
   */
  align?: Extract<CSSProperties["textAlign"], "left" | "center" | "right">;
  /**
   * Цвет
   */
  color?:
    | Exclude<
        keyof DefaultTheme["tokens"]["current"]["colors"],
        "black" | "white"
      >
    | Extract<
        keyof DefaultTheme["tokens"]["current"]["core"]["text"],
        "primary" | "secondary" | "tertiary"
      >;
  /**
   * Выключает перенос строк и добавляет многоточие в конце, если текст не помещается в ширину блока
   */
  noWrap?: boolean;
  /**
   * Текст
   */
  text: number | string | null | undefined;
  /**
   * Тултип
   */
  tooltip?: string;
  /**
   * Типографика
   */
  type?: Extract<
    keyof DefaultTheme["typography"],
    | "body1Regular"
    | "body1Semibold"
    | "body2Regular"
    | "body2Semibold"
    | "captionRegular"
    | "captionSemibold"
  >;
}

```

### FILE: src/blocks/Title/types.ts
```typescript
import { Title } from "../../components/Title";
import type { InferStyledProps, Unwrap } from "../types";

export interface TitleProps
  extends Unwrap<Pick<InferStyledProps<typeof Title>, "$size">> {
  /**
   * Значение счетчика
   */
  counter?: number;
  /**
   * Текст
   */
  text: string | undefined;
}

```

### FILE: src/blocks/types.ts
```typescript
import { ComponentProps } from "react";
import {
  AnyStyledComponent,
  StyledComponentInnerComponent,
  StyledComponentInnerOtherProps,
} from "styled-components";

export interface ClickableProps {
  onClick?: () => void;
}

export type InferStyledProps<T extends AnyStyledComponent> = ComponentProps<
  StyledComponentInnerComponent<T>
> &
  StyledComponentInnerOtherProps<T>;

export type Wrap<T> = {
  [K in keyof T as `$${Extract<K, string>}`]: T[K];
};

export type Unwrap<T> = {
  [K in keyof T as K extends `$${infer Q}` ? Q : K]: T[K];
};

```

### FILE: src/blocks/User/types.ts
```typescript
import type { MouseEventHandler } from "react";
import badges from "../Avatar/badges";

export interface BaseProps {
  /**
   * Url to avatar
   */
  avatar?: string;
  /**
   * Caption
   */
  caption?: string;
  /**
   * Aavatar status (icon)
   */
  status?: keyof typeof badges;
  /**
   * Name
   */
  name: string | undefined;
  /**
   * Position
   */
  position: string | undefined;
  /**
   * Phone
   */
  phone?: string;
  /**
   * Email
   */
  email?: string;
  /**
   * Variant
   */
  variant?: "primary" | "secondary";
}

export interface ClickableUserProps extends BaseProps {
  url?: string;
  onClick?: never;
}

export interface NonClickableUserProps extends BaseProps {
  url?: never;
  onClick?: MouseEventHandler;
}

export type UserProps = ClickableUserProps | NonClickableUserProps;

```

### FILE: src/blocks/UserList/types.ts
```typescript
import type { CustomChangeEvent } from "../../types";
import { UserProps } from "../User/types";

type EnhancedUserProps = UserProps & { id: number | string };

export interface UserListProps {
  /**
   * An array of users
   */
  data: Array<EnhancedUserProps> | undefined;
  /**
   * A callback that is called when a user is clicked
   */
  onChange?: (
    e: CustomChangeEvent<NonNullable<UserListProps["data"]>[number]>
  ) => void;
}

```

### FILE: src/components/Accordion/types.ts
```typescript
import { ReactNode } from "react";
import { CheckboxProps } from "../Checkbox";

export type Size = "xs" | "s" | "m" | "l" | "xl";

export interface AccordionProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  isDisabled?: boolean;
  isWithoutSpacing?: boolean;
  size?: Size;
  content?: ReactNode;
  headerButtons?: ReactNode[];
  withCheckbox?: boolean;
  onClickCheckbox?: (isChecked: boolean) => void;
  checkboxProps?: CheckboxProps;
  open?: boolean;
}

```

### FILE: src/components/ActionBar/types.ts
```typescript
import { MouseEventHandler } from "react";

type ActionBarButton = [
  string,
  MouseEventHandler<HTMLButtonElement | HTMLLIElement>
];
type ActionBarAlignmentType = "left" | "right";

export interface ActionBarProps {
  /**
   * Массив кнопок [[надпись на кнопке, обработчик нажатия]...].
   */
  buttons: ActionBarButton[];
  /**
   * Отображение количества выделенных элементов.
   * @default false
   */
  showCaption?: boolean;
  /**
   * Отображение компонента большей ширины в связи с тем, что скрыт sidebar.
   * @default false
   */
  noSidebar?: boolean;
  /**
   * Выравнивание кнопок.
   * @default right
   */
  $align?: ActionBarAlignmentType;
}

```

### FILE: src/components/ActionBarNew/types.ts
```typescript
import { ReactNode } from "react";

/** Выравнивание */
export type ActionBarNewAlignmentType = "left" | "right";

export type ActionBarNewItem = {
  /** Текст кнопки/пункта */
  label: string;
  /** Обработчик клика */
  onClick: () => void;
  /** Отключён ли элемент */
  disabled?: boolean;
};

export interface ActionBarNewProps {
  /** Дочерние элементы */
  children?: ReactNode;
  /** Выравнивание */
  align?: ActionBarNewAlignmentType;
  /** Основное действие */
  primaryAction?: ActionBarNewItem;
  /** Вторичное действие */
  secondaryAction?: ActionBarNewItem;
  /** Третичное действие */
  tertiaryAction?: ActionBarNewItem;
  /** Действия в выпадающем меню */
  dropdownActions?: ActionBarNewItem[];
  /** Показывать кнопку "Ещё" */
  moreActions?: boolean;
  /** Текст подсказки */
  caption?: string;
}

```

### FILE: src/components/Actions/types.ts
```typescript
import { PropsWithChildren } from "react";
import { ActionSheetProps } from "../ActionSheet";
import { Size } from "../Button/types";

export interface Item extends PropsWithChildren {
  /**
   * Уникальный идентификатор
   */
  id: string;
  /**
   * Коллбэк при клике
   */
  onClick?: () => void;
}

export interface ActionsProps {
  /**
   * Список действий.
   */
  items: Item[];
  /**
   * Размер компонента.
   */
  size?: ActionsSize;
  /**
   * Выравнивание списка действий.
   */
  align?: ActionSheetProps["$align"];
}

export type ActionsSize = Exclude<Size, "xs" | "s" | "m-alt">;

```

### FILE: src/components/ActionSheet/Menu/types.ts
```typescript
import { ReactElement } from "react";

export interface MenuProps {
  $onAction?: (item: ReactElement) => void;
  children: ReactElement | ReactElement[];
  hasMobileMaxHeight?: boolean;
}

export interface MenuItemProps {
  $disabled?: boolean;
  $hasDivider?: boolean;
}

```

### FILE: src/components/ActionSheet/types.ts
```typescript
import { Middleware } from "@floating-ui/react";
import { ReactElement, ReactNode, RefAttributes } from "react";

export interface ActionSheetProps {
  /**
   * Элемент триггер.
   */
  $trigger: ReactElement & RefAttributes<HTMLElement>;
  /**
   * Выравнивание.
   * @default start
   */
  $align?: "start" | "end";
  /**
   * Направление.
   * @default bottom
   */
  $direction?: "bottom" | "top";
  /**
   * Список применяемых (модификаторов)[https://floating-ui.com/docs/middleware]
   */
  $middleware?: Middleware[];
  /**
   * Заголовок для мобильной версии
   */
  mobileTitle?: string;
  /**
   * Кнопки для мобильной версии
   */
  mobileButtons?: ReactNode;
  /**
   * Коллбэк открытия/закрытия поповера
   */
  onTogglePopover?: (isPopoverOpen: boolean) => void;

  /**
   * Текущее состояние (открыт / закрыт).
   * @default false
   */
  isOpen?: boolean;

  /**
   * Обработчик изменения состояния.
   */
  onChange?: (isOpen: boolean) => void;
}

```

### FILE: src/components/Avatar/Content/types.ts
```typescript
import { Size, AvatarProps, Shape } from "../types";
import { CustomStyledProps } from "../../../types";

export interface ContentProps {
  $type: AvatarProps["$type"];
  $text: AvatarProps["$text"];
  $size: Size;
  $icon: AvatarProps["$icon"];
  $shape: Shape;
  $fallbackType: AvatarProps["$fallbackType"];
}

export type TextSizes = CustomStyledProps<Size>;

export interface WrapperProps {
  $shape: Shape;
  $size: Size;
}

```

### FILE: src/components/Avatar/MoreButton/types.ts
```typescript
import { AvatarProps } from "../types";

export type MoreButtonProps = {
  $size?: AvatarProps["$size"];
  onClick?: () => void;
};

```

### FILE: src/components/Avatar/Progress/types.ts
```typescript
export type Progress = "25%" | "50%" | "75%" | "100%";
export interface ProgressProps {
  $percent: Progress;
  $color?: string;
}

```

### FILE: src/components/Avatar/types.ts
```typescript
import { ReactNode } from "react";

import { GradeProps } from "../Grade/RoundGrade";

type AvatarType =
  | "default"
  | "initials"
  | "empty"
  | "noCandidate"
  | "grade-long"
  | "grade-short";

export type Shape = "circle" | "square";

export interface AvatarProps {
  /**
   * Тип компонента.
   */
  $type?: AvatarType;
  /**
   * Иконка, используемая в аватаре.
   * Может быть ссылкой или компонентом.
   */
  $icon?: ReactNode | string;
  /**
   * Размер компонента.
   * @default l
   */
  $size?: Size;
  /**
   * Форма компонента.
   */
  $shape?: Shape;
  /**
   * Текст.
   * @example АВ
   */
  $text?: ReactNode;
  /**
   * Лейбл.
   * - Передается количество подчиненных или должность
   * - Не используется с размерами меньше `m`
   */
  $label?: ReactNode;
  /**
   * Имеет бейдж.
   */
  $hasBadge?: boolean;
  /**
   * Статус.
   *
   * Можно передать любую иконку.
   *
   * Размеры: `l`, `m`
   */
  $status?: ReactNode;
  /**
   * Статус верификации.
   *
   * Размеры: `xxl`, `l`, `m`
   */
  $verificationStatus?: VerificationStatus;
  /**
   * Тип фоллбэка.
   *
   * Используется, если нужен фоллбэк.
   */
  $fallbackType?: Omit<AvatarType, "default">;
}

export type VerificationStatus = "accept" | "decline" | "no_result";
export type Size = "xs" | "s" | "m" | "l" | "xl" | "xxl";
export type MapToCounterSize = Partial<Record<Size, GradeProps["$size"]>>;
export type AvatarSizesConst = Record<Size, number>;

```

### FILE: src/components/Avatar/Verification/types.ts
```typescript
import { VerificationStatus } from "../types";

export interface VerificationProps {
  $verificationStatus: VerificationStatus;
}

```

### FILE: src/components/AvatarStack/Button/types.ts
```typescript
import { SystemStyleObject } from "@styled-system/css";

import { Size } from "../types";

export interface ButtonProps {
  $size: Size;
}

export type Sizes = Record<Size, SystemStyleObject>;

```

### FILE: src/components/AvatarStack/types.ts
```typescript
export type ButtonSize = "m" | "s";
export type Size = "m" | "s" | "xs";
export type StackType = "ordinary" | "double";
type Overlap = "default" | "reverse";

export interface AvatarStackProps {
  /**
   * Тип.
   * @default ordinary
   */
  $type?: StackType;
  /**
   * Размер.
   * @default m
   */
  $size?: Size;
  /**
   * Вариант наложения.
   * @default 'default'
   */
  $overlap?: Overlap;
}

```

### FILE: src/components/Backdrop/types.ts
```typescript
export interface BackdropProps {
  /**
   * Выравнивание модального окна по вертикали (только для мобильных экранов)
   * @default false
   */
  $stickToBottomMobile?: boolean;
  /**
   * Если `true`, то скролл будет автоматически заблокирован при первом рендере компонента
   * @default true
   */
  lockScroll?: boolean;
  /**
   * Если `true`, то бэкдроп будет прозрачным
   * @default false
   */
  transparent?: boolean;
}

```

### FILE: src/components/BottomSheet/types.ts
```typescript
import React from "react";

export type BottomSheetProps = {
  /**
   * Признак открытости/закрытости компонента.
   */
  isOpen: boolean;
  /**
   * Функция - коллбэк для закрытия компонента.
   */
  onClose: () => void;
  /**
   * Высота компонента.
   */
  height?: string;
  /**
   * @ignore
   * Отключает рендеринг через createPortal.
   * Используется только для совместимости с компонентами, которые ломаются в portal (к примеру, react-datepicker)
   */
  disabledPortal?: boolean;
};

export type BottomSheetHeaderProps = {
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
};

```

### FILE: src/components/Box/types.ts
```typescript
import { DefaultTheme } from "styled-components";
import {
  BackgroundProps,
  BorderProps,
  ColorProps,
  FlexboxProps,
  GridProps,
  LayoutProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
  TypographyProps,
  BackgroundColorProps,
  BordersProps,
} from "styled-system";

export interface BoxProps
  extends BackgroundProps<DefaultTheme>,
    BorderProps<DefaultTheme>,
    ColorProps<DefaultTheme>,
    FlexboxProps<DefaultTheme>,
    GridProps<DefaultTheme>,
    LayoutProps<DefaultTheme>,
    PositionProps<DefaultTheme>,
    ShadowProps<DefaultTheme>,
    SpaceProps<DefaultTheme>,
    TypographyProps<DefaultTheme>,
    BackgroundColorProps<DefaultTheme>,
    BordersProps<DefaultTheme> {}

```

### FILE: src/components/BreadcrumbsDynamic/DropDown/types.ts
```typescript
import { ReactElement } from "react";
import type { BreadcrumbItem, BreadcrumbsProps } from "../types";

export type DropDownProps = {
  hiddenItems: BreadcrumbItem[];
  mobileTitle: BreadcrumbsProps["mobileTitle"];
  trigger?: ReactElement;
};

```

### FILE: src/components/BreadcrumbsDynamic/MobileContainer/types.ts
```typescript
import type { BreadcrumbItem, BreadcrumbsProps } from "../types";

export type MobileContainerProps = {
  items: BreadcrumbItem[];
  mobileTitle?: BreadcrumbsProps["mobileTitle"];
};

```

### FILE: src/components/BreadcrumbsDynamic/StandardContainer/types.ts
```typescript
import type { BreadcrumbItem, BreadcrumbsProps } from "../types";

export type StandardContainerProps = {
  items: BreadcrumbItem[];
  mobileTitle: BreadcrumbsProps["mobileTitle"];
};

```

### FILE: src/components/BreadcrumbsDynamic/types.ts
```typescript
import type { DOMAttributes, FC, LinkHTMLAttributes } from "react";

/**
 * Пропсы компонента "Breadcrumbs" (хлебные крошки).
 */
export interface BreadcrumbsProps {
  /**
   * Массив элементов хлебных крошек.
   * Каждый элемент может быть либо заполненным (`BreadcrumbItemFilled`), либо
   * скелетоном для состояния загрузки (`BreadcrumbItemSkeleton`).
   *
   * @required
   */
  items: BreadcrumbItem[];

  /**
   * Кастомный компонент для рендеринга ссылок.
   * Передайте компонент вашего роутера (например, `Link` из React Router)
   * вместо стандартного `<a>`. Компонент должен принимать
   * атрибуты HTMLAnchorElement (`href`, `onClick`, `title` и т.д.).
   *
   * @default "a"
   */
  linkComponent?: FC<LinkHTMLAttributes<HTMLAnchorElement>>;

  /**
   * Заголовок дропдауна в мобильной версии.
   * Отображается вверху выпадающего списка на мобильных устройствах.
   *
   * @default "навигация"
   */
  mobileTitle?: string;
}

/**
 * Заполненный элемент хлебной крошки с заголовком и ссылкой.
 */
interface BreadcrumbItemFilled {
  /**
   * Текст элемента хлебной крошки.
   */
  title: string;

  /**
   * URL ссылки, на которую ведёт элемент.
   */
  href: string;

  /**
   * Обработчик клика по элементу.
   * Если передан, то будет вызван **вместо** стандартного перехода по `href`.
   */
  onClick?: DOMAttributes<HTMLAnchorElement>["onClick"];
}

/**
 * Элемент хлебной крошки в состоянии загрузки (скелетон).
 * Отображается в виде анимированного серого прямоугольника.
 */
interface BreadcrumbItemSkeleton {
  /**
   * Флаг включения режима скелетона.
   * Установите в `true`, чтобы показать заглушку загрузки вместо текста.
   *
   * @example
   * ```tsx
   * { skeleton: true }
   * ```
   */
  skeleton: true;
}

/**
 * Элемент хлебной крошки.
 *
 * Discriminated union по полю `skeleton`:
 * - `{ skeleton: true }` — состояние загрузки (показан анимированный скелетон)
 * - `{ title: string; href: string }` — заполненный элемент с текстом и ссылкой
 *
 * @see BreadcrumbsProps — пропсы компонента Breadcrumbs
 */
export type BreadcrumbItem = BreadcrumbItemFilled | BreadcrumbItemSkeleton;

```

### FILE: src/components/Button/Icon/types.ts
```typescript
import type { ButtonHTMLAttributes } from "react";
import { Size, State, Type } from "../types";

export type IconSize = Exclude<Size, "xs" | "m-alt"> | "xl" | "xxl";
export type IconType =
  | Exclude<Type, "mono" | "monoSecondary" | "tertiary">
  | "destructive"
  | "default";

export interface IconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $state?: State | "default";
  $type?: IconType;
  size?: IconSize;
  color?: string;
}

```

### FILE: src/components/Button/IconButton/types.ts
```typescript
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Size, Type } from "../types";

export type IconButtonSize = Size;

export type IconType = Type | "monoTertiary" | "destructive" | "filled";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  $state?: "default" | "hover" | "pressed" | "disabled" | "load";
  $type?: IconType;
  size?: IconButtonSize;
  color?: string;
  isLoading?: boolean;
  filledPressedIcon?: ReactNode;
}

```

### FILE: src/components/Button/More/types.ts
```typescript
import { ButtonProps, Size } from "../types";

export type MoreSize = Exclude<Size, "m-alt">;
export type MoreProps = Omit<ButtonProps, "$containsOnlyIcon"> & {
  $size?: MoreSize;
};

```

### FILE: src/components/Button/Selection/types.ts
```typescript
import type { ButtonHTMLAttributes } from "react";
import { State } from "../types";

export type Size = "m" | "l";

export interface SelectionProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  count?: number;
  /**
   * Описание.
   */
  description?: string;
  /**
   * Значение.
   */
  title?: string;
  /**
   * Выбор был совершён или значение было установлено заранее.
   */
  isDefined?: boolean;
  state?: State;
  /**
   * Состояние Dropdown.
   */
  isTurned?: boolean;
  /**
   * Размер.
   * @default "m"
   */
  size?: Size;
}

export interface IconProps {
  $isTurned?: boolean;
}

export interface ContainerProps {
  $withCounter?: boolean;
}

```

### FILE: src/components/Button/types.ts
```typescript
export interface ButtonProps {
  /**
   * Вариант отображения.
   * @default primary
   */
  $type?: Type;
  /**
   * Размер.
   * @default m
   */
  $size?: Size;
  /**
   * Текущее состояние.
   */
  $state?: State;
  /**
   * Содержит только иконку, без текста.
   */
  $containsOnlyIcon?: boolean;
  /**
   * Растягивать на полную ширину.
   */
  $fullWidth?: boolean;
  /**
   * Состояние загрузки.
   * @default false
   */
  $isLoading?: boolean;
}

export interface LoaderProps {
  $type: Type;
  $size: Size;
}

export type Type =
  | "primary"
  | "secondary"
  | "tertiary"
  | "mono"
  | "monoSecondary";

export type Size = "l" | "m" | "m-alt" | "s" | "xs";
export type State = "focus" | "hover" | "pressed";

```

### FILE: src/components/Card/types.ts
```typescript
import { ReactNode } from "react";
import type { DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { DefaultTheme } from "styled-components";
import { FloatingProps } from "../../utils/floating-ui/types";

export type Type = "default" | "contrast";
export type Variant = "primary" | "secondary";
export type Paddings = 8 | 12 | 16 | 20;
type DragHandleAlign = "none" | "top" | "center";
export interface StackProps {
  theme: DefaultTheme;
  $borderRadius: number;
  paddings?: Paddings;
  $type: Type;
}

export interface CardProps {
  /**
   * Наличие тени.
   * @default true
   */
  $shadow?: boolean;
  /**
   * Наличие границы.
   * @default false
   */
  $border?: boolean;
  /**
   * Наличие обводки.
   * @default default
   */
  $type?: Type;
  /**
   * Цвет фона.
   * @default primary
   */
  $variant?: Variant;
  /**
   * Размер внутренних отступов в пикселах.
   * @default 20
   */
  paddings?: Paddings;
  /**
   * Отключение элемента.
   * @default false
   */
  disabled?: boolean;
  /**
   * Скругления.
   * Для paddings 20 возможны скругления 8 или 12.
   * @default 12
   */
  $borderRadius?: 8 | 12;
  /**
   * Расположение кнопки для перетаскивания элемента.
   * @default none
   */
  dragHandle?: DragHandleAlign;
  /**
   * attributes и listeners из dnd-kit для элемента, за который перетаскивается карточка.
   */
  dragHandleProps?: DraggableAttributes & SyntheticListenerMap;
  /**
   * Текст сообщения, отображаемого у иконки перетаскивания (dragHandle),
   * когда перетаскивание отключено (disabled=true).
   * Используется для информирования пользователя о причинах, по которым перетаскивание недоступно.
   */
  dragHandleDisabledMessage?: ReactNode | string;
  /**
   * Позиция всплывающего элемента относительно триггера.
   * Определяет где будет отображаться Popover.
   * По умолчанию: "top-start".
   */
  dragHandleDisabledMessagePlacement?: FloatingProps["placement"];
  /**
   * Отображает карточки в виде стэка.
   */
  isStack?: boolean;
  /**
   * Отображает карточку в виде нового элемента.
   */
  isNewItem?: boolean;
  /**
   * Включает эффект тени при наведении.
   */
  canHover?: boolean;
}

```

### FILE: src/components/Carousel/Arrow/types.ts
```typescript
export type ArrowDirection = "left" | "right";

export interface ArrowProps {
  $direction?: ArrowDirection;
  $hidden?: boolean;
  "data-testid"?: string;
}

```

### FILE: src/components/Carousel/Dot/types.ts
```typescript
import type { DefaultTheme, CSSProperties } from "styled-components";
import { CustomStyledProps } from "../../../types";

export type Size = "s" | "m" | "l";

export interface DotStyledProps {
  $isActive?: boolean;
}

export interface DotProps extends DotStyledProps, ContainerStyledProps {
  /**
   * @default 0
   */
  $index?: number;
  style?: CSSProperties;
}

export interface ContainerStyledProps {
  /**
   * Количество отступов слева на размер элемента
   * @default 0
   */
  $offset?: number;
  /**
   * @default l
   */
  $size?: Size;
}

export type DotsActiveVariants = Record<
  "true" | "false",
  (theme: DefaultTheme) => CSSProperties
>;
export type DotsSizeVariants = CustomStyledProps<Size>;

```

### FILE: src/components/Carousel/DotsContainer/types.ts
```typescript
import type { ReactNode } from "react";
import type { CarouselProps } from "../types";

export interface ContainerProps {
  $isDynamic?: boolean;
  $width?: number;
}

export interface DotsContainerProps
  extends Pick<CarouselProps, "$dots" | "$dynamicDots">,
    Required<Pick<CarouselProps, "$dynamicDotsWidth">> {
  $dynamicDotsCount: number;
  $left: ReactNode;
  $right: ReactNode;
  $hideDots?: boolean;
}

```

### FILE: src/components/Carousel/types.ts
```typescript
import type { ReactElement, ReactNode } from "react";

interface CarouselApiArgs {
  setActiveSlide: (activeSlide: number) => void;
}

export type AdaptiveOptions = {
  tablet1?: number;
  tablet2?: number;
  tablet3?: number;
  tablet4?: number;
  mobile?: number;
};

export type CarouselPeekSide = "left" | "right" | "both";

export interface CarouselProps {
  /**
   * Наличие границ у содержимого слайдов.
   * @default false
   */
  $bordered?: boolean;
  /**
   * Режим зацикливания слайдов.
   * @default false
   */
  $loop?: boolean;
  /**
   * Флаг включения стрелок по бокам для управления.
   * @default true
   */
  $withArrows?: boolean;
  /**
   * Режим анимированного перелистывания слайдов
   * @default true
   */
  $withAnimation?: boolean;
  /**
   * Задержка в ms для автоматического переключения слайдов.
   * По умолчанию включает $loop.
   */
  $autoplay?: number;
  /**
   * Флаг скрытия точек для навигации.
   * @default false
   */
  $hideDots?: boolean;
  /**
   * Активный слайд по умолчанию.
   * @default 0
   */
  $defaultActiveSlide?: number;
  /**
   * Коллбэк изменения активного слайда.
   */
  $onChange?: (activeSlide: number) => void;
  /**
   * Элемент левой стрелки.
   */
  $leftArrow?: ReactElement;
  /**
   * Элемент правой стрелки.
   */
  $rightArrow?: ReactElement;
  /**
   * Элементы точек.
   */
  $dots?: ReactElement | ReactElement[];
  /**
   * Флаг влючения режима динамических точек.
   * @default true
   */
  $dynamicDots?: boolean;
  /**
   * Количество основных (больших) динамических точек.
   * @default 5
   */
  $dynamicDotsCount?: number;
  /**
   * Ширина контейнера точки (включая внешние отступы).
   * @default 16
   * @example 4px (marginLeft) + 8px (width) + 4px (marginRight)
   */
  $dynamicDotsWidth?: number;
  /**
   * Дочерние элементы.
   */
  children: ((args: CarouselApiArgs) => ReactNode) | ReactNode;
  /**
   * Количество слайдов, видимых одновременно.
   * @default 1
   */
  $visibleSlides?: number;
  /**
   *
   * Настройки адаптива.
   *
   * tablet 1 - от 1024 до 1279.
   *
   * tablet 2 - от 840 до 1023.
   *
   * tablet 3 - от 740 до 839.
   *
   * tablet 4 - от 600 до 719.
   *
   * mobile - до 600.
   *
   */
  $adaptiveOptions?: AdaptiveOptions;
  /**
   * Отступ между элементами на ленте карусели. Можно выключить, если есть необходимость убрать дефолтные отступы и задать кастомные.
   */
  $withMarginBetweenElements?: boolean;
  /**
   * Видимая часть обрезаемого слайда.
   * @default 0
   * @example 0.5
   */
  $nextSlidePeek?: number;
  /**
   * Сторона обрезки слайда.
   * @default "right"
   */
  $peekSide?: CarouselPeekSide;
}

export interface ActiveSlideStateType {
  animate: boolean;
  lastSlide: number;
  activeSlide: number;
  visualSlide?: number;
  renderSlide?: number;
  totalSlides: number;
  prev: number | null;
  next: number | null;
  direction: "prev" | "next" | null;
  $withAnimation: boolean;
  $loop?: boolean;
  disableTransition?: boolean;
  loopStartIndex?: number;
  loopEndIndex?: number;
  loopStep?: number;
  loopShift?: number;
  isLooping?: boolean;
}

export interface ActiveSlideActionType {
  type: "sliding" | "slideEnd" | "finishLoopJump" | "setLoop" | "updateState";
  payload?: {
    activeSlide?: number;
    $loop?: boolean;
    lastSlide?: number;
    loopStartIndex?: number;
    loopEndIndex?: number;
    loopStep?: number;
    loopShift?: number;
    totalSlides?: number;
  };

  /** Число слайдов на которое необходимо перелистнуть карусель */
  amount?: number;
}

export interface ContentProps {
  $activeSlide: number;
  $bordered?: boolean;
  $visibleSlides?: number;
  $leftPeek?: number;
  $rightPeek?: number;
  $trackOffset?: number;
  $disableTransition?: boolean;
}

export interface CarouselSlotProps {
  $visibleSlides: number;
  $leftPeek?: number;
  $rightPeek?: number;
  $disableTransition?: boolean;
  $margin: number | null;
}

export interface CarouselContextType {
  handleSlideTo: (index: number) => void;
  activeSlide: number;
  totalSlides: number;
}

export type RenderDotsProps = {
  $hideDots: CarouselProps["$hideDots"];
  $dotsProp: CarouselProps["$dots"];
  contentArray: Array<ReactNode>;
  dynamicConfig: DotsDynamicConfig;
};

export type RenderArrowsProps = {
  $withArrows: CarouselProps["$withArrows"];
  $leftArrowProp: CarouselProps["$leftArrow"];
  $rightArrowProp: CarouselProps["$rightArrow"];
  $leftHidden?: boolean;
  $rightHidden?: boolean;
};

export interface DotsDynamicConfig {
  startIndex: number;
  endIndex: number;
  offset: number;
}

```

### FILE: src/components/Cell/__stories__/types.ts
```typescript
import { ReactNode } from "react";
import {
  ACTION_KEYS,
  EXTRA_SUBTITLES_KEYS,
  SUBTITLES_KEYS,
  TITLE_KEYS,
} from "./const";
import { Size } from "../types";

// Явное получение типа из констант для лучшей типизации.
export type TitleKeys = (typeof TITLE_KEYS)[keyof typeof TITLE_KEYS];
export type SubtitlesKeys =
  (typeof SUBTITLES_KEYS)[keyof typeof SUBTITLES_KEYS];
export type ExtraSubtitleKeys =
  (typeof EXTRA_SUBTITLES_KEYS)[keyof typeof EXTRA_SUBTITLES_KEYS];
export type ActionKeys = (typeof ACTION_KEYS)[keyof typeof ACTION_KEYS];

export type TitleVariant =
  | "captionRegular"
  | "body2Regular"
  | "body1Regular"
  | "body1Semibold";

export type SubtitlesVariants =
  | "captionRegular"
  | "body2Regular"
  | "body1Regular";

export type TitleMap = Record<Size, Record<TitleKeys, string | ReactNode>>;
export type SubtitleMap = Record<
  Size,
  Record<SubtitlesKeys, string | ReactNode | undefined>
>;
export type ExtraSubtitleMap = Record<
  Size,
  Record<ExtraSubtitleKeys, string | ReactNode | undefined>
>;
export type ActionsMap = Record<
  Size,
  Record<ActionKeys, string | ReactNode | undefined>
>;

```

### FILE: src/components/Cell/Heading/types.ts
```typescript
import { ReactNode } from "react";
import { Variant } from "../types";

export type HeadingProps = {
  /**
   * Основной текст подзаголовка.
   */
  text: string;
  /**
   * Дополнительный текст подзаголовка.
   */
  additionalText?: string;
  /**
   * Значение грейда.
   */
  grade?: string;
  /**
   * Иконка слева (любой SVG-компонент).
   */
  leftIcon?: ReactNode;
  /**
   * Иконка справа (любой SVG-компонент).
   */
  rightIcon?: ReactNode;
  /**
   * Вариант шрифта.
   * @default body1Regular
   */
  variant?: Variant;
  /**
   * Тип заголовка, влияет на порядок отображения.
   * @default "subtitle"
   */
  headingType?: "title" | "subtitle";
};

```

### FILE: src/components/Cell/types.ts
```typescript
import { DefaultTheme } from "styled-components";
import { ReactElement, ReactNode } from "react";

type StringKeyof<T> = Extract<keyof T, string>;
export type Variant = StringKeyof<DefaultTheme["typography"]>;

export type Size = "xs" | "s" | "m" | "l" | "xl";

export interface CellWrapperProps {
  /**
   * Размер.
   * @default m
   */
  $size?: Size;
  /**
   * Флаг включения разделителя снизу.
   * @default false
   */
  $divider?: boolean;
  /** Отключение горизонтального padding
   * @default false
   */
  $noHorizontalPadding?: boolean;
  /**
   * Включить стили и поведение для состояний hover и active
   * @default false
   */
  $enableHoverActive?: boolean;
}

export interface AboutProps {
  /**
   * Основной заголовок.
   */
  title: ReactElement | string;
  /**
   * Подзаголовок.
   */
  subtitle?: ReactElement | string;
  /**
   * Дополнительный подзаголовок.
   */
  extraSubtitle?: ReactElement | string;
  /**
   * Текст ошибки — простой string
   */
  errorText?: string;
}

export interface CellProps {
  /**
   * Размер ячейки: "xl" | "l" | "m" | "s" | "xs"
   */
  size?: Size;
  /**
   * Показывать разделитель снизу (линия)
   */
  divider?: boolean;
  /**
   * URL аватара (если не используется avatarNode)
   */
  avatarSrc?: string;
  /**
   * Кастомный аватар — строго компонент Avatar с ожидаемыми пропсами
   */
  avatarNode?: ReactElement;
  /**
   * Секция с заголовком и подзаголовками внутри
   */
  about: AboutProps;
  /**
   * Бейдж или иконка слева
   */
  badgeContent?: ReactNode;
  /**
   * Контент в правой части ячейки — кнопки, иконки, чекбоксы и т.п.
   */
  actionContent?: ReactNode;
  /**
   * Обработчик клика по ячейке
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Отключение горизонтального padding
   * @default false
   */
  noHorizontalPadding?: boolean;
  /**
   * Включить стили и поведение для состояний hover и active
   * @default false
   */
  enableHoverActive?: boolean;
  /**
   * Другие дополнительные пропсы
   */
  [key: string]: unknown;
}

```

### FILE: src/components/CellButton/Icon/types.ts
```typescript
import { SystemStyleObject } from "@styled-system/css";
import { CustomStyledProps } from "../../../types";

import { Size, Types } from "../types";

export type IconSizes = Record<Size, SystemStyleObject>;

export type IconTypes = Partial<CustomStyledProps<Types>>;

export interface IconProps {
  /**
   * @default false
   */
  $isTurnedOver?: boolean;
  $size?: Size;
}

```

### FILE: src/components/CellButton/Text/types.ts
```typescript
import type { DefaultTheme, StyledComponentProps } from "styled-components";
import { CustomStyledProps } from "../../../types";

import { Types } from "../types";

export type TextTypes = CustomStyledProps<Types>;

// Нужно чтобы опустить наследованные пропсы из Text компонента
export type TextProps = StyledComponentProps<
  "div",
  DefaultTheme,
  Record<string, unknown>,
  never
>;

```

### FILE: src/components/CellButton/types.ts
```typescript
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentType,
  ReactNode,
} from "react";

export type Size = "s" | "m" | "l";
export type Types = "button" | "more" | "more-arrow" | "more-text";

type Path = {
  pathname: string;
  search?: string;
  hash?: string;
};

type To = string | Partial<Path>;
type LinkLikeProps = {
  to: To;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export interface CellButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Размер.
   * @default m
   */
  $size?: Size;
  /**
   * Вариант отображения.
   * @default button
   */
  $type?: Types;
  /**
   * Текст кнопки
   */
  text?: string;
  /**
   * Счетчик.
   */
  counter?: number | undefined;
  /**
   * Иконка в начале кнопки.
   */
  leadingIcon?: ReactNode;
  /**
   * Иконка в конце кнопки.
   */
  trailingIcon?: ReactNode;
  /**
   * @deprecated
   * В 2Q_26 пропс будет удалён.
   * Используйте пропсы text,leadingIcon и trailingIcon.
   */
  children?: ReactNode;
  /**
   * Поворот chevron для $type = "more-arrow".
   */
  isTurned?: boolean;
  /**
   * Навигация.
   * Принимает строку пути или объект с pathname, search и hash.
   */
  to?: To;
  /**
   * URL-адрес для навигации по внешней ссылке.
   */
  href?: string;
  /**
   * Компонент - "button", но может быть "a".
   */
  as?:
    | "a"
    | ComponentType<LinkLikeProps>
    | ComponentType<AnchorHTMLAttributes<HTMLAnchorElement>>;
}

export interface CellButtonContextArgs {
  $size?: Size;
  $type?: Types;
}

```

### FILE: src/components/CellMini/Contacts/types.ts
```typescript
export interface ContactsProps {
  $prefixIcon?: JSX.Element;
  $postfixIcon?: JSX.Element;
}

```

### FILE: src/components/CellMini/types.ts
```typescript
export interface CellMiniProps {
  /**
   * Размер отступов между элементами.
   * @default '6px'
   */
  $gap?: string | number;
  /**
   * Выравнивание элементов по центру.
   * @default false
   */
  $alignCenter?: boolean;
}

```

### FILE: src/components/CellRich/types.ts
```typescript
import { ReactNode } from "react";

export interface CellRichProps {
  /**
   * Иконка.
   */
  $icon?: ReactNode;
}

```

### FILE: src/components/CellTimeline/Comment/types.ts
```typescript
import { ReactNode } from "react";

export interface CommentProps {
  text?: string;
  content?: ReactNode;
  hideButtonText?: string;
  showButtonText?: string;
}

```

### FILE: src/components/CellTimeline/types.ts
```typescript
export type Size = "s" | "m" | "l";

export interface CellTimelineProps {
  /**
   * Наличие иконки со статусом.
   */
  withIcon?: boolean;
  /**
   * Размер.
   * @default 'm'
   */
  $size?: Size;
}

export interface CellTimelineContextArgs {
  size?: Size;
  withIcon?: boolean;
}

```

### FILE: src/components/ChangeUser/types.ts
```typescript
import { ReactElement } from "react";
import { Size } from "../Avatar";

export interface ChangeUserProps {
  avatarSrc: string;
  avatarSize?: Size;
  name: string;
  position?: string;
  selected?: boolean;
  withChevron?: boolean;
  customIcon?: ReactElement;
  width?: string;
  height?: string;
  padding?: string;
  withPopover?: boolean;
  popoverContent?: PopoverContent[];
}

type PopoverContent = {
  title?: string;
  cards?: ReactElement[];
};

```

### FILE: src/components/Checkbox/types.ts
```typescript
import type { InputHTMLAttributes } from "react";

export type State = "active" | "disabled" | "hover" | "focus" | "pressed";
export type Size = "s" | "m";
export type VerticalAlign = "top" | "center";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Размер.
   * @default m
   */
  $size?: Size;
  /**
   * Флаг неопределенного (indeterminate) состояния.
   * @default false
   */
  $mixed?: boolean;
  /**
   * Состояние.
   */
  $state?: State;
  /**
   * Пропсы инпута.
   */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  /**
   * Функция вызывается при изменении состояния.
   */
  onChecked?: (checked: boolean) => void;
  /**
   * Вертикальное выравнивание. По умолчанию "center".
   */
  verticalAlign?: VerticalAlign;
  /**
   * Описание под лейблом.
   */
  description?: string;
  /**
   * Текст подсказки.
   */
  info?: string;
  /**
   * Счетчик справа от лейбла.
   */
  counter?: number;
}

```

### FILE: src/components/Checkmark/Icon/types.ts
```typescript
export interface IconProps {
  checked?: boolean;
  mixed?: boolean;
}

```

### FILE: src/components/Checkmark/types.ts
```typescript
import { InputHTMLAttributes } from "react";

export type State = "active" | "disabled" | "hover" | "focus" | "pressed";

export type Size = "s" | "m";

export interface CheckmarkProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Размер.
   * @default m
   */
  $size?: Size;
  /**
   * Состояние.
   */
  $state?: State;
}

export interface CheckmarkContentProps {
  $disabled?: boolean;
}

export interface CheckmarkSizeProps {
  $size: Size;
}

```

### FILE: src/components/Counter/types.ts
```typescript
export type Variant =
  | "h1Bold"
  | "h2Semibold"
  | "h3Semibold"
  | "h4Semibold"
  | "h5Semibold"
  | "h6Semibold"
  | "captionSemibold"
  | "body2Semibold";

export interface CounterProps {
  /**
   * Размер.
   * @default "captionSemibold"
   */
  $variant?: Variant;
  /**
   * Значение.
   */
  value: number;
}

```

### FILE: src/components/DatePicker/types.ts
```typescript
import { ButtonHTMLAttributes, ReactNode } from "react";
import { ReactDatePickerProps } from "react-datepicker";
import type { Type as ButtonType } from "../Button/types";
import { CheckboxProps } from "../Checkbox";

type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

export interface BottomSheetButtonProps {
  /**
   * Действие при нажатии.
   */
  onClick: () => void;
  /**
   * Текст кнопки.
   */
  label?: string;
  /**
   * Можно выбрать вид для кнопки из доступных.
   */
  type?: ButtonType;
  /**
   *  Дополнительные атрибуты для кнопки.
   */
  attributes?: ButtonAttributes;
}

export type DateRange<T> = [T, T];

export interface DatePickerProps extends ReactDatePickerProps {
  /**
   * Префикс.
   */
  $prefix?: "с" | "по" | string;
  /**
   * Длина префикса.
   */
  $prefixLength?: number;
  /**
   * Постфикс.
   */
  $postfix?: ReactNode;
  /**
   * @default "right"
   */
  $gutter?: "no" | "right";
  /**
   * Диапазон дат, которые нужно заблокировать для выбора.
   * Состоит из двух элементов: первый - начальная дата, второй - конечная дата в диапазоне.
   */
  excludeDatesRange?: DateRange<Date>;
  /**
   * Флаг автоподстановки точек в строку value.
   */
  isAutoDots?: boolean;
  /**
   * Заголовок для мобильной версии
   */
  mobileTitle?: string;
  /**
   * Основные параметры кнопки, включая надпись, действие при нажатии и дополнительные атрибуты.
   */
  buttonPrimary?: BottomSheetButtonProps;
  /**
   * Основные параметры кнопки, включая надпись, действие при нажатии и дополнительные атрибуты.
   */
  buttonSecondary?: BottomSheetButtonProps;
  /**
   * Параметры для чекбокса "бессрочно".
   * Включает только необходимые свойства: `id`, `checked`, `value` и `onChange`.
   */
  permanentCheckbox?: Pick<
    CheckboxProps,
    "id" | "checked" | "value" | "onChange"
  >;
  /**
   * Атрибут для встроенного input.
   */
  "data-testid"?: string;
}

```

### FILE: src/components/DateTimePicker/types.ts
```typescript
import type { FormEvent } from "react";
import { DatePickerProps } from "../DatePicker/types";

interface TimeInputOptions {
  /**
   * Обработчик изменения.
   */
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  /**
   * Время в формате HH:MM.
   */
  value: string;
}

export interface DateTimePickerProps extends DatePickerProps {
  /**
   * Объект настроек времени.
   */
  $time: TimeInputOptions;
}

```

### FILE: src/components/deprecated/CellTimeline/Line/types.ts
```typescript
import { SystemStyleObject } from "@styled-system/css";

import { Types } from "../types";

export type LineTypes = Record<Types, SystemStyleObject>;

```

### FILE: src/components/deprecated/CellTimeline/Point/types.ts
```typescript
import { SystemStyleObject } from "@styled-system/css";
import { CustomStyledProps } from "../../../../types";

import { Size, Types } from "../types";

export type PointTypes = CustomStyledProps<Types>;

export type PointTypeSizes = Record<
  Types,
  Partial<Record<Size, SystemStyleObject>>
>;

export type PointTypeSize = Partial<
  Record<Types, Partial<Record<Size, string>>>
>;

```

### FILE: src/components/deprecated/CellTimeline/PointSet/types.ts
```typescript
import { SystemStyleObject } from "@styled-system/css";

import { Size, Types } from "../types";

export type PointSetTypeSizes = Partial<
  Record<Types, Record<Size, SystemStyleObject>>
>;

```

### FILE: src/components/deprecated/CellTimeline/types.ts
```typescript
export type Size = "s" | "m" | "l";
export type Types = "history" | "chronology" | "progress";

export interface CellTimelineProps {
  /**
   * Вариант отображения.
   * @default 'history'
   */
  $type?: Types;
  /**
   * Размер.
   * @default 'm'
   */
  $size?: Size;
}

export interface CellTimelineContextArgs {
  $size?: Size;
  $type?: Types;
}

```

### FILE: src/components/deprecated/FormField/types.ts
```typescript
import { ReactNode } from "react";

export interface FormFieldProps {
  /**
   * Элемент лейбла.
   * @example <label />
   */
  label?: ReactNode;
  /**
   * Элемент управления.
   * @example <input />
   */
  control?: ReactNode;
  /**
   * Элемент подсказки.
   */
  hint?: ReactNode;
  /**
   * Элемент ошибки.
   */
  error?: ReactNode;
  /**
   * Дополнительный элемент справа.
   * @example <Addon />
   */
  addon?: ReactNode;
  /**
   * Дочерние элементы.
   */
  children?: ReactNode;
}

```

### FILE: src/components/deprecated/Plain/types.ts
```typescript
import type { ReactElement } from "react";
import { Size, State } from "../../Button/types";

export interface ButtonProps {
  /**
   * Размер.
   * @default m
   */
  size?: PlainSize;
  /**
   * Текущее состояние.
   */
  state?: State | "disabled" | "visited" | "default";
  /**
   * Иконка спереди.
   */
  leadingIcon?: ReactElement;
  /**
   * Иконка сзади.
   */
  trailingIcon?: ReactElement;
}

export type PlainSize = Exclude<Size, "xs" | "l" | "m-alt">;

```

### FILE: src/components/Drawer/Content/types.ts
```typescript
import type { RefObject } from "react";
import type { SelectItemsAndClickHandlerResult } from "../types";

export interface ContentProps {
  /**
   * Отвечает за отображение children или элементов из Stack.
   */
  isEmptyStack: boolean;
  /**
   * Обработчик выбора элементов и клика.
   */
  selectItemsAndClickHandler: () => SelectItemsAndClickHandlerResult;
  /**
   * ref на div с содержимым.
   */
  contentRef: RefObject<HTMLDivElement>;
}

```

### FILE: src/components/Drawer/Footer/types.ts
```typescript
import type { DrawerButtonProps } from "../types";

export interface FooterProps {
  /**
   * Основные параметры кнопки, включая надпись, действие при нажатии и дополнительные атрибуты.
   */
  buttonPrimary?: DrawerButtonProps;
  /**
   * Основные параметры кнопки, включая надпись, действие при нажатии и дополнительные атрибуты.
   */
  buttonSecondary?: DrawerButtonProps;
  /**
   * Основные параметры кнопки, включая надпись, действие при нажатии и дополнительные атрибуты.
   */
  buttonExtra?: DrawerButtonProps;
  /**
   * Отображается ли borderTop над кнопками.
   */
  isBorderVisible?: boolean;
}

```

### FILE: src/components/Drawer/Header/MoreMenu/types.ts
```typescript
import type { HeaderProps } from "../types";

export type MoreMenuProps = Omit<
  HeaderProps,
  "currentTitle" | "isBackArrowVisible" | "onBackArrowClick" | "onCloseDrawer"
>;

```

### FILE: src/components/Drawer/Header/types.ts
```typescript
import type { SubItem } from "../types";

export interface HeaderProps {
  /**
   * Текущий заголовок Drawer, отображается в верхней части.
   */
  currentTitle: string;
  /**
   * Видна ли кнопка "Назад".
   */
  isBackArrowVisible: boolean;
  /**
   * Обработчик клика по кнопке "Назад".
   */
  onBackArrowClick: () => void;
  /**
   * Стандартный обработчик клика по элементу меню.
   */
  onItemClick: (item: SubItem) => void;
  /**
   * Функция обратного вызова при закрытии Drawer.
   */
  onCloseDrawer: () => void;
  /**
   * Элементы дополнительного меню.
   */
  moreMenu?: SubItem[];
  /**
   * Ваша иконка дополнительного меню.
   */
  moreMenuIcon?: React.ReactElement;
  /**
   * Ваше действие при клике на дополнительное меню.
   */
  onMoreMenuClick?: () => void;
  /**
   * Идентификатор заголовка для систем автоматизированного тестирования.
   */
  dataTestId?: string;
  /**
   * Коллбэк клика на иконку глаза в заголовке дровера.
   */
  onTitleIconClick?: (isIconOpen: boolean) => void;
}

```

### FILE: src/components/Drawer/types.ts
```typescript
import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from "react";
import type { Type as ButtonType } from "../Button/types";

type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

export interface DrawerButtonProps {
  /**
   * Текст кнопки
   */
  label: string;
  /**
   * Действие при нажатии.
   */
  onClick: () => void;
  /**
   * Можно выбрать вид для кнопки из доступных.
   */
  type?: ButtonType;
  /**
   * Состояние для асинхронных операций.
   */
  isLoading?: boolean;
  /**
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

export interface DrawerProps {
  /**
   * Заголовок Drawer, отображается в верхней части.
   */
  title: string;
  /**
   * Флаг, который указывает должен ли Drawer быть открытым или закрытым.
   */
  isOpen: boolean;
  /**
   * Обработчик закрытия компонента.
   */
  onClose: () => void;
  /**
   * Дочерние элементы, которые можно отобразить внутри компонента.
   */
  children?: React.ReactNode;
  /**
   * Список вкладок.
   */
  tabs?: Tab[];
  /**
   * Основные параметры кнопки, включая надпись, действие при нажатии и дополнительные атрибуты.
   */
  buttonPrimary?: DrawerButtonProps;
  /**
   * Основные параметры кнопки, включая надпись, действие при нажатии и дополнительные атрибуты.
   */
  buttonSecondary?: DrawerButtonProps;
  /**
   * Основные параметры кнопки, включая надпись, действие при нажатии и дополнительные атрибуты.
   */
  buttonExtra?: DrawerButtonProps;
  /**
   * Флаг, указывающий, нужно ли оставлять смонтированным содержимое компонента при его скрытии.
   * @default false
   */
  keepContentMounted?: boolean;
  /**
   * Ширина Drawer в пикселях. Диапазон от 480 до 800. Если не указана, используется значение по умолчанию 560.
   * @default 560
   */
  width?: number;
  /**
   * Позволяет скрывать overlay если это необходимо.
   */
  isOverlayHidden?: boolean;
  /**
   * Элементы дополнительного меню.
   */
  moreMenu?: SubItem[];
  /**
   * Ваша иконка дополнительного меню.
   */
  moreMenuIcon?: React.ReactElement;
  /**
   * Ваше действие при клике на дополнительное меню.
   */
  onMoreMenuClick?: () => void;
  /**
   * Коллбек, вызываемый при переключении таба, если используются tabs.
   */
  onTabChange?: (tab: Tab) => void;
  /**
   * Идентификатор для систем автоматизированного тестирования.
   */
  dataTestId?: string;
  /**
   * Идентификатор заголовка для систем автоматизированного тестирования.
   */
  titleDataTestId?: string;
  /**
   * Коллбэк клика на иконку глаза в заголовке дровера.
   */
  onTitleIconClick?: (isIconOpen: boolean) => void;
  /**
   * Отключает Footer, выводя на его месте пустой div высотой 8px..
   * @default false
   */
  withoutFooter?: boolean;
}

export interface Tab {
  /**
   * Уникальный идентификатор элемента.
   */
  id: string;
  /**
   * Отображаемое названия элемента.
   */
  title: string;
  /**
   * Содержимое элемента. Отображается, когда элемент активен или выбран.
   */
  content: ({ onClick }: { onClick?: MouseEventHandler }) => ReactElement;
  /**
   * Элементы, которые будут отображаться в DrawerContent.
   */
  subItems?: SubItem[];
}

export type SubItem = Tab & {
  /**
   * Если параметр true, то элемент не будет реагировать на клик по нему.
   */
  isClickDisabled?: boolean;
  /**
   * Обработчик события клика для элемента. Если указан, то эта функция заменит стандартное поведение при клике на элемент.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export type SelectItemsAndClickHandlerResult = {
  /**
   * Элементы, которые будут отображаться в DrawerContent.
   */
  items: SubItem[];
  /**
   * Стандартный обработчик события клика для элемента.
   */
  defaultClickHandler: (item?: SubItem) => void;
};

```

### FILE: src/components/Dropdown/Items/ActionSheetItem/types.ts
```typescript
import { ReactNode } from "react";

export interface ActionSheetItemProps {
  title: string;
  description?: string;
  onClick: () => void;
  icon?: ReactNode;
  chevron?: boolean;
  disabled?: boolean;
  error?: boolean;
}

```

### FILE: src/components/Dropdown/Items/PopupSelectionItem/CheckmarkItem/types.ts
```typescript
export interface CheckmarkItemProps {
  isSelected: boolean;
  onSelect: () => void;
}

```

### FILE: src/components/Dropdown/Items/PopupSelectionItem/types.ts
```typescript
import { ReactElement, ReactNode } from "react";

interface BaseProps {
  /**
   * Контент элемента.
   */
  content: ReactNode;
  /**
   * Показывается ли элемент.
   * Полезно при фильтрации.
   * @default true
   */
  isShown?: boolean;
}

export interface DefaultProps extends BaseProps {
  /**
   * Раскрыт ли элемент.
   */
  isExpanded?: never;
  /**
   * Колбэк переключения состояния раскрытия элемента.
   */
  onExpandChange?: never;
  /**
   * Вложенные элементы.
   */
  innerItems?: never;
}

interface TreeProps extends BaseProps {
  /**
   * Раскрыт ли элемент.
   */
  isExpanded: boolean;
  /**
   * Колбэк переключения состояния раскрытия элемента.
   */
  onExpandChange: () => void;
  /**
   * Вложенные элементы.
   */
  innerItems: ReactElement<PopupSelectionItemProps>[];
}

export type PopupSelectionItemProps = DefaultProps | TreeProps;

```

### FILE: src/components/Dropdown/Items/SelectionSheetItem/types.ts
```typescript
interface BaseProps {
  title: string;
  onSelect: () => void;
  disabled?: boolean;
  isSelected?: boolean;
}

interface SelectProps extends BaseProps {
  withCheckbox?: never;
  isError?: never;
  errorText?: never;
}

interface MultiSelectProps extends BaseProps {
  withCheckbox: true;
  isError?: boolean;
  errorText?: string;
}

export type SelectionSheetItemProps = SelectProps | MultiSelectProps;

```

### FILE: src/components/Dropdown/types.ts
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

### FILE: src/components/Empty/types.ts
```typescript
/**
 * Тип компонента.
 */
export type EmptyType = "start" | "noResults" | "wait" | "create" | "noData";
/**
 * Тип noData.
 */
type NoData = Extract<EmptyType, "noData">;
/**
 * Простые типы.
 */
type SimpleTypes = Extract<EmptyType, "start" | "noResults">;
/**
 * Размер компонента, влияющий на стили и доступные параметры.
 */
export type Size = "default" | "small";
/**
 * Расположение содержимого компонента: горизонтально или вертикально.
 */
export type Orientation = "horizontal" | "vertical";

interface BaseProps {
  /**
   * Тип компонента.
   */
  type: EmptyType;
  /**
   * Краткое описание, раскрывающее суть и дополняющее заголовок.
   */
  description: string;
  /**
   * Заголовок компонента, который привлекает внимание пользователя и задаёт тему.
   */
  title?: string;
  /**
   * Опциональный элемент для кнопки, отображается при наличии.
   */
  buttonLabel?: string;
  /**
   * Действие при нажатии.
   */
  onClick?: () => void;
  /**
   * Опциональный элемент для второй кнопки, отображается при наличии.
   */
  buttonSecondaryLabel?: string;
  /**
   * Действие при нажатии.
   */
  onSecondaryBtnClick?: () => void;
}

interface PropsStartNoResults extends BaseProps {
  type: SimpleTypes;
  size?: Extract<Size, "default">;
}

interface PropsNoData extends BaseProps {
  type: NoData;
  size?: Extract<Size, "default">;
  buttonLabel?: never;
  onClick?: never;
  buttonSecondaryLabel?: never;
  onSecondaryBtnClick?: never;
}

interface PropsRestTypes extends BaseProps {
  type: Exclude<EmptyType, SimpleTypes>;
  size?: Size;
}

export type EmptyProps = PropsStartNoResults | PropsRestTypes | PropsNoData;

```

### FILE: src/components/Error/types.ts
```typescript
/**
 * Тип компонента.
 */
export type ErrorType = "error" | "reload";
/**
 * Размер компонента, влияющий на стили и доступные параметры.
 */
export type Size = "small" | "default";
/**
 * Расположение содержимого компонента: горизонтально или вертикально.
 */
export type Orientation = "horizontal" | "vertical";

export interface BaseProps {
  /**
   * Тип компонента.
   */
  type: ErrorType;
  /**
   * Краткое описание, раскрывающее суть и дополняющее заголовок.
   */
  description: string | React.ReactNode;
  /**
   * Заголовок компонента, который привлекает внимание пользователя и задаёт тему.
   */
  title?: string;
  /**
   * Расположение содержимого компонента: горизонтально или вертикально.
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Опциональный элемент для кнопки, отображается при наличии.
   */
  buttonLabel?: string;
  /**
   * Действие при нажатии.
   */
  onClick?: () => void;
  /**
   * Опциональный элемент для второй кнопки, отображается при наличии.
   */
  buttonSecondaryLabel?: string;
  /**
   * Действие при нажатии.
   */
  onSecondaryBtnClick?: () => void;
}

interface PropsReload extends BaseProps {
  type: "reload";
  description: string | React.ReactNode;
  buttonLabel?: never;
  onClick?: never;
  size?: Extract<Size, "default">;
}

interface PropsError extends BaseProps {
  type: "error";
  description: string;
  buttonLabel?: string;
  onClick?: () => void;
  size?: Size;
}

export type ErrorProps = PropsReload | PropsError;

```

### FILE: src/components/errors/ErrorBoundary/types.ts
```typescript
import { ErrorInfo, ComponentType } from "react";

export interface FallbackProps {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

export interface ErrorBoundaryProps {
  onReset?: (...args: Array<unknown>) => void;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  fallbackComponent?: ComponentType<FallbackProps>;
}

export interface ErrorBoundaryState {
  error: Error | null;
}

```

### FILE: src/components/Fade/types.ts
```typescript
import { ReactNode } from "react";

export enum FadeDirection {
  LEFT = "left",
  RIGHT = "right",
  BOTH = "both",
}

export interface FadeProps {
  /**
   * Напраление градиета.
   */
  direction?: FadeDirection;
  /**
   * z-index
   * */
  zIndex?: number;
  /**
   * Дочерний компонент.
   */
  children: ReactNode;
}

```

### FILE: src/components/Feedback/TextField/types.ts
```typescript
import { ComponentProps } from "react";

import { FormFieldProps } from "../../FormField";

export interface TextFieldProps extends Omit<FormFieldProps, "label"> {
  input?: ComponentProps<"textarea">;
}

```

### FILE: src/components/Feedback/Title/types.ts
```typescript
import { ReactNode } from "react";

export interface TitleProps {
  $tooltip?: ReactNode;
}

```

### FILE: src/components/Feedback/types.ts
```typescript
import { ReactNode } from "react";

import { RatingProps } from "../Rating";

import { TitleProps } from "./Title";
import { TextFieldProps } from "./TextField";

export interface FeedbackProps extends TitleProps, RatingProps {
  $title: ReactNode;
  clarification?: TextFieldProps;
}

```

### FILE: src/components/Filters/Button/types.ts
```typescript
import type { ChangeEventHandler, MouseEventHandler } from "react";

export interface FilterButtonProps {
  id?: string;
  name?: string;
  value: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
}

export interface MoreButtonProps {
  onClick?: MouseEventHandler;
}

export interface ButtonsContainerStyledProps {
  $columns?: number;
  $hideElements?: boolean;
}

export interface ButtonsContainerProps<T> extends ButtonsContainerStyledProps {
  value?: T;
  onChange?: (value: T) => void;
}

```

### FILE: src/components/Filters/PopupSelection/types.ts
```typescript
import { Property } from "csstype";

export interface PopupSelectionProps {
  fieldValue?: string;
  width?: Property.Width | number;
  onReset?: () => void;
}

export interface PopupSelectionStyledProps {
  $width?: Property.Width | number;
}

export interface ArrowSVGProps {
  $opened: boolean;
}

export interface TriggerProps {
  $focused: boolean;
}

export interface ContainerProps {
  $maxHeight?: Property.MaxHeight | number;
}

```

### FILE: src/components/Filters/types.ts
```typescript
export interface FilterContentProps {
  /**
   * Количество видимых элементов.
   */
  $childrenCount: number;
}

```

### FILE: src/components/FloatingModal/MoreActions/types.ts
```typescript
import { FloatingModalProps } from "../types";

export type MoreActionsProps = {
  moreActions: FloatingModalProps["moreActions"];
};

```

### FILE: src/components/FloatingModal/types.ts
```typescript
import type { ReactNode, MouseEventHandler, RefObject } from "react";

export type ModalPosition =
  | "left-bottom"
  | "left-top"
  | "right-bottom"
  | "right-top";

export type FloatingModalProps = {
  /**
   * Контент модального окна.
   */
  children: ReactNode;
  /**
   * Заголовок.
   */
  title: string | ReactNode;
  /**
   * Показать / скрыть модельное окно.
   */
  isOpen: boolean;
  /**
   * Описание.
   */
  description?: string;
  /**
   * Элемент, рядом с которым надо отрендерить модальное окно. Без него, отобразится по центру экрана.
   */
  triggerElement?: RefObject<HTMLElement>;
  /**
   * Функция срабатывает на дополнительной иконке
   */
  onOpenInNewTab?: () => void;
  /**
   * Если 1 дополнительное действие, то необходима иконка + click
   * Если более 1 дополнительного действия, то список из текста + click к каждому
   */
  moreActions?:
    | { icon: ReactNode; onClick: MouseEventHandler }
    | Array<{ text: string; onClick: MouseEventHandler }>;
  /**
   * HTMLElement в котором рендерится модальное окно
   * @default document.body
   */
  container?: HTMLElement;
  /** Функция закрытия окна */
  onClose?: () => void;
  /**
   * Кастомная ширина модального окна. Если передать пустую строку, ширина будет подстроена под контент.
   * @default 400
   */
  width?: number | string;
  /**
   * Кастомная высота модального окна. Если передать пустую строку, высота будет подстроена под контент.
   * @default 400
   */
  height?: number | string;
  /**
   * Позиционирование модального окна отосительно переданного элемента-триггера
   * @default 'right-bottom'
   */
  position?: ModalPosition;
  /**
   * Если true, модальное окно вместе с контентом всегда находится в DOM
   * @default false
   */
  keepContentMounted?: boolean;
  /**
   * Заголовок для Header в BottomSheet в мобильной версии.
   */
  mobileTitle?: string;
  /**
   * Кнопки для Footer в BottomSheet в мобильной версии.
   */
  mobileButtons?: ReactNode;
  /**
   * Активен ли режим PDF viewer.
   */
  isPdfViewerSize?: boolean;
  /**
   * Кастомные координаты для PDF viewer.
   */
  customPosition?: { x: number; y: number };
};

```

### FILE: src/components/FormField/Title/types.ts
```typescript
import { ReactNode } from "react";
import { FloatingProps } from "../../../utils/floating-ui/types";
import { PopoverProps } from "../../Popover/types";

export interface TitleProps {
  /**
   * ID целевого элемента управления для доступности.
   */
  htmlFor?: string;
  /**
   * Текст метки поля.
   * Используется для описания назначения поля.
   */
  label?: string;
  /**
   * Текст подсказки.
   */
  tooltipText?: string;
  /**
   * Иконка слева от текста `label`.
   */
  startIcon?: ReactNode;
  /**
   * Указывает, что поле обязательно для заполнения.
   */
  required?: boolean;
  /**
   * Позиция всплывающего окна относительно информационной иконки.
   * @default top
   */
  placementPopover?: FloatingProps["placement"];
  /**
   * Позиция содержимого:
   * - absolute контент рендерится следующей нодой от триггера
   * - fixed контент рендерится в портале в body, полезно, когда на верхних уровнях триггера имеется элемент с overflow: hidden.
   * @default absolute
   */
  tooltipPosition?: PopoverProps["position"];
}

```

### FILE: src/components/FormField/types.ts
```typescript
import { ReactNode } from "react";
import { TitleProps } from "./Title/types";

export interface FormFieldProps extends TitleProps {
  /**
   * Текст подсказки.
   */
  description?: string;
  /**
   * Текст ошибки.
   */
  error?: string;
  /**
   * Дополнительный элемент справа.
   */
  addon?: ReactNode;
  /**
   * Дочерний элемент.
   */
  children?: ReactNode;
}

```

### FILE: src/components/Grade/Badge/types.ts
```typescript
import { BaseProps } from "../types";

export type Size = "m" | "l";
export type Style = "red" | "blue";

export interface BadgeProps extends BaseProps {
  /**
   * Размер.
   * @default m
   */
  $size?: Size;

  /**
   * Вариант отображения.
   * @default red
   */
  $style?: Style;
}

```

### FILE: src/components/Grade/RoundGrade/types.ts
```typescript
import { BaseProps } from "../types";

export type Size = "m" | "s";
export type Style = "default" | "black";

export interface GradeProps extends BaseProps {
  /**
   * Размер.
   * @default m
   */
  $size?: Size;

  /**
   * Вариант отображения.
   * @default default
   */
  $style?: Style;
}

```

### FILE: src/components/Grade/types.ts
```typescript
import { CustomStyledProps } from "../../types";

export interface BaseProps {
  /**
   * Флаг включения границ.
   * @default false
   */
  $bordered?: boolean;
}

export type Bordered = CustomStyledProps<"true" | "false">;

```

### FILE: src/components/GradientButton/types.ts
```typescript
import { InputHTMLAttributes } from "react";
import { CustomStyledProps } from "../../types";

type Size = "s" | "m";
type State = "disabled";
export interface GradientButtonProps
  extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Размер.
   * @default m
   */
  $size?: Size;
}

export interface GradientButtonStyledProps {
  $size?: Size;
  $state?: "disabled";
}

export type GradientButtonSizes = CustomStyledProps<Size>;

export type GradientButtonStates = CustomStyledProps<State>;

```

### FILE: src/components/Group/MoreButton/types.ts
```typescript
import { ReactNode } from "react";

export interface MoreButtonProps {
  $opened?: boolean;
  $openedText?: string;
  $closedText?: string;
  onClick?: () => void;
  children?: ReactNode;
}

```

### FILE: src/components/Group/types.ts
```typescript
export type GroupColumns = "1" | "2" | "3";

export interface GroupProps {
  /**
   * Количество колонок.
   * @default 1
   */
  $columns?: GroupColumns;
}

```

### FILE: src/components/ImageViewer/types.ts
```typescript
export type ZoomTextVariant =
  | "автоматически"
  | "актуальный размер"
  | "заполняет высоту"
  | "заполняет ширину";

export type ZoomPercentVariant = 50 | 75 | 100 | 125 | 150 | 200 | 300 | 400;

export type ZoomVariant = ZoomTextVariant | ZoomPercentVariant;

export type Rotation = 0 | 90 | 180 | 270;

export interface NaturalSize {
  width: number;
  height: number;
}

export interface ViewportSize {
  width: number;
  height: number;
}

export interface LayoutResult {
  renderedWidth: number;
  renderedHeight: number;
  stageWidth: number;
  stageHeight: number;
  overflowX: boolean;
  overflowY: boolean;
  alignX: "left" | "center";
  alignY: "top" | "center";
  scale: number;
  effectiveImageWidth: number;
  effectiveImageHeight: number;
}

export interface ImageViewerProps {
  src: string;
  alt?: string;
  className?: string;
  dataTestId?: string;
  onDownload?: () => void;
  internalisation?: {
    download?: string;
    rotate?: string;
    zoomAuto?: string;
    zoomActual?: string;
    zoomHeight?: string;
    zoomWidth?: string;
  };
}

```

### FILE: src/components/Input/TextArea/Chat/types.ts
```typescript
import React, { ButtonHTMLAttributes } from "react";
import { LineProps } from "../Line/types";

export interface ChatWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Задает стиль тексту аналогичный placeholder
   */
  $hasPlaceholder?: boolean;
  /**
   * Позволяет редактировать контент внутри компонента
   */
  contentEditable?: boolean;
  children?: React.ReactNode;
}

export type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

export interface WritebarProps extends LineProps {
  leftActionFirst?: ButtonAttributes;
  rightActionFirst?: ButtonAttributes;
  rightActionSecond?: ButtonAttributes;
  rightActionThird?: ButtonAttributes;
}

export interface ActionProps {
  button?: ButtonAttributes;
  disabled?: boolean;
}

```

### FILE: src/components/Input/TextArea/Line/types.ts
```typescript
import React from "react";
import { TextAreaProps } from "../types";

export interface LineWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Задает стиль тексту аналогичный placeholder
   */
  $hasPlaceholder?: boolean;
  /**
   * Позволяет редактировать контент внутри компонента
   */
  contentEditable?: boolean;
  children?: React.ReactNode;
}

export interface LineProps extends TextAreaProps {
  ref?: React.Ref<HTMLTextAreaElement>;
}

```

### FILE: src/components/Input/TextArea/TextAreaToolbar/types.ts
```typescript
import { ReactElement } from "react";
import { ToolSelector } from "../../../ToolSelector";

export type TextAreaToolbarPlacement = "right" | "left";

export interface TextAreaToolbarProps {
  $placement: TextAreaToolbarPlacement;
  $tools: Array<ReactElement<typeof ToolSelector>>;
}

```

### FILE: src/components/Input/TextArea/types.ts
```typescript
import type { DefaultTheme, StyledComponentProps } from "styled-components";
import type { ReactElement } from "react";
import type { ToolSelector } from "../../ToolSelector";

export type ToolbarPlacement = "right" | "left";

export interface TextAreaProps
  extends StyledComponentProps<
    "textarea",
    DefaultTheme,
    Record<string, unknown>,
    never
  > {
  $tools?: Array<ReactElement<typeof ToolSelector>>;
  $toolbarPlacement?: ToolbarPlacement;
}

```

### FILE: src/components/Input/types.ts
```typescript
import type { InputHTMLAttributes } from "react";

export interface Suggestion {
  key: string;
  value: string;
  [key: string]: unknown;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Список подсказок для автозаполнения.
   *
   * */
  suggestions?: string[] | Suggestion[];
  /**
   *  Обработчик выбора предложенного значения.
   * */
  onSuggestionSelect?: (value: string | Suggestion) => void;
  /**
   * Уровень место использования компонента, для гарантии видимости окна подсказок.
   * @defaultValue "body"
   */
  placeWhereUsed?: "body" | "modal";
}

export interface SuggestionOptionProps {
  active: boolean;
}

```

### FILE: src/components/Input/variants/ChipsInput/types.ts
```typescript
import { InputHTMLAttributes, ReactElement, RefObject } from "react";

export interface ChipsInputProps {
  /**
   * Передача списка тегов-чипсов для отображения внутри инпута
   * @example $chips: [<Chips>label</Chips>]
   */
  $chips: ReactElement[];
  /**
   * Передача списка атрибутов для поля input
   */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  /**
   * Передача ref для компонента ввода
   */
  inputRef?:
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
    | null;
}

```

### FILE: src/components/Input/variants/PrefixPostfix/types.ts
```typescript
import type {
  Component,
  HTMLProps,
  LegacyRef,
  MutableRefObject,
  ReactNode,
} from "react";

export type PrefixLengthType = number;

export type PrefixStringType = "с" | "по" | "от" | "до" | string;

export type ForwardRef =
  | ((instance: HTMLInputElement | null) => void)
  /* eslint-disable-next-line */
  | LegacyRef<Component<HTMLInputElement, unknown, unknown>>
  | MutableRefObject<HTMLInputElement | null>
  | null;

export interface PrefixPostfixProps extends HTMLProps<HTMLInputElement> {
  children?: ReactNode;
  $prefix?: PrefixStringType | ReactNode;
  $prefixLength?: PrefixLengthType;
  $postfix?: ReactNode;
  disabled?: boolean;
  $control?: ReactNode;
  innerRef?: ForwardRef;
}

```

### FILE: src/components/Layout/Column/types.ts
```typescript
export interface ColumnProps {
  /**
   * Количество колонок, согласно сетке.
   * - первое значение — для всех брейкпоинтов
   * - остальные значения для соответствующего брейкпоинта
   * - если передать число, то оно будет использоваться для всех брейкпоинтов, но не больше общего числа колонок конкретного брейкпоинта
   * @example [null, 4, 4, 8, 8, 6, 6, 6, 6, 6, 6]
   */
  cols: number | (null | number)[];
}

```

### FILE: src/components/Layout/Provider/types.ts
```typescript
export interface ProviderProps {
  /**
   * Отступ.
   * @default 0
   */
  offset?: number;
}

```

### FILE: src/components/LayoutGrid/Grid/Item/types.ts
```typescript
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

type Span = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "*";

export type BreakpointValue =
  | Span
  | {
      /**
       * Порядок элемента
       */
      order?: number;
      /**
       * Ширина элемента (в колонках)
       */
      span: Span;
      /**
       * Позиция элемента (номер колонки)
       */
      start?: number | "auto";
    };

export interface ItemProps {
  /**
   * Если `true`, то элемент становится контейнером для вложенных элементов
   */
  subgrid?: boolean;
  /**
   * Хранить порядок перетаскиваемых элементов локально
   */
  enableSortableStorage?: boolean;
  /**
   * Событие, когда перетащили элемент
   */
  onDragEnd?: (e: DragEndEvent) => void;
  /**
   * Событие, когда захватили элемент
   */
  onDragStart?: (e: DragStartEvent) => void;
  /**
   * Для всех брейкпоинтов (по умолчанию)
   */
  s?: BreakpointValue;
  /**
   * min-width: 600px
   */
  m?: BreakpointValue;
  /**
   * min-width: 1280px
   */
  l?: BreakpointValue;
  /**
   * min-width: 320px
   */
  s320?: BreakpointValue;
  /**
   * min-width: 480px
   */
  s480?: BreakpointValue;
  /**
   * min-width: 600px
   */
  m600?: BreakpointValue;
  /**
   * min-width: 720px
   */
  m720?: BreakpointValue;
  /**
   * min-width: 840px
   */
  m840?: BreakpointValue;
  /**
   * min-width: 1024px
   */
  l1024?: BreakpointValue;
  /**
   * min-width: 1280px
   */
  l1280?: BreakpointValue;
  /**
   * min-width: 1440px
   */
  l1440?: BreakpointValue;
  /**
   * min-width: 1600px
   */
  l1600?: BreakpointValue;
  /**
   * min-width: 1920px
   */
  l1920?: BreakpointValue;
}

```

### FILE: src/components/LayoutGrid/Grid/SortableItem/types.ts
```typescript
import { ReactElement } from "react";

export interface SortableItemProps {
  /**
   * id item'а, по которому он сортируется в массиве
   */
  id: string;
  /**
   * Отключение перетаскивания
   */
  isDisabled: boolean;
  /**
   * Перетаскиваемый элемент
   */
  children: ReactElement;
}

```

### FILE: src/components/LayoutGrid/Grid/types.ts
```typescript
type Span = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "*";

export type BreakpointValue =
  | Span
  | {
      /**
       * Порядок элемента
       */
      order?: number;
      /**
       * Ширина элемента (в колонках)
       */
      span: Span;
      /**
       * Позиция элемента (номер колонки)
       */
      start?: number | "auto";
    };

export interface ItemProps {
  /**
   * Если `true`, то элемент становится контейнером для вложенных элементов
   */
  subgrid?: boolean;
  /**
   * Для всех брейкпоинтов (по умолчанию)
   */
  s?: BreakpointValue;
  /**
   * min-width: 600px
   */
  m?: BreakpointValue;
  /**
   * min-width: 1280px
   */
  l?: BreakpointValue;
  /**
   * min-width: 320px
   */
  s320?: BreakpointValue;
  /**
   * min-width: 480px
   */
  s480?: BreakpointValue;
  /**
   * min-width: 600px
   */
  m600?: BreakpointValue;
  /**
   * min-width: 720px
   */
  m720?: BreakpointValue;
  /**
   * min-width: 840px
   */
  m840?: BreakpointValue;
  /**
   * min-width: 1024px
   */
  l1024?: BreakpointValue;
  /**
   * min-width: 1280px
   */
  l1280?: BreakpointValue;
  /**
   * min-width: 1440px
   */
  l1440?: BreakpointValue;
  /**
   * min-width: 1600px
   */
  l1600?: BreakpointValue;
  /**
   * min-width: 1920px
   */
  l1920?: BreakpointValue;
}

```

### FILE: src/components/LayoutGrid/Layout/types.ts
```typescript
export interface AsideProps {
  /**
   * Если `true`, то дополнительный контент будет расположен внизу,
   * под основным контентом (только для mobile и tablet)
   */
  $stickToBottom?: boolean;
  /**
   * Ширина дополнительного контента (только для desktop)
   */
  $width?: number;
}

```

### FILE: src/components/Loader/types.ts
```typescript
import { ReactNode } from "react";

export type Size = "m" | "l";
export interface LoaderProps {
  /**
   * Для Loader на цветной фоне.
   * @default false
   */
  isOnColor?: boolean;
  /**
   * Размер иконки.
   * @default "m"
   */
  size?: Size;
  /**
   * Если true, то иконка будет обернута в центрующий div.
   * Используется, когда не передается children.
   * @default false
   */
  wrapped?: boolean;
  /**
   * Перекрываемый контент.
   */
  children?: ReactNode;
}

```

### FILE: src/components/Modal/ActionBar/types.ts
```typescript
import { SystemStyleObject } from "@styled-system/css";
import type { DefaultTheme, StyledComponentProps } from "styled-components";

import { Size } from "../Base";
import { Placement } from "../types";

export interface ActionBarProps
  extends StyledComponentProps<
    "div",
    DefaultTheme,
    Record<string, unknown>,
    never
  > {
  /**
   * @default undefined
   */
  $placement?: Placement;
}

export interface ActionBarStyledProps {
  /**
   * Флаг, если элемент прилипает.
   */
  $isSticky: boolean;
  /**
   * Размер.
   */
  $size?: Size;
}

export type ActionBarStickyVariants = Record<
  "true" | "false",
  SystemStyleObject
>;

```

### FILE: src/components/Modal/ActionButton/types.ts
```typescript
import { SystemStyleObject } from "@styled-system/css";

export interface ActionButtonProps {
  /**
   * Флаг, содержит только икноку.
   * @default false
   */
  $containsOnlyIcon?: boolean;
}

export type ActionButtonIconVariants = Record<
  "true" | "false",
  SystemStyleObject
>;

```

### FILE: src/components/Modal/Alert/types.ts
```typescript
import type { MouseEventHandler, ReactNode } from "react";

import { ModalBaseProps } from "../Base";

export interface ModalAlertProps {
  $onClose?: ModalBaseProps["$onClose"];
  $title?: ReactNode;
  $content?: ReactNode;
  $onCancel?: MouseEventHandler<HTMLButtonElement>;
  $onOk?: MouseEventHandler<HTMLButtonElement>;
  $cancelText?: ReactNode;
  $okText?: ReactNode;
}

```

### FILE: src/components/Modal/Base/Body/types.ts
```typescript
import { Size } from "../types";

export interface BodyStyledProps {
  $size?: Size;
}

```

### FILE: src/components/Modal/Base/types.ts
```typescript
import type { DefaultTheme, StyledComponentProps } from "styled-components";

export type Size = "s" | "m" | "l";

export interface ModalBaseProps
  extends StyledComponentProps<
    "div",
    DefaultTheme,
    Record<string, unknown>,
    never
  > {
  /**
   * Размер.
   * @default 's'
   */
  $size?: Size;
  /**
   * Коллбэк закрытия модального окна.
   */
  $onClose?: () => void;
}

export interface ColumnStyledProps {
  $scrollBarWidth?: number;
}

```

### FILE: src/components/Modal/Body/types.ts
```typescript
export interface BodyProps {
  $paddings?: boolean;
}

```

### FILE: src/components/Modal/Header/types.ts
```typescript
import { ReactNode } from "react";
import { SystemStyleObject } from "@styled-system/css";
import type { DefaultTheme, StyledComponentProps } from "styled-components";

import { Placement } from "../types";

export interface HeaderProps
  extends StyledComponentProps<
    "div",
    DefaultTheme,
    Record<string, unknown>,
    never
  > {
  children: ReactNode | (({ $isSticky }: { $isSticky: boolean }) => ReactNode);
  /**
   * @default undefined
   */
  $placement?: Placement;
}

export interface HeaderStyledProps {
  /**
   * Флаг, если элемент прилипает.
   */
  $isSticky: boolean;
}

export type HeaderStickyVariants = Record<"true" | "false", SystemStyleObject>;

```

### FILE: src/components/Modal/ModalCard/types.ts
```typescript
export interface ModalCardProps {
  $onClose?: () => void;
}

```

### FILE: src/components/Modal/StubStickyElement/types.ts
```typescript
import { RefObject } from "react";

export interface StubStickyElementProps {
  isSticky: boolean;
  stickyRef?: RefObject<HTMLElement>;
}

```

### FILE: src/components/Modal/types.ts
```typescript
import { SystemStyleObject } from "@styled-system/css";
import { ReactNode, RefObject } from "react";

import { ModalBaseProps, Size } from "./Base/types";

export interface ModalProps extends ModalBaseProps {
  /**
   * Элемент ActionBar.
   */
  $actionBar?: ReactNode;
  /**
   * Элемент Haader.
   */
  $header?: ReactNode;
}

export type ContentColumns = Record<Size, (number | null)[]>;

export interface ModalContextArgs {
  /**
   * Ссылка на Header.
   */
  headerRef?: RefObject<HTMLDivElement>;
  /**
   * Ссылка на ActionBar.
   */
  actionBarRef?: RefObject<HTMLDivElement>;
  /**
   * Флаг, прилипает ли Header.
   */
  headerIsSticky?: boolean;
  /**
   * Флаг, прилипает ли ActionBar.
   */
  actionBarIsSticky?: boolean;
  /**
   * Размер.
   */
  $size?: Size;
  /**
   * Колонки.
   */
  cols?: (number | null)[];
}

export type Placement = "right" | "edges";
export type PlacementStyles = Record<Placement, SystemStyleObject>;
export type PaddingSizes = Record<Size, SystemStyleObject>;

```

### FILE: src/components/ModalNew/Body/types.ts
```typescript
export interface BodyProps {
  hasDividers?: boolean;
}

```

### FILE: src/components/ModalNew/Footer/ActionButton/types.ts
```typescript
import { Type } from "../../../Button/types";
import { Button } from "../../types";

export type ActionButtonProps = {
  defaultType: Type;
  dataTestId: string;
  fullWidth: boolean;
  button: Button;
  onClick?: () => void;
};

```

### FILE: src/components/ModalNew/Header/Actions/types.ts
```typescript
export interface ActionsProps {
  $disabled?: boolean;
}

```

### FILE: src/components/ModalNew/Header/types.ts
```typescript
export interface HeaderProps {
  dataTestId?: string;
}

```
