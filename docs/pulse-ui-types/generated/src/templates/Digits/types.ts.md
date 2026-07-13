<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/templates/Digits/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `templates`
- Компонент/группа: `templates`
- Строк кода: 35
- Экспорты: `DigitProps`, `DigitsProps`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export interface DigitProps {
  /**
   * Значение
   */
  value: number;
  /**
   * Единица измерения
   * @default ''
   * @example 'руб.', 'ед.', 'человек' и тд
   */
  unit: string;
  /**
   * Подпись
   */
  title?: string;
  /**
   * ссылка, которая открывается по клику на title
   */
  href?: string;
}

export interface DigitsProps {
  /**
   * Заголовок
   */
  title: string;
  /**
   * Описание
   */
  description?: string;
  /**
   * Цифры
   */
  digits: DigitProps[];
}

```
