<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Grid/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Grid`
- Строк кода: 12
- Экспорты: `GridProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

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
