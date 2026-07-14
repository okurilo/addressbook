<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/types.ts`

- Источник: [types-context.part-1.md](<../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `types.ts`
- Строк кода: 23
- Экспорты: `ClickableProps`, `InferStyledProps`, `Unwrap`, `Wrap`
- Импорты: `react`, `styled-components`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ComponentProps } from "react";
import {
  AnyStyledComponent,
  StyledComponentInnerComponent,
  StyledComponentInnerOtherProps,
} from "styled-components";

export interface ClickableProps {
  onClick?: () => void;
}

export type InferStyledProps<T extends AnyStyledComponent> = ComponentProps<
  StyledComponentInnerComponent<T>
> &
  StyledComponentInnerOtherProps<T>;

export type Wrap<T> = {
  [K in keyof T as `$${Extract<K, string>}`]: T[K];
};

export type Unwrap<T> = {
  [K in keyof T as K extends `$${infer Q}` ? Q : K]: T[K];
};

```
