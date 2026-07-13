<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Cell/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Cell`
- Строк кода: 24
- Экспорты: `CellProps`
- Импорты: `../../components/Cell/types`
- Зависимости внутри выгрузки: [`src/components/Cell/types.ts`](<../../components/Cell/types.ts.md>)

## Исходная типизация

```typescript
import type { CellProps as UICellProps } from "../../components/Cell/types";

type UICellPropsStrict = {
  [K in keyof UICellProps as string extends K ? never : K]: UICellProps[K];
};

export interface CellProps
  extends Omit<
    UICellPropsStrict,
    "about" | "avatarNode" | "avatarSrc" | "actionContent" | "badgeContent"
  > {
  /**
   * Основные данные
   */
  about: UICellProps["about"] | undefined;
  /**
   * URL аватара
   */
  avatar?: UICellProps["avatarSrc"];
  /**
   * Контент в правой части
   */
  children?: UICellProps["actionContent"];
}

```
