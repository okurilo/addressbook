<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Title/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Title`
- Строк кода: 14
- Экспорты: `TitleProps`
- Импорты: `../../components/Title`, `../types`
- Зависимости внутри выгрузки: [`src/blocks/types.ts`](<../types.ts.md>), [`src/components/Title/types.ts`](<../../components/Title/types.ts.md>)

## Исходная типизация

```typescript
import { Title } from "../../components/Title";
import type { InferStyledProps, Unwrap } from "../types";

export interface TitleProps
  extends Unwrap<Pick<InferStyledProps<typeof Title>, "$size">> {
  /**
   * Значение счетчика
   */
  counter?: number;
  /**
   * Текст
   */
  text: string | undefined;
}

```
