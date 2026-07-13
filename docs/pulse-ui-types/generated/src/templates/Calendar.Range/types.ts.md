<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/templates/Calendar.Range/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `templates`
- Компонент/группа: `templates`
- Строк кода: 43
- Экспорты: `ArrowProps`, `CalendarRangeProps`, `Day`
- Импорты: `../../components/Button`, `../types`, `react`
- Зависимости внутри выгрузки: [`src/components/Button/types.ts`](<../../components/Button/types.ts.md>), [`src/templates/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { ButtonHTMLAttributes } from "react";
import type { ButtonProps } from "../../components/Button";
import type { TemplateProps } from "../types";

export interface ArrowProps
  extends Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  flip?: boolean;
}

export interface CalendarRangeProps extends TemplateProps {
  /**
   * Тип кнопки
   * @default 'primary'
   */
  button: {
    label: string;
    type?: Extract<ButtonProps["$type"], "primary" | "secondary">;
  };
  /**
   * Локаль
   */
  locale: string;
  /**
   * Дополнительный текст
   */
  label?: string;
  /**
   * Заголовок
   */
  title: string;
}

export interface Day {
  day: number;
  isActive?: boolean;
  isCurrent?: boolean;
  isExternal: boolean;
  isToday: boolean;
  isWeekend: boolean;
  key: string;
  name: string;
  original: Date;
}

```
