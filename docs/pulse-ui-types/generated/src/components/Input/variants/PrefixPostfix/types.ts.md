<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Input/variants/PrefixPostfix/types.ts`

- Источник: [types-context.part-1.md](<../../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Input`
- Строк кода: 28
- Экспорты: `ForwardRef`, `PrefixLengthType`, `PrefixPostfixProps`, `PrefixStringType`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type {
  Component,
  HTMLProps,
  LegacyRef,
  MutableRefObject,
  ReactNode,
} from "react";

export type PrefixLengthType = number;

export type PrefixStringType = "с" | "по" | "от" | "до" | string;

export type ForwardRef =
  | ((instance: HTMLInputElement | null) => void)
  /* eslint-disable-next-line */
  | LegacyRef<Component<HTMLInputElement, unknown, unknown>>
  | MutableRefObject<HTMLInputElement | null>
  | null;

export interface PrefixPostfixProps extends HTMLProps<HTMLInputElement> {
  children?: ReactNode;
  $prefix?: PrefixStringType | ReactNode;
  $prefixLength?: PrefixLengthType;
  $postfix?: ReactNode;
  disabled?: boolean;
  $control?: ReactNode;
  innerRef?: ForwardRef;
}

```
