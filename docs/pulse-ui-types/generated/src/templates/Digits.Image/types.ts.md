<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/templates/Digits.Image/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `templates`
- Компонент/группа: `templates`
- Строк кода: 6
- Экспорты: `IDigitsImageProps`
- Импорты: `../../blocks/Image/types`, `../Digits/types`
- Зависимости внутри выгрузки: [`src/blocks/Image/types.ts`](<../../blocks/Image/types.ts.md>), [`src/templates/Digits/types.ts`](<../Digits/types.ts.md>)

## Исходная типизация

```typescript
import type { ImageProps } from "../../blocks/Image/types";
import type { DigitsProps } from "../Digits/types";

export interface IDigitsImageProps extends DigitsProps {
  image: ImageProps;
}

```
