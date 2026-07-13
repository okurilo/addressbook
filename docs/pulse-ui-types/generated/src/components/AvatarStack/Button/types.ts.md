<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/AvatarStack/Button/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `AvatarStack`
- Строк кода: 9
- Экспорты: `ButtonProps`, `Sizes`
- Импорты: `../types`, `@styled-system/css`
- Зависимости внутри выгрузки: [`src/components/AvatarStack/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { SystemStyleObject } from "@styled-system/css";

import { Size } from "../types";

export interface ButtonProps {
  $size: Size;
}

export type Sizes = Record<Size, SystemStyleObject>;

```
