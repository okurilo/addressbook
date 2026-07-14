<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/deprecated/FormField/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `deprecated`
- Строк кода: 31
- Экспорты: `FormFieldProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ReactNode } from "react";

export interface FormFieldProps {
  /**
   * Элемент лейбла.
   * @example <label />
   */
  label?: ReactNode;
  /**
   * Элемент управления.
   * @example <input />
   */
  control?: ReactNode;
  /**
   * Элемент подсказки.
   */
  hint?: ReactNode;
  /**
   * Элемент ошибки.
   */
  error?: ReactNode;
  /**
   * Дополнительный элемент справа.
   * @example <Addon />
   */
  addon?: ReactNode;
  /**
   * Дочерние элементы.
   */
  children?: ReactNode;
}

```
