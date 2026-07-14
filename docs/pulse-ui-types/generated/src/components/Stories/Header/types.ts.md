<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Stories/Header/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Stories`
- Строк кода: 11
- Экспорты: `HeaderProps`
- Импорты: `../renderers/types`
- Зависимости внутри выгрузки: [`src/components/Stories/renderers/types.ts`](<../renderers/types.ts.md>)

## Исходная типизация

```typescript
import { StoryObject } from "../renderers/types";
import type { TogglePauseStateFunc } from "../renderers/types";

export interface HeaderProps {
  story: StoryObject;
  isPaused?: boolean;
  isLoaded: boolean;
  togglePauseState: TogglePauseStateFunc;
  isMuted?: boolean;
  setMuted?: (state: boolean) => void;
}

```
