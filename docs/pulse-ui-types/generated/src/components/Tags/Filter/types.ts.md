<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Tags/Filter/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Tags`
- Строк кода: 19
- Экспорты: `FilterProps`, `State`
- Импорты: `../Tag/types`
- Зависимости внутри выгрузки: [`src/components/Tags/Tag/types.ts`](<../Tag/types.ts.md>)

## Исходная типизация

```typescript
import type { Color } from "../Tag/types";

export type State = "default" | "disabled";

export interface FilterProps {
  /**
   * @default default
   */
  $state?: State;
  /**
   * Значение счетчика.
   */
  $counter?: number;
  /**
   * Цвет фона.
   * @default yellow
   */
  $color?: Color;
}

```
