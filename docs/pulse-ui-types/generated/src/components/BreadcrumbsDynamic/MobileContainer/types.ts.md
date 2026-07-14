<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/BreadcrumbsDynamic/MobileContainer/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `BreadcrumbsDynamic`
- Строк кода: 6
- Экспорты: `MobileContainerProps`
- Импорты: `../types`
- Зависимости внутри выгрузки: [`src/components/BreadcrumbsDynamic/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { BreadcrumbItem, BreadcrumbsProps } from "../types";

export type MobileContainerProps = {
  items: BreadcrumbItem[];
  mobileTitle?: BreadcrumbsProps["mobileTitle"];
};

```
