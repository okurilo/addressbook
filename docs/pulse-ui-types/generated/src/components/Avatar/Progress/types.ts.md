<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Avatar/Progress/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Avatar`
- Строк кода: 5
- Экспорты: `Progress`, `ProgressProps`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export type Progress = "25%" | "50%" | "75%" | "100%";
export interface ProgressProps {
  $percent: Progress;
  $color?: string;
}

```
