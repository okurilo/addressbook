<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Checkbox/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Checkbox`
- Строк кода: 46
- Экспорты: `CheckboxProps`, `Size`, `State`, `VerticalAlign`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { InputHTMLAttributes } from "react";

export type State = "active" | "disabled" | "hover" | "focus" | "pressed";
export type Size = "s" | "m";
export type VerticalAlign = "top" | "center";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Размер.
   * @default m
   */
  $size?: Size;
  /**
   * Флаг неопределенного (indeterminate) состояния.
   * @default false
   */
  $mixed?: boolean;
  /**
   * Состояние.
   */
  $state?: State;
  /**
   * Пропсы инпута.
   */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  /**
   * Функция вызывается при изменении состояния.
   */
  onChecked?: (checked: boolean) => void;
  /**
   * Вертикальное выравнивание. По умолчанию "center".
   */
  verticalAlign?: VerticalAlign;
  /**
   * Описание под лейблом.
   */
  description?: string;
  /**
   * Текст подсказки.
   */
  info?: string;
  /**
   * Счетчик справа от лейбла.
   */
  counter?: number;
}

```
