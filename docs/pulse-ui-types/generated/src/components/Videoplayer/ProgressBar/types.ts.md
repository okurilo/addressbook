<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Videoplayer/ProgressBar/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Videoplayer`
- Строк кода: 24
- Экспорты: `BufferedTimeRangesProps`, `PreviewImageProps`, `ProgressBarProps`, `ProgressBarType`, `TimeTooltipProps`
- Импорты: `../types`
- Зависимости внутри выгрузки: [`src/components/Videoplayer/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { ControlBarProps } from "../types";

export type ProgressBarType = "default" | "actual" | "buffered" | "hovered";

export interface ProgressBarProps {
  $type?: ProgressBarType;
  $hovered?: boolean;
  $onHoverPreviewChange?: ControlBarProps["$onHoverPreviewChange"];
}

export interface PreviewImageProps {
  $src?: string;
}

export interface TimeTooltipProps {
  time: number;
  $onHoverPreviewChange: ControlBarProps["$onHoverPreviewChange"];
}

export interface BufferedTimeRangesProps {
  timeRanges?: TimeRanges;
  duration: number;
  currentTime: number;
}

```
