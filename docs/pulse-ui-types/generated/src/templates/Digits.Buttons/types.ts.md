<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/templates/Digits.Buttons/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `templates`
- Компонент/группа: `templates`
- Строк кода: 24
- Экспорты: `DigitsButtonsProps`
- Импорты: `../../components/Button/types`, `../Digits/types`, `../types`
- Зависимости внутри выгрузки: [`src/components/Button/types.ts`](<../../components/Button/types.ts.md>), [`src/templates/Digits/types.ts`](<../Digits/types.ts.md>), [`src/templates/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { Type as ButtonType } from "../../components/Button/types";
import type { TemplateProps } from "../types";
import type { DigitsProps } from "../Digits/types";

export interface DigitsButtonsProps extends DigitsProps, TemplateProps {
  /**
   * Массив кнопок
   * @todo переделать на объект с двумя кнопками
   */
  buttons: Array<{
    /**
     * ID
     */
    id: string | number;
    /**
     * Текст
     */
    label: string;
    /**
     * Тип
     */
    type?: ButtonType;
  }>;
}

```
