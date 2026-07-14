<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/ImageViewer/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `ImageViewer`
- Строк кода: 51
- Экспорты: `ImageViewerProps`, `LayoutResult`, `NaturalSize`, `Rotation`, `ViewportSize`, `ZoomPercentVariant`, `ZoomTextVariant`, `ZoomVariant`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export type ZoomTextVariant =
  | "автоматически"
  | "актуальный размер"
  | "заполняет высоту"
  | "заполняет ширину";

export type ZoomPercentVariant = 50 | 75 | 100 | 125 | 150 | 200 | 300 | 400;

export type ZoomVariant = ZoomTextVariant | ZoomPercentVariant;

export type Rotation = 0 | 90 | 180 | 270;

export interface NaturalSize {
  width: number;
  height: number;
}

export interface ViewportSize {
  width: number;
  height: number;
}

export interface LayoutResult {
  renderedWidth: number;
  renderedHeight: number;
  stageWidth: number;
  stageHeight: number;
  overflowX: boolean;
  overflowY: boolean;
  alignX: "left" | "center";
  alignY: "top" | "center";
  scale: number;
  effectiveImageWidth: number;
  effectiveImageHeight: number;
}

export interface ImageViewerProps {
  src: string;
  alt?: string;
  className?: string;
  dataTestId?: string;
  onDownload?: () => void;
  internalisation?: {
    download?: string;
    rotate?: string;
    zoomAuto?: string;
    zoomActual?: string;
    zoomHeight?: string;
    zoomWidth?: string;
  };
}

```
