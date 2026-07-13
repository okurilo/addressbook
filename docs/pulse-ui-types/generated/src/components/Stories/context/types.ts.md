<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Stories/context/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Stories`
- Строк кода: 20
- Экспорты: `GlobalContextProps`, `StoriesContextProps`, `StorySlideContextProps`
- Импорты: `../renderers/types`, `../types`
- Зависимости внутри выгрузки: [`src/components/Stories/renderers/types.ts`](<../renderers/types.ts.md>), [`src/components/Stories/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { StoriesProps } from "../types";
import { StoryObject, TogglePauseStateFunc } from "../renderers/types";

export interface GlobalContextProps
  extends Omit<StoriesProps, "onClose" | "stories"> {
  togglePauseState: TogglePauseStateFunc;
}

export interface StoriesContextProps {
  stackList: StoryObject[][];
}

export interface StorySlideContextProps {
  currentStackId: number;
  videoDuration?: number;
  stories: StoryObject[];
  next?: () => void;
  previous?: () => void;
  updateVideoDuration?: (duration: number) => void;
}

```
