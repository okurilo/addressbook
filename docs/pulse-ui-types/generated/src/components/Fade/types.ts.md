<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Fade/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Fade`
- Строк кода: 22
- Экспорты: `FadeDirection`, `FadeProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ReactNode } from "react";

export enum FadeDirection {
  LEFT = "left",
  RIGHT = "right",
  BOTH = "both",
}

export interface FadeProps {
  /**
   * Напраление градиета.
   */
  direction?: FadeDirection;
  /**
   * z-index
   * */
  zIndex?: number;
  /**
   * Дочерний компонент.
   */
  children: ReactNode;
}

```
