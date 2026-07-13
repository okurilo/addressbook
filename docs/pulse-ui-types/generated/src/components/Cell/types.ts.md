<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Cell/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Cell`
- Строк кода: 96
- Экспорты: `AboutProps`, `CellProps`, `CellWrapperProps`, `Size`, `Variant`
- Импорты: `react`, `styled-components`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { DefaultTheme } from "styled-components";
import { ReactElement, ReactNode } from "react";

type StringKeyof<T> = Extract<keyof T, string>;
export type Variant = StringKeyof<DefaultTheme["typography"]>;

export type Size = "xs" | "s" | "m" | "l" | "xl";

export interface CellWrapperProps {
  /**
   * Размер.
   * @default m
   */
  $size?: Size;
  /**
   * Флаг включения разделителя снизу.
   * @default false
   */
  $divider?: boolean;
  /** Отключение горизонтального padding
   * @default false
   */
  $noHorizontalPadding?: boolean;
  /**
   * Включить стили и поведение для состояний hover и active
   * @default false
   */
  $enableHoverActive?: boolean;
}

export interface AboutProps {
  /**
   * Основной заголовок.
   */
  title: ReactElement | string;
  /**
   * Подзаголовок.
   */
  subtitle?: ReactElement | string;
  /**
   * Дополнительный подзаголовок.
   */
  extraSubtitle?: ReactElement | string;
  /**
   * Текст ошибки — простой string
   */
  errorText?: string;
}

export interface CellProps {
  /**
   * Размер ячейки: "xl" | "l" | "m" | "s" | "xs"
   */
  size?: Size;
  /**
   * Показывать разделитель снизу (линия)
   */
  divider?: boolean;
  /**
   * URL аватара (если не используется avatarNode)
   */
  avatarSrc?: string;
  /**
   * Кастомный аватар — строго компонент Avatar с ожидаемыми пропсами
   */
  avatarNode?: ReactElement;
  /**
   * Секция с заголовком и подзаголовками внутри
   */
  about: AboutProps;
  /**
   * Бейдж или иконка слева
   */
  badgeContent?: ReactNode;
  /**
   * Контент в правой части ячейки — кнопки, иконки, чекбоксы и т.п.
   */
  actionContent?: ReactNode;
  /**
   * Обработчик клика по ячейке
   */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** Отключение горизонтального padding
   * @default false
   */
  noHorizontalPadding?: boolean;
  /**
   * Включить стили и поведение для состояний hover и active
   * @default false
   */
  enableHoverActive?: boolean;
  /**
   * Другие дополнительные пропсы
   */
  [key: string]: unknown;
}

```
