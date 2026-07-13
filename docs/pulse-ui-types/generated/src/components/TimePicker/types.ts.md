<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/TimePicker/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `TimePicker`
- Строк кода: 14
- Экспорты: `TimePickerProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { HTMLProps, ReactNode, Ref } from "react";

export interface TimePickerProps extends HTMLProps<HTMLInputElement> {
  children?: ReactNode;
  ref?: Ref<HTMLInputElement>;
  /**
   * Префикс.
   */
  $prefix?: "от" | "до";
  /**
   * Постфикс.
   */
  $postfix?: ReactNode;
}

```
