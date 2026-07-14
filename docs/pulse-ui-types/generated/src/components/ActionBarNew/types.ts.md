<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/ActionBarNew/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `ActionBarNew`
- Строк кода: 32
- Экспорты: `ActionBarNewAlignmentType`, `ActionBarNewItem`, `ActionBarNewProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ReactNode } from "react";

/** Выравнивание */
export type ActionBarNewAlignmentType = "left" | "right";

export type ActionBarNewItem = {
  /** Текст кнопки/пункта */
  label: string;
  /** Обработчик клика */
  onClick: () => void;
  /** Отключён ли элемент */
  disabled?: boolean;
};

export interface ActionBarNewProps {
  /** Дочерние элементы */
  children?: ReactNode;
  /** Выравнивание */
  align?: ActionBarNewAlignmentType;
  /** Основное действие */
  primaryAction?: ActionBarNewItem;
  /** Вторичное действие */
  secondaryAction?: ActionBarNewItem;
  /** Третичное действие */
  tertiaryAction?: ActionBarNewItem;
  /** Действия в выпадающем меню */
  dropdownActions?: ActionBarNewItem[];
  /** Показывать кнопку "Ещё" */
  moreActions?: boolean;
  /** Текст подсказки */
  caption?: string;
}

```
