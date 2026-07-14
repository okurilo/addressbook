<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/ModalNew/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `ModalNew`
- Строк кода: 231
- Экспорты: `ActionsItem`, `Button`, `ButtonAttributes`, `DeviceType`, `ModalProps`, `ModalSize`, `ModalTagProps`, `ModalType`
- Импорты: `../BreadcrumbsDynamic/types`, `../Button/types`, `../Tags/Tag/types`, `react`
- Зависимости внутри выгрузки: [`src/components/BreadcrumbsDynamic/types.ts`](<../BreadcrumbsDynamic/types.ts.md>), [`src/components/Button/types.ts`](<../Button/types.ts.md>), [`src/components/Tags/Tag/types.ts`](<../Tags/Tag/types.ts.md>)

## Исходная типизация

```typescript
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import type { BreadcrumbsProps } from "../BreadcrumbsDynamic/types";
import type { Type as ButtonType } from "../Button/types";
import type { TagColor } from "../Tags/Tag/types";

export type ModalSize = "m" | "l";
export type ModalType = "default" | "fullscreen" | "alert";
export type DeviceType = "desktop" | "tablet" | "mobile";
export type ModalTagProps = {
  label: ReactNode;
  color?: TagColor;
};

export type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

export interface Button {
  /**
   * Текст кнопки
   */
  label: string;
  /**
   * Действие при нажатии.
   */
  onClick?: () => void;
  /**
   *  Флаг наличия логики закрытия модалки в кнопке.
   */
  isClose?: boolean;
  /**
   * Можно выбрать вид для кнопки из доступных.
   */
  type?: ButtonType;
  /**
   * Состояние для асинхронных операций.
   */
  isLoading?: boolean;
  /**
   * @deprecated
   * Кнопка переходя в состояние isLoading становится disabled.
   * Позволяет управлять состоянием disabled кнопки при ассинхронных операциях.
   *  @default true
   */
  isDisabledWhenLoading?: boolean;
  /**
   * @deprecated
   * Вместо компонента Loader используем состояние компонента Buttton.
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

export interface ActionsItem {
  /**
   * Текст ссылки.
   */
  label: string;
  /**
   * Адрес ссылки.
   */
  url?: string;
  /**
   * Действие при нажатии.
   */
  onAction?: () => void;
  /**
   * Заблокировать нажатие.
   */
  isDisabled?: boolean;
  /**
   *  Текст для поповера, когда элемент задезейблен.
   *  Если передать строку по умолчанию используется стиль body2Regular
   */
  disabledText?: ReactNode;
  /**
   *  Текст атрибута aria-description.
   *  Если передана строка в disabledText, то aria-description будет равна disabledText
   */
  ariaDescription?: string;
  icon?: ReactNode;
}

export interface ModalProps {
  /**
   * Заголовок.
   */
  title: string;
  /**
   * Тестовый id для заголовка.
   */
  titleTestId?: string;
  /**
   * Коллбэк при закрытии окна.
   */
  onClose: () => void;
  /**
   * Тип модального окна.
   * @default default
   */
  type?: ModalType;
  /**
   * Размер дефолтного модального окна.
   * @default l
   */
  defaultModalSize?: ModalSize;
  /**
   * Описание.
   */
  description?: string;
  /**
   * Тестовый id для описания.
   */
  descriptionTestId?: string;
  /**
   * Хлебные крошки.
   */
  breadcrumbs?: BreadcrumbsProps;
  /**
   * Тег или массив тегов.
   */
  tag?: ModalTagProps | ModalTagProps[];
  /**
   * Дополнительные действия (контекстное меню).
   */
  actionsMenu?: ActionsItem[];
  /**
   * Добавление кнопок в футер.
   */
  buttons?: {
    /**
     * Кнопка подтвердить
     */
    apply?: Button;
    /**
     * Тестовый id для кнопки подтвердить.
     */
    applyTestId?: string;
    /**
     * Кнопка отменить
     */
    cancel?: Button;
    /**
     * Тестовый id для кнопки отменить.
     */
    cancelTestId?: string;
    /**
     * Дополнительная кнопка
     */
    tertiary?: Button;
    /**
     * Тестовый id для дополнительной кнопки.
     */
    tertiaryTestId?: string;
  };
  /**
   * Отображение прогресса по шагам.
   */
  steps?: { current: number; all: number };
  /**
   * Разрешить закрытие окна при клике на оверлей.
   *  @default true
   */
  isClosableOverlay?: boolean;
  /**
   * Затемнять фон окна.
   * @default true
   */
  isTransparentOverlay?: boolean;
  /**
   * Разрешить закрыть окно клавишей Escape.
   * @default true
   */
  isCloseByEsc?: boolean;
  /**
   * Добавить html-класс контейнеру.
   */
  wrapClassName?: string;
  /**
   * Флаг активности/неактивности кнопки Actions.
   */
  isDisabledActions?: boolean;
  /**
   * Кастомный заголовок модального окна, если передан - заменяет оригинальный.
   */
  header?: ReactNode;
  /**
   * Флаг наличия/отсутствия разделителей в Body модалки.
   */
  hasDividers?: boolean;
  /**
   * Идентификатор для систем автоматизированного тестирования.
   */
  dataTestId?: string;
  /**
   * Идентификатор заголовка для систем автоматизированного тестирования.
   */
  titleDataTestId?: string;
  /**
   * Должен быть true, если закрытие модального окна вызовет окно подтверждения закрытия.
   */
  needConfirm?: boolean;
  /**
   * Данный props предназначен только для использования в конструкторе.
   */
  isConstructor?: boolean;
  /**
   * Счетчика в заголовке.
   */
  counter?: number;
  /**
   * Коллбэк клика на иконку глаза в заголовке модалки.
   */
  onTitleIconClick?: (isIconOpen: boolean) => void;
  /**
   * Контент мобального окна содержит PDFViewer.
   */
  pdfContent?: boolean;
}

```
