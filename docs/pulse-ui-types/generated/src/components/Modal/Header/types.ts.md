<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Modal/Header/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Modal`
- Строк кода: 28
- Экспорты: `HeaderProps`, `HeaderStickyVariants`, `HeaderStyledProps`
- Импорты: `../types`, `@styled-system/css`, `react`, `styled-components`
- Зависимости внутри выгрузки: [`src/components/Modal/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { ReactNode } from "react";
import { SystemStyleObject } from "@styled-system/css";
import type { DefaultTheme, StyledComponentProps } from "styled-components";

import { Placement } from "../types";

export interface HeaderProps
  extends StyledComponentProps<
    "div",
    DefaultTheme,
    Record<string, unknown>,
    never
  > {
  children: ReactNode | (({ $isSticky }: { $isSticky: boolean }) => ReactNode);
  /**
   * @default undefined
   */
  $placement?: Placement;
}

export interface HeaderStyledProps {
  /**
   * Флаг, если элемент прилипает.
   */
  $isSticky: boolean;
}

export type HeaderStickyVariants = Record<"true" | "false", SystemStyleObject>;

```
