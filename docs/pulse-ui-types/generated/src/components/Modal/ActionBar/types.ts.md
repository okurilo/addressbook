<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Modal/ActionBar/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Modal`
- Строк кода: 34
- Экспорты: `ActionBarProps`, `ActionBarStickyVariants`, `ActionBarStyledProps`
- Импорты: `../Base`, `../types`, `@styled-system/css`, `styled-components`
- Зависимости внутри выгрузки: [`src/components/Modal/Base/types.ts`](<../Base/types.ts.md>), [`src/components/Modal/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { SystemStyleObject } from "@styled-system/css";
import type { DefaultTheme, StyledComponentProps } from "styled-components";

import { Size } from "../Base";
import { Placement } from "../types";

export interface ActionBarProps
  extends StyledComponentProps<
    "div",
    DefaultTheme,
    Record<string, unknown>,
    never
  > {
  /**
   * @default undefined
   */
  $placement?: Placement;
}

export interface ActionBarStyledProps {
  /**
   * Флаг, если элемент прилипает.
   */
  $isSticky: boolean;
  /**
   * Размер.
   */
  $size?: Size;
}

export type ActionBarStickyVariants = Record<
  "true" | "false",
  SystemStyleObject
>;

```
