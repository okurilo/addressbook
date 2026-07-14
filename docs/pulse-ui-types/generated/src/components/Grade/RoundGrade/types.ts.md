<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Grade/RoundGrade/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Grade`
- Строк кода: 18
- Экспорты: `GradeProps`, `Size`, `Style`
- Импорты: `../types`
- Зависимости внутри выгрузки: [`src/components/Grade/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { BaseProps } from "../types";

export type Size = "m" | "s";
export type Style = "default" | "black";

export interface GradeProps extends BaseProps {
  /**
   * Размер.
   * @default m
   */
  $size?: Size;

  /**
   * Вариант отображения.
   * @default default
   */
  $style?: Style;
}

```
