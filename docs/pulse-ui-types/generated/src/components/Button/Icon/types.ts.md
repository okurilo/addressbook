<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Button/Icon/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Button`
- Строк кода: 15
- Экспорты: `IconProps`, `IconSize`, `IconType`
- Импорты: `../types`, `react`
- Зависимости внутри выгрузки: [`src/components/Button/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { ButtonHTMLAttributes } from "react";
import { Size, State, Type } from "../types";

export type IconSize = Exclude<Size, "xs" | "m-alt"> | "xl" | "xxl";
export type IconType =
  | Exclude<Type, "mono" | "monoSecondary" | "tertiary">
  | "destructive"
  | "default";

export interface IconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $state?: State | "default";
  $type?: IconType;
  size?: IconSize;
  color?: string;
}

```
