<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Loader/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Loader`
- Строк кода: 25
- Экспорты: `LoaderProps`, `Size`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ReactNode } from "react";

export type Size = "m" | "l";
export interface LoaderProps {
  /**
   * Для Loader на цветной фоне.
   * @default false
   */
  isOnColor?: boolean;
  /**
   * Размер иконки.
   * @default "m"
   */
  size?: Size;
  /**
   * Если true, то иконка будет обернута в центрующий div.
   * Используется, когда не передается children.
   * @default false
   */
  wrapped?: boolean;
  /**
   * Перекрываемый контент.
   */
  children?: ReactNode;
}

```
