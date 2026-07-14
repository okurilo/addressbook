<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Drawer/Header/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Drawer`
- Строк кода: 44
- Экспорты: `HeaderProps`
- Импорты: `../types`
- Зависимости внутри выгрузки: [`src/components/Drawer/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { SubItem } from "../types";

export interface HeaderProps {
  /**
   * Текущий заголовок Drawer, отображается в верхней части.
   */
  currentTitle: string;
  /**
   * Видна ли кнопка "Назад".
   */
  isBackArrowVisible: boolean;
  /**
   * Обработчик клика по кнопке "Назад".
   */
  onBackArrowClick: () => void;
  /**
   * Стандартный обработчик клика по элементу меню.
   */
  onItemClick: (item: SubItem) => void;
  /**
   * Функция обратного вызова при закрытии Drawer.
   */
  onCloseDrawer: () => void;
  /**
   * Элементы дополнительного меню.
   */
  moreMenu?: SubItem[];
  /**
   * Ваша иконка дополнительного меню.
   */
  moreMenuIcon?: React.ReactElement;
  /**
   * Ваше действие при клике на дополнительное меню.
   */
  onMoreMenuClick?: () => void;
  /**
   * Идентификатор заголовка для систем автоматизированного тестирования.
   */
  dataTestId?: string;
  /**
   * Коллбэк клика на иконку глаза в заголовке дровера.
   */
  onTitleIconClick?: (isIconOpen: boolean) => void;
}

```
