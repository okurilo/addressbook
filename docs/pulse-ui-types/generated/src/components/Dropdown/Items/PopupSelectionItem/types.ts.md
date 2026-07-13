<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Dropdown/Items/PopupSelectionItem/types.ts`

- Источник: [types-context.part-1.md](<../../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Dropdown`
- Строк кода: 46
- Экспорты: `DefaultProps`, `PopupSelectionItemProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ReactElement, ReactNode } from "react";

interface BaseProps {
  /**
   * Контент элемента.
   */
  content: ReactNode;
  /**
   * Показывается ли элемент.
   * Полезно при фильтрации.
   * @default true
   */
  isShown?: boolean;
}

export interface DefaultProps extends BaseProps {
  /**
   * Раскрыт ли элемент.
   */
  isExpanded?: never;
  /**
   * Колбэк переключения состояния раскрытия элемента.
   */
  onExpandChange?: never;
  /**
   * Вложенные элементы.
   */
  innerItems?: never;
}

interface TreeProps extends BaseProps {
  /**
   * Раскрыт ли элемент.
   */
  isExpanded: boolean;
  /**
   * Колбэк переключения состояния раскрытия элемента.
   */
  onExpandChange: () => void;
  /**
   * Вложенные элементы.
   */
  innerItems: ReactElement<PopupSelectionItemProps>[];
}

export type PopupSelectionItemProps = DefaultProps | TreeProps;

```
