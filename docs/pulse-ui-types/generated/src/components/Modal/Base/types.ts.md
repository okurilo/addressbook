<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Modal/Base/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Modal`
- Строк кода: 25
- Экспорты: `ColumnStyledProps`, `ModalBaseProps`, `Size`
- Импорты: `styled-components`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { DefaultTheme, StyledComponentProps } from "styled-components";

export type Size = "s" | "m" | "l";

export interface ModalBaseProps
  extends StyledComponentProps<
    "div",
    DefaultTheme,
    Record<string, unknown>,
    never
  > {
  /**
   * Размер.
   * @default 's'
   */
  $size?: Size;
  /**
   * Коллбэк закрытия модального окна.
   */
  $onClose?: () => void;
}

export interface ColumnStyledProps {
  $scrollBarWidth?: number;
}

```
