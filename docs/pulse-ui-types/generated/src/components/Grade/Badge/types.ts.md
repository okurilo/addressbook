<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Grade/Badge/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Grade`
- Строк кода: 18
- Экспорты: `BadgeProps`, `Size`, `Style`
- Импорты: `../types`
- Зависимости внутри выгрузки: [`src/components/Grade/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { BaseProps } from "../types";

export type Size = "m" | "l";
export type Style = "red" | "blue";

export interface BadgeProps extends BaseProps {
  /**
   * Размер.
   * @default m
   */
  $size?: Size;

  /**
   * Вариант отображения.
   * @default red
   */
  $style?: Style;
}

```
