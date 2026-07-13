<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/icons/__stories__/components/IconWithCopyButton/types.ts`

- Источник: [types-context.part-2.md](<../../../../../../raw/types-context.part-2.md>)
- Раздел: `icons`
- Компонент/группа: `icons`
- Строк кода: 13
- Экспорты: `IconWithCopyButtonProps`
- Импорты: `../../icons`
- Зависимости внутри выгрузки: [`src/icons/__stories__/icons/types.ts`](<../../icons/types.ts.md>)

## Исходная типизация

```typescript
import type {
  ColoredType,
  IconColor,
  IconNames,
  IconSize,
  NoneType,
} from "../../icons";

export interface IconWithCopyButtonProps {
  name: IconNames;
  size: IconSize;
  selectedColor: IconColor | ColoredType | NoneType;
}

```
