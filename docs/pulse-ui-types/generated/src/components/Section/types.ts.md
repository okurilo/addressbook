<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Section/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Section`
- Строк кода: 59
- Экспорты: `SectionProps`, `Size`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { MouseEventHandler, ReactNode } from "react";

export type Size = "s" | "m" | "l" | "xl";

export interface SectionProps {
  /**
   * Размер компонента.
   * @default "m"
   */
  size: Size;
  /**
   * Заголовок.
   */
  title: string;
  /**
   * Подзаголовок.
   */
  subtitle?: string;
  /**
   * Счетчик.
   */
  counter?: number;
  /**
   * Контент для Popover с подсказкой.
   */
  info?: ReactNode;
  /**
   * Состояние развернутости.
   */
  isExpanded?: boolean;
  /**
   * Обработчик изменения состояния развернутости.
   */
  onExpandedChange?: () => void;
  disabled?: boolean;
  /**
   * Ставит ограничение высоты контента в 400px.
   * @default true
   */
  haveHeightLimit?: boolean;
  /**
   * Обработчик клика по кнопке "Добавить".
   */
  addButtonHandler?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Обработчик клика по кнопке "Редактировать".
   */
  editButtonHandler?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Контент для дополнительных действий.
   * Необходимо передавать Items обернутых Menu из компонента ActionsSheet/Menu.
   */
  moreActionsContent?: ReactNode;
  /**
   * Контент для действий в мобильной версии.
   * Необходимо передавать Items обернутых Menu из компонента ActionsSheet/Menu.
   */
  mobileActions?: ReactNode;
}

```
