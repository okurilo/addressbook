<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Pagination/Navigation/Select/types.ts`

- Источник: [types-context.part-2.md](<../../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Pagination`
- Строк кода: 8
- Экспорты: `SelectProps`
- Импорты: `../types`
- Зависимости внутри выгрузки: [`src/components/Pagination/Navigation/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { NavigationCountProps } from "../types";

export interface SelectProps {
  value: string;
  onSelectChange: NavigationCountProps["$onSelectChange"];
  selectOptions: NonNullable<NavigationCountProps["$navigationSelectOptions"]>;
  selectText: string | undefined;
}

```
