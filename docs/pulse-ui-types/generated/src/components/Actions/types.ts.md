<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Actions/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Actions`
- Строк кода: 31
- Экспорты: `ActionsProps`, `ActionsSize`, `Item`
- Импорты: `../ActionSheet`, `../Button/types`, `react`
- Зависимости внутри выгрузки: [`src/components/ActionSheet/types.ts`](<../ActionSheet/types.ts.md>), [`src/components/Button/types.ts`](<../Button/types.ts.md>)

## Исходная типизация

```typescript
import { PropsWithChildren } from "react";
import { ActionSheetProps } from "../ActionSheet";
import { Size } from "../Button/types";

export interface Item extends PropsWithChildren {
  /**
   * Уникальный идентификатор
   */
  id: string;
  /**
   * Коллбэк при клике
   */
  onClick?: () => void;
}

export interface ActionsProps {
  /**
   * Список действий.
   */
  items: Item[];
  /**
   * Размер компонента.
   */
  size?: ActionsSize;
  /**
   * Выравнивание списка действий.
   */
  align?: ActionSheetProps["$align"];
}

export type ActionsSize = Exclude<Size, "xs" | "s" | "m-alt">;

```
