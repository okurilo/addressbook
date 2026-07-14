<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Notification/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Notification`
- Строк кода: 40
- Экспорты: `Internationalization`, `NotificationProps`, `Type`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ReactNode } from "react";

export type Type = "info" | "attention" | "warning";

export interface Internationalization {
  expand: {
    unwrap: string;
    wrap: string;
  };
}

export interface NotificationProps {
  /**
   * Тип отображения компонента.
   * @default info
   */
  $type?: Type;
  /**
   * Кнопка для перехода.
   * CellButton/Link.
   */
  linkElement?: ReactNode;
  /**
   * Интернациолизация кнопки "скрыть/раскрыть"
   */
  internationalization?: Internationalization;
  /**
   * Идентификатор для систем автоматизированного тестирования.
   */
  dataTestId?: string;
  /**
   * Настраиваемая ширина компонента.
   * @default "auto"
   */
  $width?: number | string;
  /**
   * Обработчик закрытия компонента.
   */
  onClose?: () => void;
}

```
