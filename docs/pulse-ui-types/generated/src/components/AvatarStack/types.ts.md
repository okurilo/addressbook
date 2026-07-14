<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/AvatarStack/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `AvatarStack`
- Строк кода: 22
- Экспорты: `AvatarStackProps`, `ButtonSize`, `Size`, `StackType`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export type ButtonSize = "m" | "s";
export type Size = "m" | "s" | "xs";
export type StackType = "ordinary" | "double";
type Overlap = "default" | "reverse";

export interface AvatarStackProps {
  /**
   * Тип.
   * @default ordinary
   */
  $type?: StackType;
  /**
   * Размер.
   * @default m
   */
  $size?: Size;
  /**
   * Вариант наложения.
   * @default 'default'
   */
  $overlap?: Overlap;
}

```
