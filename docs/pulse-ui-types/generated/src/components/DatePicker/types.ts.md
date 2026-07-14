<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/DatePicker/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `DatePicker`
- Строк кода: 79
- Экспорты: `BottomSheetButtonProps`, `DatePickerProps`, `DateRange`
- Импорты: `../Button/types`, `../Checkbox`, `react`, `react-datepicker`
- Зависимости внутри выгрузки: [`src/components/Button/types.ts`](<../Button/types.ts.md>), [`src/components/Checkbox/types.ts`](<../Checkbox/types.ts.md>)

## Исходная типизация

```typescript
import { ButtonHTMLAttributes, ReactNode } from "react";
import { ReactDatePickerProps } from "react-datepicker";
import type { Type as ButtonType } from "../Button/types";
import { CheckboxProps } from "../Checkbox";

type ButtonAttributes = ButtonHTMLAttributes<HTMLButtonElement>;

export interface BottomSheetButtonProps {
  /**
   * Действие при нажатии.
   */
  onClick: () => void;
  /**
   * Текст кнопки.
   */
  label?: string;
  /**
   * Можно выбрать вид для кнопки из доступных.
   */
  type?: ButtonType;
  /**
   *  Дополнительные атрибуты для кнопки.
   */
  attributes?: ButtonAttributes;
}

export type DateRange<T> = [T, T];

export interface DatePickerProps extends ReactDatePickerProps {
  /**
   * Префикс.
   */
  $prefix?: "с" | "по" | string;
  /**
   * Длина префикса.
   */
  $prefixLength?: number;
  /**
   * Постфикс.
   */
  $postfix?: ReactNode;
  /**
   * @default "right"
   */
  $gutter?: "no" | "right";
  /**
   * Диапазон дат, которые нужно заблокировать для выбора.
   * Состоит из двух элементов: первый - начальная дата, второй - конечная дата в диапазоне.
   */
  excludeDatesRange?: DateRange<Date>;
  /**
   * Флаг автоподстановки точек в строку value.
   */
  isAutoDots?: boolean;
  /**
   * Заголовок для мобильной версии
   */
  mobileTitle?: string;
  /**
   * Основные параметры кнопки, включая надпись, действие при нажатии и дополнительные атрибуты.
   */
  buttonPrimary?: BottomSheetButtonProps;
  /**
   * Основные параметры кнопки, включая надпись, действие при нажатии и дополнительные атрибуты.
   */
  buttonSecondary?: BottomSheetButtonProps;
  /**
   * Параметры для чекбокса "бессрочно".
   * Включает только необходимые свойства: `id`, `checked`, `value` и `onChange`.
   */
  permanentCheckbox?: Pick<
    CheckboxProps,
    "id" | "checked" | "value" | "onChange"
  >;
  /**
   * Атрибут для встроенного input.
   */
  "data-testid"?: string;
}

```
