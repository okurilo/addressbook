<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Stories/Story/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Stories`
- Строк кода: 7
- Экспорты: `StoryProps`
- Импорты: `../renderers/types`
- Зависимости внутри выгрузки: [`src/components/Stories/renderers/types.ts`](<../renderers/types.ts.md>)

## Исходная типизация

```typescript
import { StoryObject } from "../renderers/types";

export interface StoryProps {
  currentId: number;
  stackItem: StoryObject[];
  stackItemIndex: number;
}

```
