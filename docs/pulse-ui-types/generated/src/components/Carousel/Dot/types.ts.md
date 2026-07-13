<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Carousel/Dot/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Carousel`
- Строк кода: 34
- Экспорты: `ContainerStyledProps`, `DotProps`, `DotsActiveVariants`, `DotsSizeVariants`, `DotStyledProps`, `Size`
- Импорты: `../../../types`, `styled-components`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { DefaultTheme, CSSProperties } from "styled-components";
import { CustomStyledProps } from "../../../types";

export type Size = "s" | "m" | "l";

export interface DotStyledProps {
  $isActive?: boolean;
}

export interface DotProps extends DotStyledProps, ContainerStyledProps {
  /**
   * @default 0
   */
  $index?: number;
  style?: CSSProperties;
}

export interface ContainerStyledProps {
  /**
   * Количество отступов слева на размер элемента
   * @default 0
   */
  $offset?: number;
  /**
   * @default l
   */
  $size?: Size;
}

export type DotsActiveVariants = Record<
  "true" | "false",
  (theme: DefaultTheme) => CSSProperties
>;
export type DotsSizeVariants = CustomStyledProps<Size>;

```
