<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Tree/Node/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Tree`
- Строк кода: 17
- Экспорты: `ArrowProps`, `NestedContentProps`, `NodeProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ReactNode } from "react";

export interface NodeProps {
  $label?: ReactNode;
  /**
   * @default false
   */
  $isOpen?: boolean;
}

export interface NestedContentProps {
  $isOpen?: boolean;
}

export interface ArrowProps {
  $isOpen?: boolean;
}

```
