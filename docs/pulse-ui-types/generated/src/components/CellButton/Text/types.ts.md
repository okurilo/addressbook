<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/CellButton/Text/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `CellButton`
- Строк кода: 14
- Экспорты: `TextProps`, `TextTypes`
- Импорты: `../../../types`, `../types`, `styled-components`
- Зависимости внутри выгрузки: [`src/components/CellButton/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { DefaultTheme, StyledComponentProps } from "styled-components";
import { CustomStyledProps } from "../../../types";

import { Types } from "../types";

export type TextTypes = CustomStyledProps<Types>;

// Нужно чтобы опустить наследованные пропсы из Text компонента
export type TextProps = StyledComponentProps<
  "div",
  DefaultTheme,
  Record<string, unknown>,
  never
>;

```
