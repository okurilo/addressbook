<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Input/TextArea/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Input`
- Строк кода: 16
- Экспорты: `TextAreaProps`, `ToolbarPlacement`
- Импорты: `../../ToolSelector`, `react`, `styled-components`
- Зависимости внутри выгрузки: [`src/components/ToolSelector/types.ts`](<../../ToolSelector/types.ts.md>)

## Исходная типизация

```typescript
import type { DefaultTheme, StyledComponentProps } from "styled-components";
import type { ReactElement } from "react";
import type { ToolSelector } from "../../ToolSelector";

export type ToolbarPlacement = "right" | "left";

export interface TextAreaProps
  extends StyledComponentProps<
    "textarea",
    DefaultTheme,
    Record<string, unknown>,
    never
  > {
  $tools?: Array<ReactElement<typeof ToolSelector>>;
  $toolbarPlacement?: ToolbarPlacement;
}

```
