<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Pagination/Navigation/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Pagination`
- Строк кода: 90
- Экспорты: `NavigationCountProps`, `NavigationProps`, `Option`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export interface Option {
  value: string;
  label: string;
}

export interface NavigationProps {
  /**
   * Функция, срабатывающая при переходе на другую страницу (вперед).
   */
  $onForward?: (
    nextActiveIdx: number,
    firstIdxOnPage?: number,
    lastIdxOnPage?: number
  ) => void;
  /**
   * Функция, срабатывающая при переходе на другую страницу (назад).
   */
  $onBackward?: (
    nextActiveIdx: number,
    firstIdxOnPage?: number,
    lastIdxOnPage?: number
  ) => void;
  /**
   * Количество элементов на одной странице.
   * Параметр обязательный, если используется селект с выбором количества элементов на странице.
   */
  $itemsOnPage?: number;
  /**
   * Функция, срабатывающая при изменении количества элементов на странице.
   * Параметр обязательный, если используется селект с выбором количества элементов на странице.
   */
  $onSelectChange?: (itemsCount: number) => void;
  /**
   * Список опций числа элементов на странице.
   * Параметр обязательный, если используется селект с выбором количества элементов на странице.
   */
  $navigationSelectOptions?: Option[];
  /**
   * Текст в селекте.
   */
  $navigationSelectText?: string;
  /**
   * Показать/скрыть селект с выбором количества элементов на странице.
   * В мобильной версии селект должен быть всегда скрыт.
   */
  $isShowNavigationSelect?: boolean;
}

export interface NavigationCountProps {
  /**
   * Текущая открытая страница.
   */
  $currentPage?: number;
  /**
   * Общее количество страниц.
   */
  $totalPages: number;
  /**
   * Количество элементов на одной странице.
   * Параметр обязательный, если используется селект с выбором количества элементов на странице.
   */
  $itemsOnPage?: number;
  /**
   * Показать/скрыть селект с выбором количества элементов на странице.
   * В мобильной версии селект должен быть всегда скрыт.
   */
  $isShowNavigationSelect?: boolean;
  /**
   * Список опций числа элементов на странице.
   * Параметр обязательный, если используется селект с выбором количества элементов на странице.
   */
  $navigationSelectOptions?: Option[];
  /**
   * Текст в селекте.
   */
  $navigationSelectText?: string;
  /**
   * Функция, срабатывающая при переходе на другую страницу.
   */
  $onChange: (
    newCurrentPage: number,
    firstIdxOnPage?: number,
    lastIdxOnPage?: number
  ) => void;
  /**
   * Функция, срабатывающая при изменении количества элементов на странице.
   * Параметр обязательный, если используется селект с выбором количества элементов на странице.
   */
  $onSelectChange?: (itemsCount: number) => void;
}

```
