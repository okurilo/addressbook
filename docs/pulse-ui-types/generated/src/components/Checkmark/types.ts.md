<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Checkmark/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Checkmark`
- Строк кода: 25
- Экспорты: `CheckmarkContentProps`, `CheckmarkProps`, `CheckmarkSizeProps`, `Size`, `State`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { InputHTMLAttributes } from "react";

export type State = "active" | "disabled" | "hover" | "focus" | "pressed";

export type Size = "s" | "m";

export interface CheckmarkProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Размер.
   * @default m
   */
  $size?: Size;
  /**
   * Состояние.
   */
  $state?: State;
}

export interface CheckmarkContentProps {
  $disabled?: boolean;
}

export interface CheckmarkSizeProps {
  $size: Size;
}

```
