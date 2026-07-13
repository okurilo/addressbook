<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Tags/Tag/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Tags`
- Строк кода: 33
- Экспорты: `Color`, `TagColor`, `TagProps`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export type TagColor =
  | "yellow"
  | "blue"
  | "purple"
  | "orange"
  | "magenta"
  | "green"
  | "red"
  | "teal"
  | "cyan"
  | "lime"
  | "grey"
  | "white";

export type Color = TagColor;

export interface TagProps {
  /**
   * Размер.
   * @default m
   */
  $size?: "s" | "m";
  /**
   * Цвет фона.
   * @default yellow
   */
  $color?: Color;
  /**
   * Флаг включения кликабельности компонента.
   * @default false
   */
  isClickable?: boolean;
}

```
