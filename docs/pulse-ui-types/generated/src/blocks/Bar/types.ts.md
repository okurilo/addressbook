<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Bar/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Bar`
- Строк кода: 27
- Экспорты: `BarData`, `BarProps`
- Импорты: `styled-components`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { DefaultTheme } from "styled-components";

export interface BarData {
  /**
   * Color
   */
  color?: Exclude<
    keyof DefaultTheme["tokens"]["current"]["colors"],
    "black" | "white"
  >;
  category?: string;
  /**
   * Current value
   */
  value: number | undefined;
  label?: string;
}

export interface BarProps extends BarData {
  max: number | undefined;
  /**
   * true, если отображается в вертикальном списке Bar'ов
   *
   * нужен, чтобы корректно выстраивать grid
   */
  manyRows?: boolean;
}

```
