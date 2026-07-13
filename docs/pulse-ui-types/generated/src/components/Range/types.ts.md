<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Range/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Range`
- Строк кода: 80
- Экспорты: `ColorVars`, `GetRangeZIndexesArgs`, `MultiRangeSlideProps`, `ProgressProps`, `RangeSliderProps`, `RangeZIndexes`, `SingleRangeSliderProps`, `Thumb`, `Tuple`
- Импорты: `./constants`, `./Marks/types`, `react`, `styled-components`
- Зависимости внутри выгрузки: [`src/components/Range/Marks/types.ts`](<Marks/types.ts.md>)

## Исходная типизация

```typescript
import { ReactNode } from "react";
import type { DefaultTheme, StyledComponentProps } from "styled-components";
import * as c from "./constants";

import { Mark } from "./Marks/types";

export type ColorVars =
  | typeof c.DEFAULT
  | typeof c.PRIMARY
  | typeof c.SECONDARY;
export type Tuple<T> = [T, T];

export interface RangeSliderProps {
  /**
   * Цвет.
   * @default "default"
   */
  $color?: ColorVars;
  /**
   * Флаг заблокированного состояния.
   * @default false
   */
  $disabled?: boolean;
  title?: ReactNode | string;
  progressView?: ReactNode | string;
  marks?: Mark[];
  /**
   * Минимальное значение.
   * @default 0
   */
  min?: number;
  /**
   * Максимальное значение.
   * @default 100
   */
  max?: number;
  /**
   * Шаг.
   * @default 1
   */
  step?: number;
}

export interface SingleRangeSliderProps extends RangeSliderProps {
  value: number;
  onChange?(value: number): void;
}

export interface MultiRangeSlideProps extends RangeSliderProps {
  value: Tuple<number>;
  onChange?(value: Tuple<number>): void;
}

export interface ProgressProps
  extends StyledComponentProps<
    "div",
    DefaultTheme,
    Record<string, unknown>,
    never
  > {
  $disabled?: boolean;
  $state?: string;
  $color?: ColorVars | string;
}

export type Thumb = "left" | "right" | null;

export type RangeZIndexes = {
  leftIndex: number;
  rightIndex: number;
};

export type GetRangeZIndexesArgs = {
  baseZIndex: number;
  activeThumb: Thumb;
  start: number;
  end: number;
  min: number;
  max: number;
};

```
