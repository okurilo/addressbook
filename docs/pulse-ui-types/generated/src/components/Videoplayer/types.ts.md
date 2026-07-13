<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Videoplayer/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Videoplayer`
- Строк кода: 208
- Экспорты: `ActionTooltipMessage`, `ContainerElement`, `ContainerProps`, `ContainerRef`, `ControlBarProps`, `Error`, `HlsElement`, `IconWrapperProps`, `PlaybackContextProps`, `SkeletonProps`, `Source`, `TagContent`, `TooltipMessages`, `Track`, `TrackKind`, `TransitionWrapperProps`, `VideoElement`, `VideoHotkeys`, `VideoplayerActions`, `VideoplayerContextProps`, `VideoplayerMenu`, `VideoplayerProps`, `VideoPlaylistOptions`, `VideoQualitySettings`, `VideoRef`, `VideoShortInfo`
- Импорты: `hls.js`, `react`, `react-transition-group`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import {
  Dispatch,
  MouseEventHandler,
  ReactNode,
  RefObject,
  SetStateAction,
  VideoHTMLAttributes,
} from "react";

import { TransitionStatus } from "react-transition-group";
import Hls, { HlsConfig } from "hls.js";

export type { HlsConfig } from "hls.js";

export type VideoElement = HTMLVideoElement;
export type ContainerElement = HTMLDivElement;
export type HlsElement = Hls | null;

export type VideoRef = RefObject<VideoElement>;
export type ContainerRef = RefObject<ContainerElement>;
type HlsRef = RefObject<HlsElement>;

export interface ContainerProps {
  $ratio: number;
  isCursorVisible: boolean;
}

export interface VideoPlaylistOptions {
  $prevVideo?: VideoShortInfo;
  $nextVideo?: VideoShortInfo;
}

export interface ControlBarProps extends VideoPlaylistOptions {
  state?: TransitionStatus;
  $onHoverPreviewChange: VideoplayerProps["$onHoverPreviewChange"];
}

export interface TransitionWrapperProps extends Omit<ControlBarProps, "state"> {
  interactionsStarted: boolean;
  hovered: boolean;
  activeMenu: VideoplayerMenu;
  isActive: boolean;
}

export interface Source {
  src: string;
  type?: string;
  /**
   * Example: 720, 1080
   */
  quality?: number;
  label?: string;
}

export interface VideoplayerProps
  extends VideoPlaylistOptions,
    VideoHTMLAttributes<HTMLVideoElement> {
  $sources: Source[];
  $poster?: string;
  $currentProgress?: number;
  $onInit?: (player: HTMLVideoElement) => void;
  $handleSendProgress?: (percent: number, currentTime: number) => void;
  $onHoverPreviewChange?: (hoveredTime: number) => string;
  $registerProgressDelay?: number;
  $error?: Error;
  $textTracks?: Track[];
  /**
   * Для поддержки [HLS](https://www.w3.org/TR/media-timed-events/#http-live-streaming) используется библиотека [hls.js](https://github.com/video-dev/hls.js).
   * Можно передать нужные параметры через [HlsConfig](https://github.com/video-dev/hls.js/blob/master/docs/API.md#hlsdefaultconfig-getset).
   */
  $hlsConfig?: HlsConfig;
}

export interface VideoplayerContextProps {
  videoRef: VideoRef;
  containerRef: ContainerRef;
  hlsRef: HlsRef;
  $sources: VideoplayerProps["$sources"];
  activeMenu?: VideoplayerMenu;
  setActiveMenu?: Dispatch<SetStateAction<VideoplayerMenu>>;
}

export type VideoplayerMenu =
  | "main"
  | "quality"
  | "subtitles"
  | "playbackRate"
  | "audiotracks"
  | null;

export type VideoplayerActions =
  | "prev"
  | "next"
  | "fullscreen"
  | "settings"
  | "repeat"
  | "mute"
  | "play"
  | "pausePlay"
  | "rewindForward"
  | "rewindBackward";

/** Качество видео - ссылка */
export type VideoQualitySettings = Record<string, string>;

export interface ActionTooltipMessage {
  on: string;
  off: string;
}

export type TooltipMessages = string | ActionTooltipMessage;

export interface IconWrapperProps {
  $icon?: ReactNode;
  $onClick: MouseEventHandler;
  $actionType: VideoplayerActions;
}

export interface TagContent {
  content: string;
  hotkey?: string;
}

export interface VideoShortInfo {
  /**
   * Обработчик перехода на видео.
   */
  onClick: () => void;
  previewImg?: string;
  description?: string;
}

export interface SkeletonProps {
  $isError?: boolean;
}

export interface Error {
  title?: string;
  description?: string;
}

export interface PlaybackContextProps {
  currentTime: number;
  duration: number;
  bufferedTimes?: TimeRanges;
}

/**
 * Tracks
 */
export type TrackKind =
  | "subtitles"
  | "captions"
  | "descriptions"
  | "chapters"
  | "metadata";

interface TrackBase {
  /**
   * Адрес файла текстовой дорожки.
   *
   * Текстовые дорожки из другого домена:
   * Если необходимо чтобы видео было с одного домена, а текстовые дорожки - с другого, нужно включить CORS на сервере, который обслуживает ваши текстовые дорожки.
   * В дополнение к включению CORS, также потребуется добавить атрибут crossorigin к самому элементу видео.
   * <Videoplayer crossOrigin="anonymous" ... />
   */
  src: string;
  /**
   * Отображаемое название дорожки.
   *
   * Используется в меню выбора языка субтитров.
   */
  label: string;
  /**
   * Тип дорожки.
   *
   * Возможные варианты: https://developer.mozilla.org/ru/docs/Web/HTML/Element/track#attr-kind
   */
  kind: TrackKind;
}

interface SubtitlesTrack extends TrackBase {
  kind: "subtitles";
  srclang: string;
}

type OtherTrack = TrackBase & {
  kind: Exclude<TrackKind, "subtitles">;
  /**
   * Язык дорожки.
   *
   * Возможные варианты: https://htmlbook.ru/html/value/lang
   * Если для атрибута kind установлено значение subtitles, должен быть определён атрибут srclang.
   */
  srclang?: never;
};

export type Track = SubtitlesTrack | OtherTrack;

type HotkeyData = {
  keyCode: KeyboardEvent["code"];
  label: string;
};

export type VideoHotkeys = Record<
  Exclude<VideoplayerActions, "settings" | "repeat" | "prev" | "next">,
  HotkeyData
>;

```
