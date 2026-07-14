<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/BreadcrumbsDynamic/DropDown/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `BreadcrumbsDynamic`
- Строк кода: 8
- Экспорты: `DropDownProps`
- Импорты: `../types`, `react`
- Зависимости внутри выгрузки: [`src/components/BreadcrumbsDynamic/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { ReactElement } from "react";
import type { BreadcrumbItem, BreadcrumbsProps } from "../types";

export type DropDownProps = {
  hiddenItems: BreadcrumbItem[];
  mobileTitle: BreadcrumbsProps["mobileTitle"];
  trigger?: ReactElement;
};

```
