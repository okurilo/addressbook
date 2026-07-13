<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Drawer/Content/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Drawer`
- Строк кода: 17
- Экспорты: `ContentProps`
- Импорты: `../types`, `react`
- Зависимости внутри выгрузки: [`src/components/Drawer/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { RefObject } from "react";
import type { SelectItemsAndClickHandlerResult } from "../types";

export interface ContentProps {
  /**
   * Отвечает за отображение children или элементов из Stack.
   */
  isEmptyStack: boolean;
  /**
   * Обработчик выбора элементов и клика.
   */
  selectItemsAndClickHandler: () => SelectItemsAndClickHandlerResult;
  /**
   * ref на div с содержимым.
   */
  contentRef: RefObject<HTMLDivElement>;
}

```
