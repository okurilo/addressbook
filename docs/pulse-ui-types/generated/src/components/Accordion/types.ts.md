<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Accordion/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Accordion`
- Строк кода: 18
- Экспорты: `AccordionProps`, `Size`
- Импорты: `../Checkbox`, `react`
- Зависимости внутри выгрузки: [`src/components/Checkbox/types.ts`](<../Checkbox/types.ts.md>)

## Исходная типизация

```typescript
import { ReactNode } from "react";
import { CheckboxProps } from "../Checkbox";

export type Size = "xs" | "s" | "m" | "l" | "xl";

export interface AccordionProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  isDisabled?: boolean;
  isWithoutSpacing?: boolean;
  size?: Size;
  content?: ReactNode;
  headerButtons?: ReactNode[];
  withCheckbox?: boolean;
  onClickCheckbox?: (isChecked: boolean) => void;
  checkboxProps?: CheckboxProps;
  open?: boolean;
}

```
