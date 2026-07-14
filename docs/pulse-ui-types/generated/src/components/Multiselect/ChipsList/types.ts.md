<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Multiselect/ChipsList/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Multiselect`
- Строк кода: 7
- Экспорты: `ChipsListProps`
- Импорты: `../types`
- Зависимости внутри выгрузки: [`src/components/Multiselect/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { ChipData } from "../types";

export type ChipsListProps = {
  chips: ChipData[];
  onRemove?: (value: string) => void;
  maxWidth: number;
};

```
