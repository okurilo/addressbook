<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Link/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Link`
- Строк кода: 20
- Экспорты: `LinkProps`
- Импорты: `styled-components`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { DefaultTheme } from "styled-components";

export interface LinkProps {
  // Открывать в новом окне
  blank?: boolean;
  // URL
  href: string;
  // Типографика
  type?: Extract<
    keyof DefaultTheme["typography"],
    | "body1Regular"
    | "body1Semibold"
    | "body2Regular"
    | "body2Semibold"
    | "captionRegular"
    | "captionSemibold"
  >;
  // Текст
  text: string;
}

```
