<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/CellButton/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `CellButton`
- Строк кода: 19
- Экспорты: `CellButtonProps`
- Импорты: `../../components/CellButton`, `../Icon/icons`, `../types`
- Зависимости внутри выгрузки: [`src/blocks/types.ts`](<../types.ts.md>), [`src/components/CellButton/types.ts`](<../../components/CellButton/types.ts.md>)

## Исходная типизация

```typescript
import type { CellButtonProps as BaseCellButtonProps } from "../../components/CellButton";
import icons from "../Icon/icons";
import type { Unwrap } from "../types";

export interface CellButtonProps
  extends Unwrap<Pick<BaseCellButtonProps, "$size" | "$type" | "onClick">> {
  /**
   * Icon
   */
  icon?: keyof typeof icons;
  /**
   * Icon position
   */
  iconPosition?: "left" | "right";
  /**
   * Label
   */
  label: string;
}

```
