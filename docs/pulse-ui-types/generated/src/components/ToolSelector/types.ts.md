<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/ToolSelector/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `ToolSelector`
- Строк кода: 32
- Экспорты: `Size`, `ToolSelectorProps`
- Импорты: `../Button/types`, `react`
- Зависимости внутри выгрузки: [`src/components/Button/types.ts`](<../Button/types.ts.md>)

## Исходная типизация

```typescript
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { Type } from "../Button/types";

export type Size = "s" | "m" | "l";

export interface ToolSelectorProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Иконка.
   */
  icon: ReactNode;
  /**
   * Размер элемента.
   * @default "m"
   */
  size?: Size;
  /**
   * Тип элемента.
   * @default primary
   */
  $type?: Exclude<Type, "mono" | "monoSecondary">;
  /**
   * Активность элемента.
   * @default false
   */
  $active?: boolean;
  /**
   * Отключение элемента.
   * @default false
   */
  disabled?: boolean;
}

```
