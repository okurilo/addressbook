<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Title/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Title`
- Строк кода: 47
- Экспорты: `Size`, `SizeForTitleAsTab`, `TitleContextType`, `TitleProps`, `TitlePropsRegular`, `TitlePropsTab`, `TitleStates`, `TitleStyledProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ComponentPropsWithRef } from "react";

export type SizeForTitleAsTab = "H4" | "subheadline";

export type Size = "H1" | "H2" | "H3" | SizeForTitleAsTab | "footnote";

type BaseTitleProps = Omit<ComponentPropsWithRef<"div">, "size"> & {
  /**
   * Флаг, является ли активным.
   */
  $isActive?: boolean;
};

export type TitlePropsTab = BaseTitleProps & {
  /**
   * Флаг, является ли табом.
   */
  $isTab: true;
  /**
   * Размер.
   */
  $size: SizeForTitleAsTab;
};

export type TitlePropsRegular = BaseTitleProps & {
  /**
   * Флаг, является ли табом.
   */
  $isTab?: false | undefined;
  /**
   * Размер.
   */
  $size?: Size;
};

export type TitleProps = TitlePropsRegular | TitlePropsTab;

export type TitleStates = "selected";

export interface TitleContextType {
  $size?: TitleProps["$size"];
  $state?: TitleStates;
}

export type TitleStyledProps = TitleProps & {
  $state?: TitleStates;
};

```
