<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Multiselect/Option/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Multiselect`
- Строк кода: 21
- Экспорты: `InternalOptionProps`, `OptionProps`, `OptionPropsGeneric`
- Импорты: `../types`, `react`
- Зависимости внутри выгрузки: [`src/components/Multiselect/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { FC, ReactNode } from "react";

import type { Value } from "../types";

export interface OptionProps<ValueP extends Value = string> {
  value?: ValueP;
  children: ReactNode;
  disabled?: boolean;
  selected?: boolean;
  isError?: boolean;
  errorText?: string;
}

export type OptionPropsGeneric<ValueP extends Value = string> = FC<
  OptionProps<ValueP>
>;

export interface InternalOptionProps {
  onClick?: () => void;
  minWidth?: string;
}

```
