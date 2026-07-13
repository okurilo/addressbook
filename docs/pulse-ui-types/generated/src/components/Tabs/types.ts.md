<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Tabs/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Tabs`
- Строк кода: 43
- Экспорты: `DescriptionTabsProps`, `PrimarySecondaryTabsProps`, `TabsProps`, `TertiaryTabsProps`, `Type`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { MouseEvent } from "react";

export type Type = "primary" | "secondary" | "tertiary" | "description";

interface BaseTabsProps {
  /**
   * Вариант отображения.
   * @default primary
   */
  $type: Type;
  /**
   * index активного таба
   */
  selectedIndex?: number;
  /**
   * Обработчик переключения табов.
   */
  onTabChange?: (event: MouseEvent<HTMLElement>, selectedId: number) => void;
}

export interface TertiaryTabsProps extends BaseTabsProps {
  $type: "tertiary";
  /**
   * Флаг вертикального расположения табов.
   * Работает только для $type = "tertiary".
   */
  isVerticalMode?: boolean;
}

export interface PrimarySecondaryTabsProps extends BaseTabsProps {
  $type: "primary" | "secondary";
  isVerticalMode?: never;
}

export interface DescriptionTabsProps extends BaseTabsProps {
  $type: "description";
  isVerticalMode?: never;
}

export type TabsProps =
  | TertiaryTabsProps
  | PrimarySecondaryTabsProps
  | DescriptionTabsProps;

```
