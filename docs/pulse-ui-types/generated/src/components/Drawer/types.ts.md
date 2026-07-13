<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Drawer/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Drawer`
- Строк кода: 169
- Экспорты: `DrawerButtonProps`, `DrawerProps`, `SelectItemsAndClickHandlerResult`, `SubItem`, `Tab`
- Импорты: `../Button/types`, `react`
- Зависимости внутри выгрузки: [`src/components/Button/types.ts`](<../Button/types.ts.md>)

## Исходная типизация

```typescript
import type {
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactElement,
  ReactNode,
} from "react";
import type { Type as ButtonType } from "../Button/types";

type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

export interface DrawerButtonProps {
  /**
   * Текст кнопки
   */
  label: string;
  /**
   * Действие при нажатии.
   */
  onClick: () => void;
  /**
   * Можно выбрать вид для кнопки из доступных.
   */
  type?: ButtonType;
  /**
   * Состояние для асинхронных операций.
   */
  isLoading?: boolean;
  /**
   * Элемент для асинхронных операций.
   */
  loader?: ReactElement;
  /**
   *  Дополнительные атрибуты для кнопки.
   */
  attributes?: ButtonAttributes;
  /**
   *  Текст для поповера, когда кнопка задезейблена.
   *  Если передать строку по умолчанию используется стиль body2Regular
   */
  disabledText?: ReactNode;
  /**
   *  Текст атрибута aria-description.
   *  Если передана строка в disabledText, то aria-description будет равна disabledText
   */
  ariaDescription?: string;
}

export interface DrawerProps {
  /**
   * Заголовок Drawer, отображается в верхней части.
   */
  title: string;
  /**
   * Флаг, который указывает должен ли Drawer быть открытым или закрытым.
   */
  isOpen: boolean;
  /**
   * Обработчик закрытия компонента.
   */
  onClose: () => void;
  /**
   * Дочерние элементы, которые можно отобразить внутри компонента.
   */
  children?: React.ReactNode;
  /**
   * Список вкладок.
   */
  tabs?: Tab[];
  /**
   * Основные параметры кнопки, включая надпись, действие при нажатии и дополнительные атрибуты.
   */
  buttonPrimary?: DrawerButtonProps;
  /**
   * Основные параметры кнопки, включая надпись, действие при нажатии и дополнительные атрибуты.
   */
  buttonSecondary?: DrawerButtonProps;
  /**
   * Основные параметры кнопки, включая надпись, действие при нажатии и дополнительные атрибуты.
   */
  buttonExtra?: DrawerButtonProps;
  /**
   * Флаг, указывающий, нужно ли оставлять смонтированным содержимое компонента при его скрытии.
   * @default false
   */
  keepContentMounted?: boolean;
  /**
   * Ширина Drawer в пикселях. Диапазон от 480 до 800. Если не указана, используется значение по умолчанию 560.
   * @default 560
   */
  width?: number;
  /**
   * Позволяет скрывать overlay если это необходимо.
   */
  isOverlayHidden?: boolean;
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
   * Коллбек, вызываемый при переключении таба, если используются tabs.
   */
  onTabChange?: (tab: Tab) => void;
  /**
   * Идентификатор для систем автоматизированного тестирования.
   */
  dataTestId?: string;
  /**
   * Идентификатор заголовка для систем автоматизированного тестирования.
   */
  titleDataTestId?: string;
  /**
   * Коллбэк клика на иконку глаза в заголовке дровера.
   */
  onTitleIconClick?: (isIconOpen: boolean) => void;
  /**
   * Отключает Footer, выводя на его месте пустой div высотой 8px..
   * @default false
   */
  withoutFooter?: boolean;
}

export interface Tab {
  /**
   * Уникальный идентификатор элемента.
   */
  id: string;
  /**
   * Отображаемое названия элемента.
   */
  title: string;
  /**
   * Содержимое элемента. Отображается, когда элемент активен или выбран.
   */
  content: ({ onClick }: { onClick?: MouseEventHandler }) => ReactElement;
  /**
   * Элементы, которые будут отображаться в DrawerContent.
   */
  subItems?: SubItem[];
}

export type SubItem = Tab & {
  /**
   * Если параметр true, то элемент не будет реагировать на клик по нему.
   */
  isClickDisabled?: boolean;
  /**
   * Обработчик события клика для элемента. Если указан, то эта функция заменит стандартное поведение при клике на элемент.
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export type SelectItemsAndClickHandlerResult = {
  /**
   * Элементы, которые будут отображаться в DrawerContent.
   */
  items: SubItem[];
  /**
   * Стандартный обработчик события клика для элемента.
   */
  defaultClickHandler: (item?: SubItem) => void;
};

```
