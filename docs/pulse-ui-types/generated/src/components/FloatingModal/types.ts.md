<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/FloatingModal/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `FloatingModal`
- Строк кода: 84
- Экспорты: `FloatingModalProps`, `ModalPosition`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { ReactNode, MouseEventHandler, RefObject } from "react";

export type ModalPosition =
  | "left-bottom"
  | "left-top"
  | "right-bottom"
  | "right-top";

export type FloatingModalProps = {
  /**
   * Контент модального окна.
   */
  children: ReactNode;
  /**
   * Заголовок.
   */
  title: string | ReactNode;
  /**
   * Показать / скрыть модельное окно.
   */
  isOpen: boolean;
  /**
   * Описание.
   */
  description?: string;
  /**
   * Элемент, рядом с которым надо отрендерить модальное окно. Без него, отобразится по центру экрана.
   */
  triggerElement?: RefObject<HTMLElement>;
  /**
   * Функция срабатывает на дополнительной иконке
   */
  onOpenInNewTab?: () => void;
  /**
   * Если 1 дополнительное действие, то необходима иконка + click
   * Если более 1 дополнительного действия, то список из текста + click к каждому
   */
  moreActions?:
    | { icon: ReactNode; onClick: MouseEventHandler }
    | Array<{ text: string; onClick: MouseEventHandler }>;
  /**
   * HTMLElement в котором рендерится модальное окно
   * @default document.body
   */
  container?: HTMLElement;
  /** Функция закрытия окна */
  onClose?: () => void;
  /**
   * Кастомная ширина модального окна. Если передать пустую строку, ширина будет подстроена под контент.
   * @default 400
   */
  width?: number | string;
  /**
   * Кастомная высота модального окна. Если передать пустую строку, высота будет подстроена под контент.
   * @default 400
   */
  height?: number | string;
  /**
   * Позиционирование модального окна отосительно переданного элемента-триггера
   * @default 'right-bottom'
   */
  position?: ModalPosition;
  /**
   * Если true, модальное окно вместе с контентом всегда находится в DOM
   * @default false
   */
  keepContentMounted?: boolean;
  /**
   * Заголовок для Header в BottomSheet в мобильной версии.
   */
  mobileTitle?: string;
  /**
   * Кнопки для Footer в BottomSheet в мобильной версии.
   */
  mobileButtons?: ReactNode;
  /**
   * Активен ли режим PDF viewer.
   */
  isPdfViewerSize?: boolean;
  /**
   * Кастомные координаты для PDF viewer.
   */
  customPosition?: { x: number; y: number };
};

```
