<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/LayoutGrid/Grid/Item/types.ts`

- Источник: [types-context.part-1.md](<../../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `LayoutGrid`
- Строк кода: 91
- Экспорты: `BreakpointValue`, `ItemProps`
- Импорты: `@dnd-kit/core`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

type Span = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "*";

export type BreakpointValue =
  | Span
  | {
      /**
       * Порядок элемента
       */
      order?: number;
      /**
       * Ширина элемента (в колонках)
       */
      span: Span;
      /**
       * Позиция элемента (номер колонки)
       */
      start?: number | "auto";
    };

export interface ItemProps {
  /**
   * Если `true`, то элемент становится контейнером для вложенных элементов
   */
  subgrid?: boolean;
  /**
   * Хранить порядок перетаскиваемых элементов локально
   */
  enableSortableStorage?: boolean;
  /**
   * Событие, когда перетащили элемент
   */
  onDragEnd?: (e: DragEndEvent) => void;
  /**
   * Событие, когда захватили элемент
   */
  onDragStart?: (e: DragStartEvent) => void;
  /**
   * Для всех брейкпоинтов (по умолчанию)
   */
  s?: BreakpointValue;
  /**
   * min-width: 600px
   */
  m?: BreakpointValue;
  /**
   * min-width: 1280px
   */
  l?: BreakpointValue;
  /**
   * min-width: 320px
   */
  s320?: BreakpointValue;
  /**
   * min-width: 480px
   */
  s480?: BreakpointValue;
  /**
   * min-width: 600px
   */
  m600?: BreakpointValue;
  /**
   * min-width: 720px
   */
  m720?: BreakpointValue;
  /**
   * min-width: 840px
   */
  m840?: BreakpointValue;
  /**
   * min-width: 1024px
   */
  l1024?: BreakpointValue;
  /**
   * min-width: 1280px
   */
  l1280?: BreakpointValue;
  /**
   * min-width: 1440px
   */
  l1440?: BreakpointValue;
  /**
   * min-width: 1600px
   */
  l1600?: BreakpointValue;
  /**
   * min-width: 1920px
   */
  l1920?: BreakpointValue;
}

```
