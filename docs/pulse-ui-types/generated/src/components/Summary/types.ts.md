<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Summary/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Summary`
- Строк кода: 38
- Экспорты: `ColumnProps`, `Layout`, `LayoutContextArgs`, `SummaryProps`
- Импорты: `./SummaryItem/types`, `react`
- Зависимости внутри выгрузки: [`src/components/Summary/SummaryItem/types.ts`](<SummaryItem/types.ts.md>)

## Исходная типизация

```typescript
import type { ReactElement, ReactNode } from "react";
import type { SummaryItemProps } from "./SummaryItem/types";

export type СolumnsCount = 1 | 2;

export type Layout = "horizontal" | "vertical";

export interface SummaryProps {
  /**
   * Содержит от одного до нескольких SummaryItem.
   */
  children?:
    | ReactElement<SummaryItemProps>
    | ReactElement<SummaryItemProps>[]
    | ReactNode;
  /**
   * Горизонтальное или вертикальное расположение нескольких SummaryItem.
   */
  layout?: Layout;
  /**
   * Флаг, указывающий, нужно ли сделать колонки горизонтальными.
   */
  isHorizontalColumn?: boolean;
  /**
   * Количество колонок.
   */
  columnCount?: СolumnsCount;
}

export type LayoutContextArgs = Pick<
  SummaryProps,
  "layout" | "isHorizontalColumn"
>;

export type ColumnProps = Pick<
  SummaryProps,
  "isHorizontalColumn" | "columnCount"
>;

```
