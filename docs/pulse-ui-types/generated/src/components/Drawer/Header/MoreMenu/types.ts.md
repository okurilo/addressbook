<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Drawer/Header/MoreMenu/types.ts`

- Источник: [types-context.part-1.md](<../../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Drawer`
- Строк кода: 6
- Экспорты: `MoreMenuProps`
- Импорты: `../types`
- Зависимости внутри выгрузки: [`src/components/Drawer/Header/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { HeaderProps } from "../types";

export type MoreMenuProps = Omit<
  HeaderProps,
  "currentTitle" | "isBackArrowVisible" | "onBackArrowClick" | "onCloseDrawer"
>;

```
