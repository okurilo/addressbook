<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/TimeCounter/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `TimeCounter`
- Строк кода: 12
- Экспорты: `TimeCounterProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { HTMLProps } from "react";

export interface TimeCounterProps extends HTMLProps<HTMLInputElement> {
  /**
   * Коллбэк уменьшения значения.
   */
  $decrease: () => void;
  /**
   * Коллбэк увеличения значения.
   */
  $increase: () => void;
}

```
