<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/hooks/useDraggableModal/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `hooks`
- Компонент/группа: `hooks`
- Строк кода: 30
- Экспорты: `UseDraggableModalParams`
- Импорты: `../../types/common`, `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { MutableRefObject, RefObject } from "react";

import { PositionX, PositionY } from "../../types/common";

export type UseDraggableModalParams = {
  /** Элемент, рядом с которым надо отрендерить модальное окно. Без него, отобразится по центру экрана. */
  anchorRef?: RefObject<HTMLElement>;

  /** Вариант позиционирования, относительно элемента-якоря, по горизонтали.
   * @default 'right'
   */
  positionX?: PositionX;

  /** Вариант позиционирования, относительно элемента-якоря, по вертикали.
   * @default 'bottom'
   */
  positionY?: PositionY;

  /** Координаты, установленные пользователем после перемещения. */
  userPositionRef?: MutableRefObject<[number, number] | null>;

  /** Размер, установленный пользователем после изменения размера. */
  userSizeRef?: MutableRefObject<[number, number] | null>;

  /** Количество пикселей до элемент-якоря. */
  offset?: number;

  /** Флаг для состояния показать/скрыть. Используется только при реализации модального окна с постоянным нахождением в DOM. */
  isOpen?: boolean | null;
};

```
