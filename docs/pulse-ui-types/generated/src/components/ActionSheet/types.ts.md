<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/ActionSheet/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `ActionSheet`
- Строк кода: 46
- Экспорты: `ActionSheetProps`
- Импорты: `@floating-ui/react`, `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { Middleware } from "@floating-ui/react";
import { ReactElement, ReactNode, RefAttributes } from "react";

export interface ActionSheetProps {
  /**
   * Элемент триггер.
   */
  $trigger: ReactElement & RefAttributes<HTMLElement>;
  /**
   * Выравнивание.
   * @default start
   */
  $align?: "start" | "end";
  /**
   * Направление.
   * @default bottom
   */
  $direction?: "bottom" | "top";
  /**
   * Список применяемых (модификаторов)[https://floating-ui.com/docs/middleware]
   */
  $middleware?: Middleware[];
  /**
   * Заголовок для мобильной версии
   */
  mobileTitle?: string;
  /**
   * Кнопки для мобильной версии
   */
  mobileButtons?: ReactNode;
  /**
   * Коллбэк открытия/закрытия поповера
   */
  onTogglePopover?: (isPopoverOpen: boolean) => void;

  /**
   * Текущее состояние (открыт / закрыт).
   * @default false
   */
  isOpen?: boolean;

  /**
   * Обработчик изменения состояния.
   */
  onChange?: (isOpen: boolean) => void;
}

```
