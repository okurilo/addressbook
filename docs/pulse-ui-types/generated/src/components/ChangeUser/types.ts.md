<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/ChangeUser/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `ChangeUser`
- Строк кода: 22
- Экспорты: `ChangeUserProps`
- Импорты: `../Avatar`, `react`
- Зависимости внутри выгрузки: [`src/components/Avatar/types.ts`](<../Avatar/types.ts.md>)

## Исходная типизация

```typescript
import { ReactElement } from "react";
import { Size } from "../Avatar";

export interface ChangeUserProps {
  avatarSrc: string;
  avatarSize?: Size;
  name: string;
  position?: string;
  selected?: boolean;
  withChevron?: boolean;
  customIcon?: ReactElement;
  width?: string;
  height?: string;
  padding?: string;
  withPopover?: boolean;
  popoverContent?: PopoverContent[];
}

type PopoverContent = {
  title?: string;
  cards?: ReactElement[];
};

```
