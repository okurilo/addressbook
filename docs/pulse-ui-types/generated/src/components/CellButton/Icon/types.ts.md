<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/CellButton/Icon/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `CellButton`
- Строк кода: 16
- Экспорты: `IconProps`, `IconSizes`, `IconTypes`
- Импорты: `../../../types`, `../types`, `@styled-system/css`
- Зависимости внутри выгрузки: [`src/components/CellButton/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { SystemStyleObject } from "@styled-system/css";
import { CustomStyledProps } from "../../../types";

import { Size, Types } from "../types";

export type IconSizes = Record<Size, SystemStyleObject>;

export type IconTypes = Partial<CustomStyledProps<Types>>;

export interface IconProps {
  /**
   * @default false
   */
  $isTurnedOver?: boolean;
  $size?: Size;
}

```
