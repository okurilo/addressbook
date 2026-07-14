<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Counter/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Counter`
- Строк кода: 14
- Экспорты: `BaseCounterProps`, `RoundCounterProps`
- Импорты: `../../components/Grade/RoundGrade`, `../types`
- Зависимости внутри выгрузки: [`src/blocks/types.ts`](<../types.ts.md>), [`src/components/Grade/RoundGrade/types.ts`](<../../components/Grade/RoundGrade/types.ts.md>)

## Исходная типизация

```typescript
import { RoundGrade as UIRoundCounter } from "../../components/Grade/RoundGrade";
import type { InferStyledProps, Unwrap } from "../types";

export interface BaseCounterProps {
  /**
   * Value
   */
  value: string | number;
}

export type RoundCounterProps = Unwrap<
  InferStyledProps<typeof UIRoundCounter>
> &
  BaseCounterProps;

```
