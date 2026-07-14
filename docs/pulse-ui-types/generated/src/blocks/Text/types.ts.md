<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Text/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Text`
- Строк кода: 44
- Экспорты: `TextProps`
- Импорты: `styled-components`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { CSSProperties, DefaultTheme } from "styled-components";

export interface TextProps {
  /**
   * Выравнивание по горизонтали
   */
  align?: Extract<CSSProperties["textAlign"], "left" | "center" | "right">;
  /**
   * Цвет
   */
  color?:
    | Exclude<
        keyof DefaultTheme["tokens"]["current"]["colors"],
        "black" | "white"
      >
    | Extract<
        keyof DefaultTheme["tokens"]["current"]["core"]["text"],
        "primary" | "secondary" | "tertiary"
      >;
  /**
   * Выключает перенос строк и добавляет многоточие в конце, если текст не помещается в ширину блока
   */
  noWrap?: boolean;
  /**
   * Текст
   */
  text: number | string | null | undefined;
  /**
   * Тултип
   */
  tooltip?: string;
  /**
   * Типографика
   */
  type?: Extract<
    keyof DefaultTheme["typography"],
    | "body1Regular"
    | "body1Semibold"
    | "body2Regular"
    | "body2Semibold"
    | "captionRegular"
    | "captionSemibold"
  >;
}

```
