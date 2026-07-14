<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Summary/SummaryItem/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Summary`
- Строк кода: 55
- Экспорты: `LabelProps`, `SummaryItemProps`, `ValueProps`
- Импорты: `../../../utils/floating-ui/types`, `../../Tooltip/types`, `react`
- Зависимости внутри выгрузки: [`src/components/Tooltip/types.ts`](<../../Tooltip/types.ts.md>), [`src/utils/floating-ui/types.ts`](<../../../utils/floating-ui/types.ts.md>)

## Исходная типизация

```typescript
import type { ReactNode } from "react";
import type { TooltipMode } from "../../Tooltip/types";
import type { FloatingProps } from "../../../utils/floating-ui/types";

export interface LabelProps {
  /**
   * Текст лейбла.
   */
  label?: string;
  /**
   * Ширина лейбла.
   */
  labelWidth?: number;
  /**
   * Всплывающий текст, отображаемый при наведении.
   */
  tooltipValue?: string | ReactNode;
  /**
   * Цветовой режим всплывающего текста.
   */
  tooltipMode?: TooltipMode;
  /**
   * Расположение всплывающего текста.
   */
  tooltipPlacement?: FloatingProps["placement"];
}

export interface ValueProps {
  /**
   * Текст значения.
   */
  value?: string;
  /**
   * Описание.
   */
  description?: string;
  /**
   * Флаг, указывающий нужно ли переносить описание на новую строку.
   */
  hasDescriptionOwnLine?: boolean;
  /**
   * Текст ошибки.
   */
  error?: string;
  /**
   * Тип кнопки при наведении.
   */
  button?: "default" | "more";
  /**
   * Обработчик клика по элементу.
   */
  onClickButton?: (...args: unknown[]) => void;
}

export type SummaryItemProps = LabelProps & ValueProps;

```
