<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Carousel/DotsContainer/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Carousel`
- Строк кода: 16
- Экспорты: `ContainerProps`, `DotsContainerProps`
- Импорты: `../types`, `react`
- Зависимости внутри выгрузки: [`src/components/Carousel/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { ReactNode } from "react";
import type { CarouselProps } from "../types";

export interface ContainerProps {
  $isDynamic?: boolean;
  $width?: number;
}

export interface DotsContainerProps
  extends Pick<CarouselProps, "$dots" | "$dynamicDots">,
    Required<Pick<CarouselProps, "$dynamicDotsWidth">> {
  $dynamicDotsCount: number;
  $left: ReactNode;
  $right: ReactNode;
  $hideDots?: boolean;
}

```
