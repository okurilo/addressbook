<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/DateTimePicker/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `DateTimePicker`
- Строк кода: 20
- Экспорты: `DateTimePickerProps`
- Импорты: `../DatePicker/types`, `react`
- Зависимости внутри выгрузки: [`src/components/DatePicker/types.ts`](<../DatePicker/types.ts.md>)

## Исходная типизация

```typescript
import type { FormEvent } from "react";
import { DatePickerProps } from "../DatePicker/types";

interface TimeInputOptions {
  /**
   * Обработчик изменения.
   */
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  /**
   * Время в формате HH:MM.
   */
  value: string;
}

export interface DateTimePickerProps extends DatePickerProps {
  /**
   * Объект настроек времени.
   */
  $time: TimeInputOptions;
}

```
