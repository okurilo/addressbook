<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Chart/Column/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Chart`
- Строк кода: 7
- Экспорты: `ColumnProps`
- Импорты: `@pulse/charts/components/LineChart`, `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { LineChart as PulseChart } from "@pulse/charts/components/LineChart";
import type { ComponentProps } from "react";

export interface ColumnProps
  extends Pick<ComponentProps<typeof PulseChart>, "categories"> {
  data: number[][];
}

```
