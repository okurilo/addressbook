<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Delta/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Delta`
- Строк кода: 28
- Экспорты: `DeltaProps`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export interface DeltaProps {
  /**
   * Locale
   */
  locale: string;
  /**
   * Period
   */
  period?: string;
  /**
   * Size
   * @default 's'
   */
  size?: "m" | "s";
  /**
   * Trend
   * @default NEUTRAL
   */
  trend?: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  /**
   * Unit
   */
  unit?: string;
  /**
   * Value
   */
  value: number | undefined;
}

```
