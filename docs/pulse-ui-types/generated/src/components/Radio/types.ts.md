<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Radio/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Radio`
- Строк кода: 24
- Экспорты: `RadioProps`, `State`, `VerticalAlign`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { InputHTMLAttributes } from "react";

export type State = "active" | "disabled" | "hover" | "focus" | "pressed";

export type VerticalAlign = "top" | "center";

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Состояние.
   */
  $state?: State;
  /**
   * Описание под лейблом.
   */
  description?: string;
  /**
   * Текст подсказки.
   */
  info?: string;
  /**
   * Вертикальное выравнивание. По умолчанию "center".
   */
  verticalAlign?: VerticalAlign;
}

```
