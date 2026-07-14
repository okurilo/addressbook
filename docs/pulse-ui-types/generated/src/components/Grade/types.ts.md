<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Grade/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Grade`
- Строк кода: 11
- Экспорты: `BaseProps`, `Bordered`
- Импорты: `../../types`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { CustomStyledProps } from "../../types";

export interface BaseProps {
  /**
   * Флаг включения границ.
   * @default false
   */
  $bordered?: boolean;
}

export type Bordered = CustomStyledProps<"true" | "false">;

```
