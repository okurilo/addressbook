<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Videoplayer/Playlist/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Videoplayer`
- Строк кода: 36
- Экспорты: `Playlist`, `PlaylistItem`, `PlaylistProps`, `PreviewProps`, `VideoCellContextProps`, `VideoCellProps`
- Импорты: `../types`, `react`
- Зависимости внутри выгрузки: [`src/components/Videoplayer/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { ReactNode } from "react";
import { Source, Track } from "../types";

export interface VideoCellProps {
  $prefix?: JSX.Element;
  $isPlaying?: boolean;
}

export interface PreviewProps {
  $src: string;
}

export interface VideoCellContextProps {
  $isPlaying?: boolean;
  hovered?: boolean;
}

export interface Playlist {
  title: string;
  items: PlaylistItem[];
}

export interface PlaylistProps {
  $header?: ReactNode;
  $counter?: ReactNode;
}

export interface PlaylistItem {
  // sources[] так как можно передать массив с разным качеством
  sources: Source[];
  smallPoster?: string;
  videoPoster?: string;
  title?: string;
  duration?: number;
  textTracks?: Track[];
}

```
