<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/BreadcrumbsDynamic/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `BreadcrumbsDynamic`
- Строк кода: 82
- Экспорты: `BreadcrumbItem`, `BreadcrumbsProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { DOMAttributes, FC, LinkHTMLAttributes } from "react";

/**
 * Пропсы компонента "Breadcrumbs" (хлебные крошки).
 */
export interface BreadcrumbsProps {
  /**
   * Массив элементов хлебных крошек.
   * Каждый элемент может быть либо заполненным (`BreadcrumbItemFilled`), либо
   * скелетоном для состояния загрузки (`BreadcrumbItemSkeleton`).
   *
   * @required
   */
  items: BreadcrumbItem[];

  /**
   * Кастомный компонент для рендеринга ссылок.
   * Передайте компонент вашего роутера (например, `Link` из React Router)
   * вместо стандартного `<a>`. Компонент должен принимать
   * атрибуты HTMLAnchorElement (`href`, `onClick`, `title` и т.д.).
   *
   * @default "a"
   */
  linkComponent?: FC<LinkHTMLAttributes<HTMLAnchorElement>>;

  /**
   * Заголовок дропдауна в мобильной версии.
   * Отображается вверху выпадающего списка на мобильных устройствах.
   *
   * @default "навигация"
   */
  mobileTitle?: string;
}

/**
 * Заполненный элемент хлебной крошки с заголовком и ссылкой.
 */
interface BreadcrumbItemFilled {
  /**
   * Текст элемента хлебной крошки.
   */
  title: string;

  /**
   * URL ссылки, на которую ведёт элемент.
   */
  href: string;

  /**
   * Обработчик клика по элементу.
   * Если передан, то будет вызван **вместо** стандартного перехода по `href`.
   */
  onClick?: DOMAttributes<HTMLAnchorElement>["onClick"];
}

/**
 * Элемент хлебной крошки в состоянии загрузки (скелетон).
 * Отображается в виде анимированного серого прямоугольника.
 */
interface BreadcrumbItemSkeleton {
  /**
   * Флаг включения режима скелетона.
   * Установите в `true`, чтобы показать заглушку загрузки вместо текста.
   *
   * @example
   * ```tsx
   * { skeleton: true }
   * ```
   */
  skeleton: true;
}

/**
 * Элемент хлебной крошки.
 *
 * Discriminated union по полю `skeleton`:
 * - `{ skeleton: true }` — состояние загрузки (показан анимированный скелетон)
 * - `{ title: string; href: string }` — заполненный элемент с текстом и ссылкой
 *
 * @see BreadcrumbsProps — пропсы компонента Breadcrumbs
 */
export type BreadcrumbItem = BreadcrumbItemFilled | BreadcrumbItemSkeleton;

```
