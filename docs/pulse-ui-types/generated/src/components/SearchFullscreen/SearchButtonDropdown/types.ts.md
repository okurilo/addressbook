<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/SearchFullscreen/SearchButtonDropdown/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `SearchFullscreen`
- Строк кода: 12
- Экспорты: `ActionsSize`, `SearchButtonDropdownProps`
- Импорты: `../../Button/types`, `../types`
- Зависимости внутри выгрузки: [`src/components/Button/types.ts`](<../../Button/types.ts.md>), [`src/components/SearchFullscreen/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { Size } from "../../Button/types";
import { DropdownItem } from "../types";

export interface SearchButtonDropdownProps {
  defaultText?: string;
  items: DropdownItem[];
  selectedItem?: string;
  onSelectedItem?: (id: string) => void;
  fixedWidth?: number;
}

export type ActionsSize = Exclude<Size, "xs" | "s" | "m-alt">;

```
