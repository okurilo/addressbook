<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Text/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Text`
- Строк кода: 10
- Экспорты: `TextProps`
- Импорты: `styled-components`, `styled-system`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { DefaultTheme } from "styled-components";
import { ColorProps, ResponsiveValue, SpaceProps } from "styled-system";

type Variant = keyof DefaultTheme["typography"];

export interface TextProps
  extends ColorProps<DefaultTheme>,
    SpaceProps<DefaultTheme> {
  variant: Variant | ResponsiveValue<Variant, DefaultTheme>;
}

```
