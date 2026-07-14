<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Select/Option/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Select`
- Строк кода: 26
- Экспорты: `InternalOptionProps`, `OptionProps`, `OptionPropsGeneric`
- Импорты: `../types`, `react`
- Зависимости внутри выгрузки: [`src/components/Select/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { FC, ReactElement, ReactNode } from "react";

import type { SelectProps, Value } from "../types";

export interface OptionProps<ValueP extends Value = string> {
  value?: SelectProps<ValueP>["value"];
  children: ReactNode;
  disabled?: boolean;
  isError?: boolean;
  errorText?: string;
  isNodeOption?: boolean;
}

export type OptionPropsGeneric<ValueP extends Value = string> = FC<
  OptionProps<ValueP>
>;

export interface InternalOptionProps {
  selected?: boolean;
  onClick?: () => void;
  minWidth?: string;
  checkbox?: boolean;
  description?: string;
  isSkeletonOption?: boolean;
  customSkeleton?: ReactElement;
}

```
