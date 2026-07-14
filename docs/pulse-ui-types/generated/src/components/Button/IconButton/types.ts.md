<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Button/IconButton/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Button`
- Строк кода: 16
- Экспорты: `IconButtonProps`, `IconButtonSize`, `IconType`
- Импорты: `../types`, `react`
- Зависимости внутри выгрузки: [`src/components/Button/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Size, Type } from "../types";

export type IconButtonSize = Size;

export type IconType = Type | "monoTertiary" | "destructive" | "filled";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  $state?: "default" | "hover" | "pressed" | "disabled" | "load";
  $type?: IconType;
  size?: IconButtonSize;
  color?: string;
  isLoading?: boolean;
  filledPressedIcon?: ReactNode;
}

```
