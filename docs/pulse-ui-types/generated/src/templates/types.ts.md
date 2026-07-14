<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/templates/types.ts`

- Источник: [types-context.part-2.md](<../../../raw/types-context.part-2.md>)
- Раздел: `templates`
- Компонент/группа: `templates`
- Строк кода: 11
- Экспорты: `TemplateProps`
- Импорты: `../types`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { ISuggestSetAction } from "../types";

export interface TemplateProps extends Record<string, unknown> {
  /**
   * Обработчик события вызова экшна `suggest.set`
   */
  onSuggestSet: (
    value: ISuggestSetAction["value"],
    options?: { preventDisable: boolean }
  ) => void;
}

```
