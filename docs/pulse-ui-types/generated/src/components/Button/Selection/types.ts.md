<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Button/Selection/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Button`
- Строк кода: 39
- Экспорты: `ContainerProps`, `IconProps`, `SelectionProps`, `Size`
- Импорты: `../types`, `react`
- Зависимости внутри выгрузки: [`src/components/Button/types.ts`](<../types.ts.md>)

## Исходная типизация

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
