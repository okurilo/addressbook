<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/GradientButton/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `GradientButton`
- Строк кода: 22
- Экспорты: `GradientButtonProps`, `GradientButtonSizes`, `GradientButtonStates`, `GradientButtonStyledProps`
- Импорты: `../../types`, `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { InputHTMLAttributes } from "react";
import { CustomStyledProps } from "../../types";

type Size = "s" | "m";
type State = "disabled";
export interface GradientButtonProps
  extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Размер.
   * @default m
   */
  $size?: Size;
}

export interface GradientButtonStyledProps {
  $size?: Size;
  $state?: "disabled";
}

export type GradientButtonSizes = CustomStyledProps<Size>;

export type GradientButtonStates = CustomStyledProps<State>;

```
