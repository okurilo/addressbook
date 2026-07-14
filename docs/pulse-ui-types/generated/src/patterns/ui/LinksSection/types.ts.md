<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/patterns/ui/LinksSection/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `patterns`
- Компонент/группа: `patterns`
- Строк кода: 18
- Экспорты: `LinksSectionProps`, `Section`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { FC, SVGProps } from "react";

export interface LinksSectionProps {
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  items: Item[];
}

interface Item {
  id: string;
  text: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  link?: string;
}

```
