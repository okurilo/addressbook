<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Grade/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Grade`
- Строк кода: 12
- Экспорты: `BaseGradeProps`, `RoundGradeProps`
- Импорты: `../../components/Grade/RoundGrade`, `../types`
- Зависимости внутри выгрузки: [`src/blocks/types.ts`](<../types.ts.md>), [`src/components/Grade/RoundGrade/types.ts`](<../../components/Grade/RoundGrade/types.ts.md>)

## Исходная типизация

```typescript
import { RoundGrade as UIRoundGrade } from "../../components/Grade/RoundGrade";
import type { InferStyledProps, Unwrap } from "../types";

export interface BaseGradeProps {
  /**
   * Value
   */
  value: string | number;
}

export type RoundGradeProps = Unwrap<InferStyledProps<typeof UIRoundGrade>> &
  BaseGradeProps;

```
