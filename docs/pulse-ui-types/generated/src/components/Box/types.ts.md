<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Box/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Box`
- Строк кода: 29
- Экспорты: `BoxProps`
- Импорты: `styled-components`, `styled-system`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { DefaultTheme } from "styled-components";
import {
  BackgroundProps,
  BorderProps,
  ColorProps,
  FlexboxProps,
  GridProps,
  LayoutProps,
  PositionProps,
  ShadowProps,
  SpaceProps,
  TypographyProps,
  BackgroundColorProps,
  BordersProps,
} from "styled-system";

export interface BoxProps
  extends BackgroundProps<DefaultTheme>,
    BorderProps<DefaultTheme>,
    ColorProps<DefaultTheme>,
    FlexboxProps<DefaultTheme>,
    GridProps<DefaultTheme>,
    LayoutProps<DefaultTheme>,
    PositionProps<DefaultTheme>,
    ShadowProps<DefaultTheme>,
    SpaceProps<DefaultTheme>,
    TypographyProps<DefaultTheme>,
    BackgroundColorProps<DefaultTheme>,
    BordersProps<DefaultTheme> {}

```
