<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Feedback/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Feedback`
- Строк кода: 11
- Экспорты: `FeedbackProps`
- Импорты: `../Rating`, `./TextField`, `./Title`, `react`
- Зависимости внутри выгрузки: [`src/components/Feedback/TextField/types.ts`](<TextField/types.ts.md>), [`src/components/Feedback/Title/types.ts`](<Title/types.ts.md>), [`src/components/Rating/types.ts`](<../Rating/types.ts.md>)

## Исходная типизация

```typescript
import { ReactNode } from "react";

import { RatingProps } from "../Rating";

import { TitleProps } from "./Title";
import { TextFieldProps } from "./TextField";

export interface FeedbackProps extends TitleProps, RatingProps {
  $title: ReactNode;
  clarification?: TextFieldProps;
}

```
