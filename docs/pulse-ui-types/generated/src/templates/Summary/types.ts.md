<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/templates/Summary/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `templates`
- Компонент/группа: `templates`
- Строк кода: 56
- Экспорты: `BaseSummaryItemProps`, `SummaryItemProps`, `SummaryProps`, `TagsSummaryItemProps`, `UserSummaryItemProps`, `ValueSummaryItemProps`
- Импорты: `../../components/Tags/Tag/types`, `../types`
- Зависимости внутри выгрузки: [`src/components/Tags/Tag/types.ts`](<../../components/Tags/Tag/types.ts.md>), [`src/templates/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { TagColor } from "../../components/Tags/Tag/types";
import type { TemplateProps } from "../types";

export interface SummaryProps extends TemplateProps {
  /**
   * Подписи к кнопкам
   */
  buttons: {
    reset?: string;
    submit: string;
  };
  /**
   * Массив элементов
   */
  items: SummaryItemProps[];
  /**
   * Дополнительный текст
   */
  label?: string;
  /**
   * Промпты
   */
  prompt?: {
    reset?: string;
    submit: string;
  };
  /**
   * Заголовок
   */
  title: string;
}

export interface BaseSummaryItemProps {
  label: string;
}

export interface TagsSummaryItemProps extends BaseSummaryItemProps {
  tags: Array<{
    color: TagColor;
    label: string;
  }>;
}

export interface UserSummaryItemProps extends BaseSummaryItemProps {
  avatar?: string;
  name: string;
}

export interface ValueSummaryItemProps extends BaseSummaryItemProps {
  value: string;
}

export type SummaryItemProps =
  | TagsSummaryItemProps
  | UserSummaryItemProps
  | ValueSummaryItemProps;

```
