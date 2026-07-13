<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Card/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Card`
- Строк кода: 88
- Экспорты: `CardProps`, `Paddings`, `StackProps`, `Type`, `Variant`
- Импорты: `../../utils/floating-ui/types`, `@dnd-kit/core`, `@dnd-kit/core/dist/hooks/utilities`, `react`, `styled-components`
- Зависимости внутри выгрузки: [`src/utils/floating-ui/types.ts`](<../../utils/floating-ui/types.ts.md>)

## Исходная типизация

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
