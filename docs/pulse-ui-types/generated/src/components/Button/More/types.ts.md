<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Button/More/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Button`
- Строк кода: 6
- Экспорты: `MoreProps`, `MoreSize`
- Импорты: `../types`
- Зависимости внутри выгрузки: [`src/components/Button/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { ButtonProps, Size } from "../types";

export type MoreSize = Exclude<Size, "m-alt">;
export type MoreProps = Omit<ButtonProps, "$containsOnlyIcon"> & {
  $size?: MoreSize;
};

```
