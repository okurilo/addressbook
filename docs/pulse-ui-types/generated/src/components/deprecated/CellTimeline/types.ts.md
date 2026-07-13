<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/deprecated/CellTimeline/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `deprecated`
- Строк кода: 20
- Экспорты: `CellTimelineContextArgs`, `CellTimelineProps`, `Size`, `Types`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export type Size = "s" | "m" | "l";
export type Types = "history" | "chronology" | "progress";

export interface CellTimelineProps {
  /**
   * Вариант отображения.
   * @default 'history'
   */
  $type?: Types;
  /**
   * Размер.
   * @default 'm'
   */
  $size?: Size;
}

export interface CellTimelineContextArgs {
  $size?: Size;
  $type?: Types;
}

```
