<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Tags/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Tags`
- Строк кода: 5
- Экспорты: `TagsProps`
- Импорты: `../Tag`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { TagProps } from "../Tag";

export interface TagsProps {
  tags: Pick<TagProps, "text" | "color">[] | undefined;
}

```
