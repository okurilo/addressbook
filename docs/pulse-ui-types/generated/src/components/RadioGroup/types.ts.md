<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/RadioGroup/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `RadioGroup`
- Строк кода: 12
- Экспорты: `RadioGroupProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ReactNode } from "react";

export interface RadioGroupProps {
  /**
   * Дочерние радио-кнопки.
   */
  children: ReactNode | ReactNode[];
  /**
   * Заголовок.
   */
  title?: string;
}

```
