<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/templates/Choose.Multi/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `templates`
- Компонент/группа: `templates`
- Строк кода: 68
- Экспорты: `ChooseMultiProps`
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

export interface ChooseMultiProps extends TemplateProps {
  /**
   * Тип кнопки
   * @default 'primary'
   * @todo сделать обязательным
   */
  button?: {
    label: string;
    type?: Extract<ButtonProps["$type"], "primary" | "secondary">;
  };
  /**
   * Подписи к кнопкам
   * @deprecated
   */
  buttons?: {
    reset?: string;
    submit: string;
  };
  /**
   * Параметры промпта (обязателен, если не задан `required`)
   * @todo улучшить типизацию
   */
  prompt?: {
    /**
     * Пустой промпт (откидывается, если не выбран ни один из вариантов)
     */
    empty: string;
  };
  /**
   * Массив элементов
   */
  items: Array<ItemProps>;
  /**
   * Дополнительный текст
   */
  label?: string;
  /**
   * Локаль
   */
  locale: string;
  /**
   * Если задано, то кнопка будет отключена, если количество выбранных
   * элементов меньше `min` или больше `max`
   *
   * @default
   * { max: Number.MAX_SAFE_INTEGER, min: 0 }
   */
  required?: {
    max?: number;
    min?: number;
  };
  /**
   * Заголовок
   */
  title: string;
}

```
