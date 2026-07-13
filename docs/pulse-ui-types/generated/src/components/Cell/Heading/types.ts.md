<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Cell/Heading/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Cell`
- Строк кода: 35
- Экспорты: `HeadingProps`
- Импорты: `../types`, `react`
- Зависимости внутри выгрузки: [`src/components/Cell/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { ReactNode } from "react";
import { Variant } from "../types";

export type HeadingProps = {
  /**
   * Основной текст подзаголовка.
   */
  text: string;
  /**
   * Дополнительный текст подзаголовка.
   */
  additionalText?: string;
  /**
   * Значение грейда.
   */
  grade?: string;
  /**
   * Иконка слева (любой SVG-компонент).
   */
  leftIcon?: ReactNode;
  /**
   * Иконка справа (любой SVG-компонент).
   */
  rightIcon?: ReactNode;
  /**
   * Вариант шрифта.
   * @default body1Regular
   */
  variant?: Variant;
  /**
   * Тип заголовка, влияет на порядок отображения.
   * @default "subtitle"
   */
  headingType?: "title" | "subtitle";
};

```
