<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/ActionSheet/Menu/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `ActionSheet`
- Строк кода: 12
- Экспорты: `MenuItemProps`, `MenuProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ReactElement } from "react";

export interface MenuProps {
  $onAction?: (item: ReactElement) => void;
  children: ReactElement | ReactElement[];
  hasMobileMaxHeight?: boolean;
}

export interface MenuItemProps {
  $disabled?: boolean;
  $hasDivider?: boolean;
}

```
