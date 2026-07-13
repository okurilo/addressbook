<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Input/TextArea/TextAreaToolbar/types.ts`

- Источник: [types-context.part-1.md](<../../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Input`
- Строк кода: 9
- Экспорты: `TextAreaToolbarPlacement`, `TextAreaToolbarProps`
- Импорты: `../../../ToolSelector`, `react`
- Зависимости внутри выгрузки: [`src/components/ToolSelector/types.ts`](<../../../ToolSelector/types.ts.md>)

## Исходная типизация

```typescript
import { ReactElement } from "react";
import { ToolSelector } from "../../../ToolSelector";

export type TextAreaToolbarPlacement = "right" | "left";

export interface TextAreaToolbarProps {
  $placement: TextAreaToolbarPlacement;
  $tools: Array<ReactElement<typeof ToolSelector>>;
}

```
