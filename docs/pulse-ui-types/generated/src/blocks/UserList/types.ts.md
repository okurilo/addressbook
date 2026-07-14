<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/blocks/UserList/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `blocks`
- Компонент/группа: `UserList`
- Строк кода: 17
- Экспорты: `UserListProps`
- Импорты: `../../types`, `../User/types`
- Зависимости внутри выгрузки: [`src/blocks/User/types.ts`](<../User/types.ts.md>)

## Исходная типизация

```typescript
import type { CustomChangeEvent } from "../../types";
import { UserProps } from "../User/types";

type EnhancedUserProps = UserProps & { id: number | string };

export interface UserListProps {
  /**
   * An array of users
   */
  data: Array<EnhancedUserProps> | undefined;
  /**
   * A callback that is called when a user is clicked
   */
  onChange?: (
    e: CustomChangeEvent<NonNullable<UserListProps["data"]>[number]>
  ) => void;
}

```
