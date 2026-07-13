<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/FormField/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `FormField`
- Строк кода: 21
- Экспорты: `FormFieldProps`
- Импорты: `./Title/types`, `react`
- Зависимости внутри выгрузки: [`src/components/FormField/Title/types.ts`](<Title/types.ts.md>)

## Исходная типизация

```typescript
import { ReactNode } from "react";
import { TitleProps } from "./Title/types";

export interface FormFieldProps extends TitleProps {
  /**
   * Текст подсказки.
   */
  description?: string;
  /**
   * Текст ошибки.
   */
  error?: string;
  /**
   * Дополнительный элемент справа.
   */
  addon?: ReactNode;
  /**
   * Дочерний элемент.
   */
  children?: ReactNode;
}

```
