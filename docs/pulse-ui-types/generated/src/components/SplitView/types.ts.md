<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/SplitView/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `SplitView`
- Строк кода: 47
- Экспорты: `MoreMenuItem`, `SplitViewProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { PropsWithChildren } from "react";

export interface SplitViewProps {
  /**
   * Ссылка для открытия в новой вкладке.
   */
  url: string;
  /**
   * Флаг для управления открытием компонента.
   */
  isOpen: boolean;
  /**
   * Обработчик закрытия компонента.
   */
  onClose: () => void;
  /**
   * Дополнительные действия.
   */
  moreMenu?: MoreMenuItem[];
  /**
   * Значение по умолчанию для ширины компонента.
   */
  defaultWidth?: number;
  /**
   * Минимальная ширина компонента.
   */
  minWidth?: number;
  /**
   * Флаг, указывающий, нужно ли оставлять смонтированным содержимое компонента при его скрытии.
   */
  keepContentMounted?: boolean;
  /**
   * Заголовок для действия открытия в новой вкладке.
   */
  newTabActionTitle?: string;
}

export interface MoreMenuItem extends PropsWithChildren {
  /**
   * Уникальный идентификатор подэлемента.
   */
  id: string;
  /**
   * Обработчик клика по элементу.
   */
  onClick?: () => void;
}

```
