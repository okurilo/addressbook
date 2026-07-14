<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/templates/Events/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `templates`
- Компонент/группа: `templates`
- Строк кода: 32
- Экспорты: `EventAction`, `EventProps`, `EventsItemProps`, `EventsProps`
- Импорты: `../types`
- Зависимости внутри выгрузки: [`src/templates/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { TemplateProps } from "../types";

export type EventAction = "SEND_EVENT" | "SHOW_EVENT";

export interface EventProps extends Record<string, unknown> {
  date?: string;
  id: number | string;
  image?: string;
  multipleDates?: boolean;
  name: string | undefined;
  place?: string;
  placesLeft?: number;
  placesTotal?: number;
  type: string | undefined;
  timeEnd?: string;
  timeStart?: string;
}

export interface EventsProps extends TemplateProps {
  /**
   * An array or object of items
   */
  items: EventProps[];
  /**
   * A locale
   */
  locale: string;
}

export type EventsItemProps = Pick<EventsProps, "locale"> &
  EventProps &
  TemplateProps;

```
