<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/PDFViewer/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `PDFViewer`
- Строк кода: 128
- Экспорты: `InternalisationProps`, `Outline`, `PDFViewerProps`, `SidebarProps`, `ToolbarProps`, `UsePDFViewerOptions`, `UsePDFViewerReturn`, `ZoomPreset`, `ZoomValue`
- Импорты: `pdfjs-dist`, `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";
import React from "react";

export type ZoomPreset =
  | "auto"
  | "actual"
  | "fit-height"
  | "fit-width"
  | 50
  | 75
  | 100
  | 125
  | 150
  | 200
  | 300
  | 400;

export type ZoomValue = ZoomPreset;

export interface ToolbarProps {
  currentPage: number;
  totalPages: number;
  zoom: ZoomValue;
  isSidebarOpen: boolean;
  onPageChange: (page: number) => void;
  onZoomChange: (zoom: ZoomValue) => void;
  onToggleSidebar: () => void;
  onPrint: () => void;
  isPrintButtonVisible: boolean;
  onDownload: () => void;
  isDownLoadButtonVisible: boolean;
  inFloatingModal: boolean | undefined;
  internalisation: Partial<Pick<InternalisationProps, "toolbar">> | undefined;
  onRotate: () => void;
}

export interface SidebarProps {
  isOpen: boolean;
  totalPages: number;
  currentPage: number;
  thumbnails: (string | null)[];
  onPageSelect: (page: number) => void;
  onClose: () => void;
  outlines: Outline[] | null;
}

export interface UsePDFViewerOptions {
  source: string | ArrayBuffer;
  rotationIndex: number;
  initialPage?: number;
  initialZoom?: ZoomValue;
  onUserClickDownload?: () => void;
  onUserClickPrint?: () => void;
}

export interface UsePDFViewerReturn {
  pdfDocument: PDFDocumentProxy | null;
  isLoading: boolean;
  error: Error | null;
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  goToPrev: () => void;
  goToNext: () => void;
  zoom: ZoomValue;
  setZoom: (zoom: ZoomValue) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  thumbnails: (string | null)[];
  pageCanvasRefs: React.RefObject<(HTMLCanvasElement | null)[]>;
  pageTextLayerRefs: React.RefObject<(HTMLDivElement | null)[]>;
  viewerContainerRef: React.RefObject<HTMLDivElement>;
  scrollToPage: (page: number) => void;
  print: () => void;
  download: () => void;
  outlines: Outline[] | null;
}

export interface InternalisationProps {
  toolbar: {
    sidebarToggleAriaLabel: { open: string; close: string };
    nextPageButtonAriaLabel: string;
    prevPageButtonAriaLabel: string;
    inputPageNumberAriaLabel: string;
    printButtonAriaLabel: string;
    downloadButtonAriaLabel: string;
    textOfPagesCount: string;
    zoomInAriaLabel: string;
    zoomOutAriaLabel: string;
    zoomOptions: Record<ZoomPreset, string>;
    rotation: string;
  };
  error: {
    title: string;
    description: string;
  };
  pageTranslation: string;
  pageFromTranslation: string;
}

export interface PDFViewerProps {
  source: string | ArrayBuffer;
  className?: string;
  inFloatingModal?: boolean;
  internalisation?: InternalisationProps;
  onUserClickPrint?: () => void;
  hidePrintButton?: boolean;
  onUserClickDownload?: () => void;
  hideDownloadButton?: boolean;
}

export type { PDFDocumentProxy, PDFPageProxy };

export type Outline = {
  title: string;
  bold: boolean;
  italic: boolean;
  color: Uint8ClampedArray<ArrayBufferLike>;
  dest: string | Array<unknown> | null;
  url: string | null;
  unsafeUrl: string | undefined;
  newWindow: boolean | undefined;
  count: number | undefined;
  items: Array<unknown>;
  pageNumber?: number;
};

```
