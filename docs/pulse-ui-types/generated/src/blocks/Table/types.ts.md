<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Table/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Table`
- Строк кода: 15
- Экспорты: `TableProps`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export interface TableProps {
  /**
   * Array of columns
   */
  columns: string[];
  /**
   * Array of data
   */
  data: Array<Array<number | string>> | undefined;
  /**
   * Rows per page for pagination
   * @default 10
   */
  perPage?: number;
}

```
