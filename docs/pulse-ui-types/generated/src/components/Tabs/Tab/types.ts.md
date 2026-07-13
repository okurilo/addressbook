<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Tabs/Tab/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Tabs`
- Строк кода: 33
- Экспорты: `States`, `TabProps`
- Импорты: `../types`, `react`
- Зависимости внутри выгрузки: [`src/components/Tabs/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { MouseEvent, ReactNode } from "react";
import type { Type } from "../types";

export type States = "active" | "hover" | "focus" | "selected" | "pressed";

type TabBaseProps = {
  /**
   * @default false
   */
  $isActive?: boolean;
  /**
   * @default primary
   */
  $type?: Type;
  $state?: States;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  children?: ReactNode;
};

type RegularTabExtras = {
  description?: never;
  /**
   * @default false
   */
  $badge?: boolean;
};

type DescriptionTabExtras = {
  description: string;
  $badge?: never;
};

export type TabProps = TabBaseProps & (RegularTabExtras | DescriptionTabExtras);

```
