<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/icons/__stories__/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `icons`
- Компонент/группа: `icons`
- Строк кода: 7
- Экспорты: `IconCategoriesValue`, `IconTypeFilter`
- Импорты: `./icons`
- Зависимости внутри выгрузки: [`src/icons/__stories__/icons/types.ts`](<icons/types.ts.md>)

## Исходная типизация

```typescript
import type { AllType, IconCategory, IconType } from "./icons";

export type IconTypeFilter = IconType | AllType;

export type IconCategoriesValue = {
  categories: (IconCategory | AllType)[];
};

```
