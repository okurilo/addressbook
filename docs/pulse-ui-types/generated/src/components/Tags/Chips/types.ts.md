<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Tags/Chips/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Tags`
- Строк кода: 29
- Экспорты: `ChipsProps`, `Size`, `Type`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ButtonHTMLAttributes } from "react";

type State =
  | "default"
  | "hover"
  | "focus"
  | "active"
  | "selection"
  | "disabled";
export type Type = "default" | "warnings" | "alert";
export type Size = "s" | "m";

export interface ChipsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Текущее состояние.
   */
  $state?: State;
  /**
   * Вариант отображения.
   * @default default
   */
  $type?: Type;
  /**
   * Размер.
   * @default s
   */
  $size?: Size;
  $isSelection?: boolean;
}

```
