<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/LayoutGrid/Grid/SortableItem/types.ts`

- Источник: [types-context.part-1.md](<../../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `LayoutGrid`
- Строк кода: 16
- Экспорты: `SortableItemProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ReactElement } from "react";

export interface SortableItemProps {
  /**
   * id item'а, по которому он сортируется в массиве
   */
  id: string;
  /**
   * Отключение перетаскивания
   */
  isDisabled: boolean;
  /**
   * Перетаскиваемый элемент
   */
  children: ReactElement;
}

```
