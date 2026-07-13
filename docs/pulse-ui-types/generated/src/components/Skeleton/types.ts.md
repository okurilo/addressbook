<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Skeleton/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Skeleton`
- Строк кода: 24
- Экспорты: `SkeletonCircleProps`, `SkeletonProps`, `SkeletonRectProps`, `SkeletonTextProps`
- Импорты: `styled-components`, `styled-system`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { LayoutProps, SpaceProps, ColorProps } from "styled-system";
import type { DefaultTheme } from "styled-components";

export interface SkeletonProps extends LayoutProps, SpaceProps, ColorProps {}

export type SkeletonRectProps = SkeletonProps;
export type SkeletonCircleProps = SkeletonProps;

type TypographyVariant = keyof DefaultTheme["typography"];

export interface SkeletonTextProps extends SkeletonProps {
  /**
   * Высота первой строки
   */
  firstLineHeight?: TypographyVariant;
  /**
   * Высота строки
   */
  lineHeight?: TypographyVariant;
  /**
   * Количество повторений
   */
  lines?: number;
}

```
