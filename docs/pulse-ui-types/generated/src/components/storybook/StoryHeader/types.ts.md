<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/storybook/StoryHeader/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `storybook`
- Строк кода: 10
- Экспорты: `StoryHeaderProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ReactNode } from "react";

export interface StoryHeaderProps {
  title: string;
  description?: string;
  sourceUrl?: string;
  docsUrl?: string;
  pixsoUrl?: string;
  cover?: ReactNode;
}

```
