<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/templates/Choose.Single/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `templates`
- Компонент/группа: `templates`
- Строк кода: 62
- Экспорты: `ChooseSingleProps`
- Импорты: `../../components/Button`, `../types`
- Зависимости внутри выгрузки: [`src/components/Button/types.ts`](<../../components/Button/types.ts.md>), [`src/templates/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { ButtonProps } from "../../components/Button";
import type { TemplateProps } from "../types";

interface ItemProps
  extends Record<string, boolean | number | string | null | undefined> {
  caption?: string;
  checked?: boolean;
  disabled?: boolean;
  id: number | string;
  label: string;
}

export interface ChooseSingleProps extends TemplateProps {
  /**
   * Тип кнопки
   *
   * @default 'primary'
   * @todo сделать обязательным
   */
  button?: {
    label: string;
    type?: Extract<ButtonProps["$type"], "primary" | "secondary">;
  };
  /**
   * Подписи к кнопкам
   *
   * @deprecated use `button`
   */
  buttons?: {
    reset?: string;
    submit: string;
  };
  /**
   * Параметры промпта (обязателен, если `required` не задан)
   *
   * @todo улучшить типизацию
   */
  prompt?: {
    /**
     * Пустой промпт (если не выбран ни один из вариантов)
     */
    empty: string;
  };
  /**
   * Массив элементов
   */
  items: ItemProps[];
  /**
   * Дополнительный текст
   */
  label?: string;
  /**
   * Если `true`, то кнопка `submit` будет отключена, если не выбран ни один элемент

   * @default false
   */
  required?: boolean;
  /**
   * Заголовок
   */
  title: string;
}

```
