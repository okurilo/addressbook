<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Range/Marks/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Range`
- Строк кода: 10
- Экспорты: `Mark`, `MarksComponentProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ReactNode } from "react";

export interface Mark {
  label: ReactNode | string;
  description?: ReactNode | string;
}

export interface MarksComponentProps {
  list?: Mark[];
}

```
