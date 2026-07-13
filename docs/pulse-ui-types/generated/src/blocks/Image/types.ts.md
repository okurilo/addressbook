<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/Image/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `Image`
- Строк кода: 26
- Экспорты: `ImageProps`
- Импорты: `./constants`, `styled-components`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { CSSProperties } from "styled-components";
import { SVG_IMAGES } from "./constants";

export interface ImageProps {
  /**
   * An HTML alt attribute
   */
  alt: string;
  /**
   * An aspect ratio (any value consumable by aspect-ratio CSS property)
   */
  aspectRatio?: CSSProperties["aspectRatio"];
  /**
   * A url to an image (any value consumable by srcSet attribute)
   */
  src:
    | string
    | {
        "1x": string;
        "2x": string;
      };
  // TODO remove this
  width?: number;
  // TODO remove this
  type?: keyof typeof SVG_IMAGES;
}

```
