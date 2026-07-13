<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/FormField/Title/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `FormField`
- Строк кода: 39
- Экспорты: `TitleProps`
- Импорты: `../../../utils/floating-ui/types`, `../../Popover/types`, `react`
- Зависимости внутри выгрузки: [`src/components/Popover/types.ts`](<../../Popover/types.ts.md>), [`src/utils/floating-ui/types.ts`](<../../../utils/floating-ui/types.ts.md>)

## Исходная типизация

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
