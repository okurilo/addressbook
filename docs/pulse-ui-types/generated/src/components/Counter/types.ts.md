<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Counter/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Counter`
- Строк кода: 21
- Экспорты: `CounterProps`, `Variant`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export type Variant =
  | "h1Bold"
  | "h2Semibold"
  | "h3Semibold"
  | "h4Semibold"
  | "h5Semibold"
  | "h6Semibold"
  | "captionSemibold"
  | "body2Semibold";

export interface CounterProps {
  /**
   * Размер.
   * @default "captionSemibold"
   */
  $variant?: Variant;
  /**
   * Значение.
   */
  value: number;
}

```
