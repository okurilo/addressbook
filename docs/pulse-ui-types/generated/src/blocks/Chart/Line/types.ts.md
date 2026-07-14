<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Chart/Line/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Chart`
- Строк кода: 21
- Экспорты: `LineProps`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export interface LineProps {
  /**
   * Axis options
   */
  axis?: {
    x?: {
      label: string;
    };
    y?: {
      label: string;
    };
  };
  /**
   * Array of categories (x-axis values)
   */
  categories: string[] | undefined;
  /**
   * Array of series
   */
  data: number[][] | undefined;
}

```
