<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/deprecated/CellTimeline/Point/types.ts`

- Источник: [types-context.part-1.md](<../../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `deprecated`
- Строк кода: 15
- Экспорты: `PointTypes`, `PointTypeSize`, `PointTypeSizes`
- Импорты: `../../../../types`, `../types`, `@styled-system/css`
- Зависимости внутри выгрузки: [`src/components/deprecated/CellTimeline/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { SystemStyleObject } from "@styled-system/css";
import { CustomStyledProps } from "../../../../types";

import { Size, Types } from "../types";

export type PointTypes = CustomStyledProps<Types>;

export type PointTypeSizes = Record<
  Types,
  Partial<Record<Size, SystemStyleObject>>
>;

export type PointTypeSize = Partial<
  Record<Types, Partial<Record<Size, string>>>
>;

```
