<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Icon/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Icon`
- Строк кода: 23
- Экспорты: `IconProps`
- Импорты: `./icons`, `react`, `styled-components`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { HTMLAttributes } from "react";
import type { DefaultTheme } from "styled-components";
import icons from "./icons";

export interface IconProps
  extends Pick<HTMLAttributes<HTMLDivElement>, "onClick"> {
  /**
   * Color
   */
  color?: keyof DefaultTheme["tokens"]["current"]["core"]["icon"];
  /**
   * Name
   */
  icon: keyof typeof icons;
  /**
   * Size
   */
  size?: "s" | "m" | "l";
  /**
   * Tooltip
   */
  tooltip?: string;
}

```
