<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Cell/__stories__/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Cell`
- Строк кода: 41
- Экспорты: `ActionKeys`, `ActionsMap`, `ExtraSubtitleKeys`, `ExtraSubtitleMap`, `SubtitleMap`, `SubtitlesKeys`, `SubtitlesVariants`, `TitleKeys`, `TitleMap`, `TitleVariant`
- Импорты: `../types`, `./const`, `react`
- Зависимости внутри выгрузки: [`src/components/Cell/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { ReactNode } from "react";
import {
  ACTION_KEYS,
  EXTRA_SUBTITLES_KEYS,
  SUBTITLES_KEYS,
  TITLE_KEYS,
} from "./const";
import { Size } from "../types";

// Явное получение типа из констант для лучшей типизации.
export type TitleKeys = (typeof TITLE_KEYS)[keyof typeof TITLE_KEYS];
export type SubtitlesKeys =
  (typeof SUBTITLES_KEYS)[keyof typeof SUBTITLES_KEYS];
export type ExtraSubtitleKeys =
  (typeof EXTRA_SUBTITLES_KEYS)[keyof typeof EXTRA_SUBTITLES_KEYS];
export type ActionKeys = (typeof ACTION_KEYS)[keyof typeof ACTION_KEYS];

export type TitleVariant =
  | "captionRegular"
  | "body2Regular"
  | "body1Regular"
  | "body1Semibold";

export type SubtitlesVariants =
  | "captionRegular"
  | "body2Regular"
  | "body1Regular";

export type TitleMap = Record<Size, Record<TitleKeys, string | ReactNode>>;
export type SubtitleMap = Record<
  Size,
  Record<SubtitlesKeys, string | ReactNode | undefined>
>;
export type ExtraSubtitleMap = Record<
  Size,
  Record<ExtraSubtitleKeys, string | ReactNode | undefined>
>;
export type ActionsMap = Record<
  Size,
  Record<ActionKeys, string | ReactNode | undefined>
>;

```
