<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Tags/Selectable/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Tags`
- Строк кода: 15
- Экспорты: `SelectableProps`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
type State = "default" | "hover" | "focus" | "selected" | "active";
type Size = "m" | "l";

export interface SelectableProps {
  $state?: State;
  /**
   * Размер.
   * @default m
   */
  $size?: Size;
  /**
   * Флаг выбранного состояния.
   */
  $selected?: boolean;
}

```
