<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Tags/Hashtag/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Tags`
- Строк кода: 15
- Экспорты: `HashtagProps`, `Size`, `State`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export type State = "default" | "hover" | "focus" | "active" | "disabled";

export type Size = "m" | "s";

export interface HashtagProps {
  /**
   * Текущее состояние.
   */
  $state?: State;
  /**
   * Размер.
   * @default s
   */
  $size?: Size;
}

```
