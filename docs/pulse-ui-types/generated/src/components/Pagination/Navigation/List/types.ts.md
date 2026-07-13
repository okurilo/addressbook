<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Pagination/Navigation/List/types.ts`

- Источник: [types-context.part-2.md](<../../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Pagination`
- Строк кода: 22
- Экспорты: `ListCountProps`, `ListItemsProps`
- Импорты: `../types`
- Зависимости внутри выгрузки: [`src/components/Pagination/Navigation/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { NavigationCountProps } from "../types";

export interface ListItemsProps {
  onForward: (
    nextActiveIdx: number,
    firstIdxOnPage?: number,
    lastIdxOnPage?: number
  ) => void;
  onBackward: (
    nextActiveIdx: number,
    firstIdxOnPage?: number,
    lastIdxOnPage?: number
  ) => void;
  itemsOnPage: NavigationCountProps["$itemsOnPage"];
}

export interface ListCountProps {
  currentPage: number;
  totalPages: number;
  onChange: NavigationCountProps["$onChange"];
  itemsOnPage: NavigationCountProps["$itemsOnPage"];
}

```
