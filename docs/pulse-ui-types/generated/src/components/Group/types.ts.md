<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Group/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Group`
- Строк кода: 9
- Экспорты: `GroupColumns`, `GroupProps`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export type GroupColumns = "1" | "2" | "3";

export interface GroupProps {
  /**
   * Количество колонок.
   * @default 1
   */
  $columns?: GroupColumns;
}

```
