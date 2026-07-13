<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Switch/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Switch`
- Строк кода: 17
- Экспорты: `Size`, `SwitchContentProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { InputHTMLAttributes } from "react";

export type Size = "s" | "m" | "l";

export interface SwitchContentProps
  extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Неактивность тумблера.
   * @default false
   */
  $disabled?: boolean;
  /**
   * Размер компонента.
   * @default l
   */
  $size?: Size;
}

```
