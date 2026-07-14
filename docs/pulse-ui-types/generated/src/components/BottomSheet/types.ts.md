<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/BottomSheet/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `BottomSheet`
- Строк кода: 27
- Экспорты: `BottomSheetHeaderProps`, `BottomSheetProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import React from "react";

export type BottomSheetProps = {
  /**
   * Признак открытости/закрытости компонента.
   */
  isOpen: boolean;
  /**
   * Функция - коллбэк для закрытия компонента.
   */
  onClose: () => void;
  /**
   * Высота компонента.
   */
  height?: string;
  /**
   * @ignore
   * Отключает рендеринг через createPortal.
   * Используется только для совместимости с компонентами, которые ломаются в portal (к примеру, react-datepicker)
   */
  disabledPortal?: boolean;
};

export type BottomSheetHeaderProps = {
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
};

```
