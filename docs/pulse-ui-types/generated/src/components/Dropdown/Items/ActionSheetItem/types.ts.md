<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Dropdown/Items/ActionSheetItem/types.ts`

- Источник: [types-context.part-1.md](<../../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Dropdown`
- Строк кода: 11
- Экспорты: `ActionSheetItemProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ReactNode } from "react";

export interface ActionSheetItemProps {
  title: string;
  description?: string;
  onClick: () => void;
  icon?: ReactNode;
  chevron?: boolean;
  disabled?: boolean;
  error?: boolean;
}

```
