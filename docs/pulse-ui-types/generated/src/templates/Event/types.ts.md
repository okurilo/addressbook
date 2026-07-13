<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/templates/Event/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `templates`
- Компонент/группа: `templates`
- Строк кода: 47
- Экспорты: `EventProps`
- Импорты: `../types`
- Зависимости внутри выгрузки: [`src/templates/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { TemplateProps } from "../types";

export interface EventProps extends TemplateProps {
  /**
   * Доступные даты
   */
  availableDates?: Array<{
    end?: string;
    start: string;
  }>;
  /**
   * Описание
   */
  description: string | undefined;
  /**
   * ID
   */
  id: number | string;
  /**
   * Изображение
   */
  image?: string;
  /**
   * Локаль
   */
  locale: string;
  /**
   * Название
   */
  name: string;
  /**
   * Место
   */
  place?: string;
  /**
   * Количество оставшихся мест
   */
  placesLeft?: number;
  /**
   * Количество мест всего
   */
  placesTotal?: number;
  /**
   * Тип
   */
  type: string | undefined;
}

```
