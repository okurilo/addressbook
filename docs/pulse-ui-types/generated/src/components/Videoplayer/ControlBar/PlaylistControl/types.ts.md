<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Videoplayer/ControlBar/PlaylistControl/types.ts`

- Источник: [types-context.part-2.md](<../../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Videoplayer`
- Строк кода: 6
- Экспорты: `PlaylistControlProps`
- Импорты: `../../types`
- Зависимости внутри выгрузки: [`src/components/Videoplayer/types.ts`](<../../types.ts.md>)

## Исходная типизация

```typescript
import { VideoplayerActions, VideoShortInfo } from "../../types";

export interface PlaylistControlProps {
  $videoShortInfo: VideoShortInfo;
  $actionType: Extract<VideoplayerActions, "prev" | "next">;
}

```
