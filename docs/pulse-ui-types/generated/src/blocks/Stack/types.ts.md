<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Stack/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Stack`
- Строк кода: 28
- Экспорты: `StackMode`, `StackProps`
- Импорты: `../types`, `react`
- Зависимости внутри выгрузки: [`src/blocks/types.ts`](<../types.ts.md>)

## Исходная типизация

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
