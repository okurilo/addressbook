<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Rating/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Rating`
- Строк кода: 8
- Экспорты: `RatingProps`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export interface RatingProps {
  /**
   * Оценка от 1 до 5
   * @default 0
   */
  $rate?: number;
  $onChange?: (rate: number) => void;
}

```
