<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/CellTimeline/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `CellTimeline`
- Строк кода: 18
- Экспорты: `CellTimelineContextArgs`, `CellTimelineProps`, `Size`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export type Size = "s" | "m" | "l";

export interface CellTimelineProps {
  /**
   * Наличие иконки со статусом.
   */
  withIcon?: boolean;
  /**
   * Размер.
   * @default 'm'
   */
  $size?: Size;
}

export interface CellTimelineContextArgs {
  size?: Size;
  withIcon?: boolean;
}

```
