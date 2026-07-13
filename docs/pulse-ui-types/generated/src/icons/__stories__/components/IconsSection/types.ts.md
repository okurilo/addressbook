<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/icons/__stories__/components/IconsSection/types.ts`

- Источник: [types-context.part-2.md](<../../../../../../raw/types-context.part-2.md>)
- Раздел: `icons`
- Компонент/группа: `icons`
- Строк кода: 19
- Экспорты: `IconsSectionProps`
- Импорты: `../../icons`
- Зависимости внутри выгрузки: [`src/icons/__stories__/icons/types.ts`](<../../icons/types.ts.md>)

## Исходная типизация

```typescript
import type {
  IconCategory,
  AllType,
  IconSize,
  IconType,
  IconColor,
  NoneType,
  ColoredType,
} from "../../icons";

export interface IconsSectionProps {
  index?: number;
  sectionName: IconCategory;
  search: string;
  selectedCategory: IconCategory | AllType;
  selectedSize: IconSize;
  selectedType: IconType | AllType;
  selectedColor: IconColor | NoneType | ColoredType;
}

```
