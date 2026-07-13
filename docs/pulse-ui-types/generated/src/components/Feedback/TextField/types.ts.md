<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Feedback/TextField/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Feedback`
- Строк кода: 7
- Экспорты: `TextFieldProps`
- Импорты: `../../FormField`, `react`
- Зависимости внутри выгрузки: [`src/components/FormField/types.ts`](<../../FormField/types.ts.md>)

## Исходная типизация

```typescript
import { ComponentProps } from "react";

import { FormFieldProps } from "../../FormField";

export interface TextFieldProps extends Omit<FormFieldProps, "label"> {
  input?: ComponentProps<"textarea">;
}

```
