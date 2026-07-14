<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/SplitView/InternalUnit/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `SplitView`
- Строк кода: 12
- Экспорты: `InternalUnitProps`
- Импорты: `../types`, `react`
- Зависимости внутри выгрузки: [`src/components/SplitView/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { RefObject } from "react";
import { SplitViewProps } from "../types";

export interface InternalUnitProps
  extends Omit<
    SplitViewProps,
    "defaultWidth" | "minWidth" | "keepContentMounted"
  > {
  isResizing: boolean;
  handleResizeRef: RefObject<HTMLDivElement>;
  toggleSplitViewWidth: () => void;
}

```
