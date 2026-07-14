<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Chart/Pie/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Chart`
- Строк кода: 37
- Экспорты: `PieProps`, `TextSize`, `TypographyVariant`
- Импорты: `@pulse/charts/components/PieChart`, `react`, `styled-components`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { PieChart as PulsePieChart } from "@pulse/charts/components/PieChart";
import { ComponentProps } from "react";
import type { DefaultTheme } from "styled-components";

export type TextSize = "s" | "m";
export type TypographyVariant = "body1Semibold" | "h4Semibold";

interface PieData
  extends Omit<
    ComponentProps<typeof PulsePieChart>["data"][number],
    "additionalValue" | "color"
  > {
  color?: Exclude<
    keyof DefaultTheme["tokens"]["current"]["colors"],
    "black" | "white"
  > | null;
}
export interface PieProps {
  /**
   * Array of sections
   */
  data: Array<PieData> | undefined;
  /**
   * Label
   */
  label?: string;
  /**
   * Value
   * @todo remove string
   */
  value?: number | string;
  /**
   * Size
   * @default 's'
   */
  size?: "s" | "m";
}

```
