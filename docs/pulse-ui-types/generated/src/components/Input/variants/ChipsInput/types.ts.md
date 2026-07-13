<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Input/variants/ChipsInput/types.ts`

- Источник: [types-context.part-1.md](<../../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Input`
- Строк кода: 20
- Экспорты: `ChipsInputProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { InputHTMLAttributes, ReactElement, RefObject } from "react";

export interface ChipsInputProps {
  /**
   * Передача списка тегов-чипсов для отображения внутри инпута
   * @example $chips: [<Chips>label</Chips>]
   */
  $chips: ReactElement[];
  /**
   * Передача списка атрибутов для поля input
   */
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  /**
   * Передача ref для компонента ввода
   */
  inputRef?:
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
    | null;
}

```
