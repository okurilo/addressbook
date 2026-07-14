<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Chart/Micro/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Chart`
- Строк кода: 8
- Экспорты: `MicroProps`
- Импорты: `@pulse/charts/components/MicroChart`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { MicroChartProps as PulseChartProps } from "@pulse/charts/components/MicroChart";

export interface MicroProps extends Omit<PulseChartProps, "data"> {
  /**
   * Array of values
   */
  data: number[] | undefined;
}

```
