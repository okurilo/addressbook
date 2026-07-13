<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/deprecated/CellTimeline/PointSet/types.ts`

- Источник: [types-context.part-1.md](<../../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `deprecated`
- Строк кода: 7
- Экспорты: `PointSetTypeSizes`
- Импорты: `../types`, `@styled-system/css`
- Зависимости внутри выгрузки: [`src/components/deprecated/CellTimeline/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { SystemStyleObject } from "@styled-system/css";

import { Size, Types } from "../types";

export type PointSetTypeSizes = Partial<
  Record<Types, Record<Size, SystemStyleObject>>
>;

```
