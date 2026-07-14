<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Stories/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Stories`
- Строк кода: 41
- Экспорты: `StoriesProps`
- Импорты: `./renderers/types`
- Зависимости внутри выгрузки: [`src/components/Stories/renderers/types.ts`](<renderers/types.ts.md>)

## Исходная типизация

```typescript
import { StoryStack, StoriesStacksList, StoryObject } from "./renderers/types";

type StoryProgress = (
  storyIndex: number,
  stackIndex: number,
  story: StoryObject
) => void;

export interface StoriesProps {
  onClose: () => void;
  stories: StoryStack | StoriesStacksList;
  /**
   * @default false
   */
  isPaused?: boolean;
  /**
   * @default false
   */
  loop?: boolean;
  /**
   * @default 5000
   */
  defaultDuration?: number;
  /**
   * @default 0
   */
  currentIndex?: number;
  /**
   * @default 0
   */
  currentStackIndex?: number;
  /**
   * @default false
   */
  keyboardNavigation?: boolean;
  onAllStoriesEnd?: (id: number, stories: StoryObject[]) => void;
  onStoryStart?: StoryProgress;
  onStoryEnd?: StoryProgress;
  onNext?: () => void;
  onPrevious?: () => void;
}

```
