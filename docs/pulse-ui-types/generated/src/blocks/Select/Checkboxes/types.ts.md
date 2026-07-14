<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Select/Checkboxes/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Select`
- Строк кода: 36
- Экспорты: `CheckboxesProps`
- Импорты: `../../../components/Checkbox`, `../../../types`
- Зависимости внутри выгрузки: [`src/components/Checkbox/types.ts`](<../../../components/Checkbox/types.ts.md>)

## Исходная типизация

```typescript
import type { CheckboxProps as PulseCheckboxProps } from "../../../components/Checkbox";
import type { CustomChangeEvent } from "../../../types";

interface OptionProps {
  /**
   * Если `true`, то элемент будет отключен
   */
  disabled?: boolean;
  /**
   * ID
   */
  id: string;
  /**
   * Подпись
   */
  label: string;
}

export interface CheckboxesProps {
  /**
   * Значение по умолчанию
   */
  defaultValue?: string[];
  /**
   * Массив элементов
   */
  items: OptionProps[];
  /**
   * Размер
   */
  size?: PulseCheckboxProps["$size"];
  /**
   * Обработчик события onChange
   */
  onChange?: (event: CustomChangeEvent<OptionProps[]>) => void;
}

```
