<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Input/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Input`
- Строк кода: 29
- Экспорты: `DiscreteProps`, `TextProps`
- Импорты: `../../components/Input`, `../../components/TimeCounter`, `../types`, `react`
- Зависимости внутри выгрузки: [`src/blocks/types.ts`](<../types.ts.md>), [`src/components/Input/types.ts`](<../../components/Input/types.ts.md>), [`src/components/TimeCounter/types.ts`](<../../components/TimeCounter/types.ts.md>)

## Исходная типизация

```typescript
import { StyledInput as UIInput } from "../../components/Input";
import { TimeCounter as UITimeCounter } from "../../components/TimeCounter";
import type { ComponentProps } from "react";
import type { InferStyledProps } from "../types";

export interface DiscreteProps
  extends Omit<
    ComponentProps<typeof UITimeCounter>,
    "$decrease" | "$increase" | "defaultValue"
  > {
  label?: string;
}

export type TextProps = Pick<
  InferStyledProps<typeof UIInput>,
  | "autoFocus"
  | "defaultValue"
  | "disabled"
  | "id"
  | "max"
  | "maxLength"
  | "min"
  | "minLength"
  | "name"
  | "placeholder"
  | "required"
  | "type"
  | "onChange"
>;

```
