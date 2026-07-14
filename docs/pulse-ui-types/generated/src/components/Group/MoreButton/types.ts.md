<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Group/MoreButton/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Group`
- Строк кода: 9
- Экспорты: `MoreButtonProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ReactNode } from "react";

export interface MoreButtonProps {
  $opened?: boolean;
  $openedText?: string;
  $closedText?: string;
  onClick?: () => void;
  children?: ReactNode;
}

```
