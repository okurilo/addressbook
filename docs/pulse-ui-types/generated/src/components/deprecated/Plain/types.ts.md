<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/deprecated/Plain/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `deprecated`
- Строк кода: 24
- Экспорты: `ButtonProps`, `PlainSize`
- Импорты: `../../Button/types`, `react`
- Зависимости внутри выгрузки: [`src/components/Button/types.ts`](<../../Button/types.ts.md>)

## Исходная типизация

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
