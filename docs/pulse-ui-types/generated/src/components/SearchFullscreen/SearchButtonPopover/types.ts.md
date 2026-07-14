<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/SearchFullscreen/SearchButtonPopover/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `SearchFullscreen`
- Строк кода: 23
- Экспорты: `ActionsProps`, `ActionsSize`
- Импорты: `../../Button/types`, `../types`
- Зависимости внутри выгрузки: [`src/components/Button/types.ts`](<../../Button/types.ts.md>), [`src/components/SearchFullscreen/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { Size } from "../../Button/types";
import { Item } from "../types";

export interface ActionsProps {
  /**
   * Текст на кнопке
   */
  text?: string;
  /**
   * Коллбэк при клике на кнопку
   */
  onClick?: () => void;
  /**
   * Опции выпадающего списка
   */
  items?: Item[];
  /**
   * ID опции, выбранной по умолчанию в выпадающем списке
   */
  defaultSelectedId?: string;
}

export type ActionsSize = Exclude<Size, "xs" | "s" | "m-alt">;

```
