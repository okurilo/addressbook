<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/templates/Digits.Profile/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `templates`
- Компонент/группа: `templates`
- Строк кода: 13
- Экспорты: `DigitsProfileProps`
- Импорты: `../Digits/types`, `../types`
- Зависимости внутри выгрузки: [`src/templates/Digits/types.ts`](<../Digits/types.ts.md>), [`src/templates/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { TemplateProps } from "../types";
import type { DigitsProps } from "../Digits/types";

export interface DigitsProfileProps extends DigitsProps, TemplateProps {
  /**
   * Данные профиля
   */
  profile: {
    title: string;
    description: string;
    src?: string;
  };
}

```
