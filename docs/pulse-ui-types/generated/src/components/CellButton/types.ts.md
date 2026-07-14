<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/CellButton/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `CellButton`
- Строк кода: 81
- Экспорты: `CellButtonContextArgs`, `CellButtonProps`, `Size`, `Types`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentType,
  ReactNode,
} from "react";

export type Size = "s" | "m" | "l";
export type Types = "button" | "more" | "more-arrow" | "more-text";

type Path = {
  pathname: string;
  search?: string;
  hash?: string;
};

type To = string | Partial<Path>;
type LinkLikeProps = {
  to: To;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export interface CellButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Размер.
   * @default m
   */
  $size?: Size;
  /**
   * Вариант отображения.
   * @default button
   */
  $type?: Types;
  /**
   * Текст кнопки
   */
  text?: string;
  /**
   * Счетчик.
   */
  counter?: number | undefined;
  /**
   * Иконка в начале кнопки.
   */
  leadingIcon?: ReactNode;
  /**
   * Иконка в конце кнопки.
   */
  trailingIcon?: ReactNode;
  /**
   * @deprecated
   * В 2Q_26 пропс будет удалён.
   * Используйте пропсы text,leadingIcon и trailingIcon.
   */
  children?: ReactNode;
  /**
   * Поворот chevron для $type = "more-arrow".
   */
  isTurned?: boolean;
  /**
   * Навигация.
   * Принимает строку пути или объект с pathname, search и hash.
   */
  to?: To;
  /**
   * URL-адрес для навигации по внешней ссылке.
   */
  href?: string;
  /**
   * Компонент - "button", но может быть "a".
   */
  as?:
    | "a"
    | ComponentType<LinkLikeProps>
    | ComponentType<AnchorHTMLAttributes<HTMLAnchorElement>>;
}

export interface CellButtonContextArgs {
  $size?: Size;
  $type?: Types;
}

```
