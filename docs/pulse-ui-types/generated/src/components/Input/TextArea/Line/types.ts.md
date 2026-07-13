<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Input/TextArea/Line/types.ts`

- Источник: [types-context.part-1.md](<../../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Input`
- Строк кода: 18
- Экспорты: `LineProps`, `LineWrapperProps`
- Импорты: `../types`, `react`
- Зависимости внутри выгрузки: [`src/components/Input/TextArea/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import React from "react";
import { TextAreaProps } from "../types";

export interface LineWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Задает стиль тексту аналогичный placeholder
   */
  $hasPlaceholder?: boolean;
  /**
   * Позволяет редактировать контент внутри компонента
   */
  contentEditable?: boolean;
  children?: React.ReactNode;
}

export interface LineProps extends TextAreaProps {
  ref?: React.Ref<HTMLTextAreaElement>;
}

```
