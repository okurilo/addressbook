<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/ActionBar/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `ActionBar`
- Строк кода: 29
- Экспорты: `ActionBarProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { MouseEventHandler } from "react";

type ActionBarButton = [
  string,
  MouseEventHandler<HTMLButtonElement | HTMLLIElement>
];
type ActionBarAlignmentType = "left" | "right";

export interface ActionBarProps {
  /**
   * Массив кнопок [[надпись на кнопке, обработчик нажатия]...].
   */
  buttons: ActionBarButton[];
  /**
   * Отображение количества выделенных элементов.
   * @default false
   */
  showCaption?: boolean;
  /**
   * Отображение компонента большей ширины в связи с тем, что скрыт sidebar.
   * @default false
   */
  noSidebar?: boolean;
  /**
   * Выравнивание кнопок.
   * @default right
   */
  $align?: ActionBarAlignmentType;
}

```
