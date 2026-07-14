<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Form/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Form`
- Строк кода: 29
- Экспорты: `FieldProps`, `FormDataRecord`, `FormProps`
- Импорты: `../../components/deprecated/FormField`, `../types`
- Зависимости внутри выгрузки: [`src/blocks/types.ts`](<../types.ts.md>), [`src/components/deprecated/FormField/types.ts`](<../../components/deprecated/FormField/types.ts.md>)

## Исходная типизация

```typescript
import { FormField as UIFormField } from "../../components/deprecated/FormField";
import type { InferStyledProps } from "../types";

export type FormDataRecord = Record<string, string | File>;

export interface FieldProps
  extends Omit<InferStyledProps<typeof UIFormField>, "label"> {
  /**
   * HTML `id` attribute
   */
  id?: string;
  /**
   * Label
   */
  label?: string;
  /**
   * Validation messages
   */
  validation?: {
    tooLong?: string;
    tooShort?: string;
    typeMismatch?: string;
    valueMissing?: string;
  };
}

export interface FormProps {
  onSubmit?: (value: Record<string, FormDataEntryValue>) => void;
}

```
