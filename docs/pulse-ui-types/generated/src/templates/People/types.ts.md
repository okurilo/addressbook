<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/templates/People/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `templates`
- Компонент/группа: `templates`
- Строк кода: 56
- Экспорты: `ItemProps`, `PeopleProps`
- Импорты: `../../blocks/Avatar/badges`, `../types`
- Зависимости внутри выгрузки: [`src/templates/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import badges from "../../blocks/Avatar/badges";
import type { TemplateProps } from "../types";

export interface ItemProps {
  /**
   * Аватар
   */
  avatar?: string;
  /**
   * Бейдж (на аватаре)
   */
  badge?: keyof typeof badges;
  /**
   * Дополнительный текст
   */
  caption?: string;
  /**
   * Электронная почта
   */
  email?: string;
  /**
   * ID
   */
  id: number | string;
  /**
   * Имя
   */
  name?: string;
  /**
   * Телефон
   */
  phone?: string;
  /**
   * Должность
   */
  position?: string;
  /**
   * Подразделение
   */
  unit?: string;
  /**
   * Обработчик события нажатия на карточку
   */
  onClick?: () => void;
}

export interface PeopleProps extends TemplateProps {
  /**
   * Массив карточек
   */
  items: Array<ItemProps> | undefined;
  /**
   * Заголовок
   */
  title: string;
}

```
