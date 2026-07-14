<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Popover/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Popover`
- Строк кода: 83
- Экспорты: `PopoverContentProps`, `PopoverContextProps`, `PopoverOutsideClickProps`, `PopoverProps`
- Импорты: `../../utils/floating-ui/types`, `react`
- Зависимости внутри выгрузки: [`src/utils/floating-ui/types.ts`](<../../utils/floating-ui/types.ts.md>)

## Исходная типизация

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
