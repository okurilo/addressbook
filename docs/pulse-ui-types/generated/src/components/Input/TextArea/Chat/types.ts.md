<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Input/TextArea/Chat/types.ts`

- Источник: [types-context.part-1.md](<../../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Input`
- Строк кода: 28
- Экспорты: `ActionProps`, `ButtonAttributes`, `ChatWrapperProps`, `WritebarProps`
- Импорты: `../Line/types`, `react`
- Зависимости внутри выгрузки: [`src/components/Input/TextArea/Line/types.ts`](<../Line/types.ts.md>)

## Исходная типизация

```typescript
import React, { ButtonHTMLAttributes } from "react";
import { LineProps } from "../Line/types";

export interface ChatWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
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

export type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

export interface WritebarProps extends LineProps {
  leftActionFirst?: ButtonAttributes;
  rightActionFirst?: ButtonAttributes;
  rightActionSecond?: ButtonAttributes;
  rightActionThird?: ButtonAttributes;
}

export interface ActionProps {
  button?: ButtonAttributes;
  disabled?: boolean;
}

```
