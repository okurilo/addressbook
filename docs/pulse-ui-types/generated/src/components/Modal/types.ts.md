<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Modal/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Modal`
- Строк кода: 48
- Экспорты: `ContentColumns`, `ModalContextArgs`, `ModalProps`, `PaddingSizes`, `Placement`, `PlacementStyles`
- Импорты: `./Base/types`, `@styled-system/css`, `react`
- Зависимости внутри выгрузки: [`src/components/Modal/Base/types.ts`](<Base/types.ts.md>)

## Исходная типизация

```typescript
import { SystemStyleObject } from "@styled-system/css";
import { ReactNode, RefObject } from "react";

import { ModalBaseProps, Size } from "./Base/types";

export interface ModalProps extends ModalBaseProps {
  /**
   * Элемент ActionBar.
   */
  $actionBar?: ReactNode;
  /**
   * Элемент Haader.
   */
  $header?: ReactNode;
}

export type ContentColumns = Record<Size, (number | null)[]>;

export interface ModalContextArgs {
  /**
   * Ссылка на Header.
   */
  headerRef?: RefObject<HTMLDivElement>;
  /**
   * Ссылка на ActionBar.
   */
  actionBarRef?: RefObject<HTMLDivElement>;
  /**
   * Флаг, прилипает ли Header.
   */
  headerIsSticky?: boolean;
  /**
   * Флаг, прилипает ли ActionBar.
   */
  actionBarIsSticky?: boolean;
  /**
   * Размер.
   */
  $size?: Size;
  /**
   * Колонки.
   */
  cols?: (number | null)[];
}

export type Placement = "right" | "edges";
export type PlacementStyles = Record<Placement, SystemStyleObject>;
export type PaddingSizes = Record<Size, SystemStyleObject>;

```
