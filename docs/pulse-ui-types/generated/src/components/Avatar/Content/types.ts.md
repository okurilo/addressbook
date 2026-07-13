<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Avatar/Content/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Avatar`
- Строк кода: 18
- Экспорты: `ContentProps`, `TextSizes`, `WrapperProps`
- Импорты: `../../../types`, `../types`
- Зависимости внутри выгрузки: [`src/components/Avatar/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { Size, AvatarProps, Shape } from "../types";
import { CustomStyledProps } from "../../../types";

export interface ContentProps {
  $type: AvatarProps["$type"];
  $text: AvatarProps["$text"];
  $size: Size;
  $icon: AvatarProps["$icon"];
  $shape: Shape;
  $fallbackType: AvatarProps["$fallbackType"];
}

export type TextSizes = CustomStyledProps<Size>;

export interface WrapperProps {
  $shape: Shape;
  $size: Size;
}

```
