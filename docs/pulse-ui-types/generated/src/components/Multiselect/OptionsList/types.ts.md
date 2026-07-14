<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Multiselect/OptionsList/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Multiselect`
- Строк кода: 33
- Экспорты: `OptionsListProps`
- Импорты: `../Option`, `../Option/types`, `../types`, `react`
- Зависимости внутри выгрузки: [`src/components/Multiselect/Option/types.ts`](<../Option/types.ts.md>), [`src/components/Multiselect/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { ReactElement } from "react";
import { OptionProps } from "../Option";
import { InternalOptionProps } from "../Option/types";
import { SelectProps, Value } from "../types";

type Children<ValueP extends Value> = ReactElement<
  OptionProps<ValueP> & InternalOptionProps
>;
export interface OptionsListProps<ValueP extends Value> {
  children: Children<ValueP> | Children<ValueP>[];
  maxHeight?: SelectProps["optionsListMaxHeight"];
  withSearch?: SelectProps["withSearch"];
  searchValue?: SelectProps["searchValue"];
  onSearchChange?: SelectProps["onSearchChange"];
  onFilter?: SelectProps["onFilter"];
  onSelectOption: SelectProps["onSelectOption"];
  searchPlaceholder?: SelectProps["searchPlaceholder"];
  isLoading?: SelectProps["isLoading"];
  isShowEmpty?: SelectProps["isShowEmpty"];
  emptyBlockText?: SelectProps["emptyBlockText"];
  isShowReloadError?: SelectProps["isShowReloadError"];
  reloadErrorText?: SelectProps["reloadErrorText"];
  reloadErrorButtonLabel?: SelectProps["reloadErrorButtonLabel"];
  onReloadErrorClick?: SelectProps["onReloadErrorClick"];
  buttons?: SelectProps["buttons"];
  isAdaptive?: boolean;
  withVirtualList?: SelectProps["withVirtualList"];
  virtualListProps?: SelectProps["virtualListProps"];
  isLazyLoading?: SelectProps["isLazyLoading"];
  onIntersectLastOption?: SelectProps["onIntersectLastOption"];
  withComplexOptions?: SelectProps["withComplexOptions"];
  onSearchExactMatch?: SelectProps["onSearchExactMatch"];
}

```
