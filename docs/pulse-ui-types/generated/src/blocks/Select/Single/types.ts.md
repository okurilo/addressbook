<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Select/Single/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Select`
- Строк кода: 53
- Экспорты: `SingleProps`
- Импорты: `../../../components/Select/types`, `../../../types`
- Зависимости внутри выгрузки: [`src/components/Select/types.ts`](<../../../components/Select/types.ts.md>)

## Исходная типизация

```typescript
import { SelectProps } from "../../../components/Select/types";
import type { CustomChangeEvent } from "../../../types";

interface OptionProps {
  /**
   * Дополнительный текст
   */
  caption?: string;
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

export interface SingleProps extends Pick<SelectProps, "placeholder"> {
  /**
   * Если `true`, то селект будет очищаемым
   */
  clearable?: boolean;
  /**
   * Значение по умолчанию
   */
  defaultValue?: string;
  /**
   * Если `true`, то блок будет отключен
   */
  disabled?: boolean;
  /**
   * Подпись
   * @deprecated Подпись должна задаваться вне этого блока
   */
  label?: string;
  /**
   * Массив элементов
   */
  options: OptionProps[];
  /**
   * Если `true`, то селект будет фильтруемым
   */
  searchable?: boolean;
  /**
   * Обработчик события onChange
   */
  onChange?: (event: CustomChangeEvent<OptionProps>) => void;
}

```
