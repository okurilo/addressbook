<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Stories/renderers/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Stories`
- Строк кода: 40
- Экспорты: `RendererProps`, `StoriesStacksList`, `StoryObject`, `StoryStack`, `TesterFunc`, `TogglePauseStateFunc`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { FC } from "react";

export type TogglePauseStateFunc = (action: boolean | undefined) => void;

export interface StoryObject {
  setSet?: string;
  url?: string;
  header?: {
    heading: string;
    subheading: string;
    profileImage: string;
    onClickProfileImage?: () => void;
  };
  type?: "image" | "video";
  duration?: number;
  content?: RendererProps;
  renderer?: RendererProps;
  hasProgressBar?: boolean;
}

export type StoryStack = (StoryObject | string)[];

export type StoriesStacksList = StoryStack[];

export type RendererProps = FC<{
  previous?: () => void;
  next?: () => void;
  togglePauseState: TogglePauseStateFunc;
  isPaused?: boolean;
  story: StoryObject;
  messageHandler: (type: string, story: StoryObject) => void;
  hasHeader?: boolean;
  /** текст ошибки в сторис с типом noContent, который надо вообще удалить */
  loadingErrorText?: string;
}>;

export type TesterFunc = (story: StoryObject) => {
  condition: boolean;
  priority: number;
};

```
