<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/utils/floating-ui/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `utils`
- Компонент/группа: `utils`
- Строк кода: 70
- Экспорты: `ArrowElem`, `FloatingContextArgs`, `FloatingProps`
- Импорты: `@floating-ui/react`, `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

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
