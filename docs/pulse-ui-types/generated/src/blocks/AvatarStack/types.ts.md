<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/AvatarStack/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `AvatarStack`
- Строк кода: 26
- Экспорты: `AvatarStackProps`
- Импорты: `../../components/Avatar`, `../../components/AvatarStack`, `../types`
- Зависимости внутри выгрузки: [`src/blocks/types.ts`](<../types.ts.md>), [`src/components/Avatar/types.ts`](<../../components/Avatar/types.ts.md>), [`src/components/AvatarStack/types.ts`](<../../components/AvatarStack/types.ts.md>)

## Исходная типизация

```typescript
import { Avatar as UIAvatar } from "../../components/Avatar";
import { AvatarStack as UIAvatarStack } from "../../components/AvatarStack";
import type { InferStyledProps, Unwrap } from "../types";

type UIAvatarProps = Unwrap<InferStyledProps<typeof UIAvatar>>;

export interface AvatarStackProps {
  /**
   * Array of avatars (an array of 2 avatars if type is `double`)
   */
  items: Array<Pick<UIAvatarProps, "text" | "icon">> | undefined;
  /**
   * Maximum number of avatars to display (when type is `ordinary`)
   */
  max?: number;
  /**
   * Size
   * @default 'm'
   */
  size?: Extract<InferStyledProps<typeof UIAvatarStack>["$size"], "m" | "s">;
  /**
   * Type
   * @default 'ordinary'
   */
  type?: InferStyledProps<typeof UIAvatarStack>["$type"];
}

```
