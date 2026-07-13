<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Tooltip/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Tooltip`
- Строк кода: 60
- Экспорты: `ArrowElem`, `TooltipContextProps`, `TooltipMode`, `TooltipProps`, `TooltipType`
- Импорты: `../../utils/floating-ui/types`, `react`
- Зависимости внутри выгрузки: [`src/utils/floating-ui/types.ts`](<../../utils/floating-ui/types.ts.md>)

## Исходная типизация

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
