<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Filters/Button/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Filters`
- Строк кода: 24
- Экспорты: `ButtonsContainerProps`, `ButtonsContainerStyledProps`, `FilterButtonProps`, `MoreButtonProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { ChangeEventHandler, MouseEventHandler } from "react";

export interface FilterButtonProps {
  id?: string;
  name?: string;
  value: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLInputElement>;
}

export interface MoreButtonProps {
  onClick?: MouseEventHandler;
}

export interface ButtonsContainerStyledProps {
  $columns?: number;
  $hideElements?: boolean;
}

export interface ButtonsContainerProps<T> extends ButtonsContainerStyledProps {
  value?: T;
  onChange?: (value: T) => void;
}

```
