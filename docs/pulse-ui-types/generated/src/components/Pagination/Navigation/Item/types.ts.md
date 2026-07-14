<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Pagination/Navigation/Item/types.ts`

- Источник: [types-context.part-2.md](<../../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Pagination`
- Строк кода: 13
- Экспорты: `ItemProps`, `ItemStyledProps`
- Импорты: `styled-components`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { DefaultTheme, StyledComponentProps } from "styled-components";

export interface ItemStyledProps {
  /** @default false */
  $isActive?: boolean;
}

export type ItemProps = StyledComponentProps<
  "button",
  DefaultTheme,
  Pick<ItemStyledProps, "$isActive">,
  never
>;

```
