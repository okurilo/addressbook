<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Select/OptionsList/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Select`
- Строк кода: 42
- Экспорты: `OptionsListProps`
- Импорты: `../Option`, `../Option/types`, `../types`, `react`
- Зависимости внутри выгрузки: [`src/components/Select/Option/types.ts`](<../Option/types.ts.md>), [`src/components/Select/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { ReactElement } from "react";
import { OptionProps } from "../Option";
import { InternalOptionProps } from "../Option/types";
import { SelectProps, Value } from "../types";

type Children<ValueP extends Value> = ReactElement<
  OptionProps<ValueP> & InternalOptionProps
>;
type OptionsListButtons = {
  clearAll?: {
    text?: string;
  };
};

export interface OptionsListProps<ValueP extends Value> {
  value: SelectProps<ValueP>["value"];
  onChange: SelectProps<ValueP>["onChange"];
  setIsOpened: (isOpened: boolean) => void;
  children: Children<ValueP> | Children<ValueP>[];
  maxHeight?: SelectProps["optionsListMaxHeight"];
  withSearch?: SelectProps["withSearch"];
  searchPlaceholder?: SelectProps["searchPlaceholder"];
  searchValue?: SelectProps["searchValue"];
  onSearchChange?: SelectProps["onSearchChange"];
  onFilter?: SelectProps["onFilter"];
  isShowEmpty?: SelectProps["isShowEmpty"];
  emptyBlockText?: SelectProps["emptyBlockText"];
  isShowReloadError?: SelectProps["isShowReloadError"];
  reloadErrorText?: SelectProps["reloadErrorText"];
  reloadErrorButtonLabel?: SelectProps["reloadErrorButtonLabel"];
  onReloadErrorClick?: SelectProps["onReloadErrorClick"];
  isLoading?: SelectProps["isLoading"];
  withVirtualList?: SelectProps["withVirtualList"];
  virtualListProps?: SelectProps["virtualListProps"];
  buttons?: OptionsListButtons;
  hasClearButton?: boolean;
  onClearButtonClick?: () => void;
  notFoundText?: SelectProps["notFoundText"];
  isLazyLoading?: SelectProps["isLazyLoading"];
  onIntersectLastOption?: SelectProps["onIntersectLastOption"];
  withComplexOptions?: SelectProps["withComplexOptions"];
}

```
