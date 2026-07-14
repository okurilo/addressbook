<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/illustrations/__stories__/components/Story/types.ts`

- Источник: [types-context.part-2.md](<../../../../../../raw/types-context.part-2.md>)
- Раздел: `illustrations`
- Компонент/группа: `illustrations`
- Строк кода: 6
- Экспорты: `StoryProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { Dispatch, SetStateAction } from "react";

export interface StoryProps {
  searchValue: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

```
