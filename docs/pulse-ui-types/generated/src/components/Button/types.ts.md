<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Button/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Button`
- Строк кода: 44
- Экспорты: `ButtonProps`, `LoaderProps`, `Size`, `State`, `Type`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export interface ButtonProps {
  /**
   * Вариант отображения.
   * @default primary
   */
  $type?: Type;
  /**
   * Размер.
   * @default m
   */
  $size?: Size;
  /**
   * Текущее состояние.
   */
  $state?: State;
  /**
   * Содержит только иконку, без текста.
   */
  $containsOnlyIcon?: boolean;
  /**
   * Растягивать на полную ширину.
   */
  $fullWidth?: boolean;
  /**
   * Состояние загрузки.
   * @default false
   */
  $isLoading?: boolean;
}

export interface LoaderProps {
  $type: Type;
  $size: Size;
}

export type Type =
  | "primary"
  | "secondary"
  | "tertiary"
  | "mono"
  | "monoSecondary";

export type Size = "l" | "m" | "m-alt" | "s" | "xs";
export type State = "focus" | "hover" | "pressed";

```
