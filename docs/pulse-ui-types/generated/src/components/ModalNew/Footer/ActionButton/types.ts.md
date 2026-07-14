<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/ModalNew/Footer/ActionButton/types.ts`

- Источник: [types-context.part-1.md](<../../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `ModalNew`
- Строк кода: 10
- Экспорты: `ActionButtonProps`
- Импорты: `../../../Button/types`, `../../types`
- Зависимости внутри выгрузки: [`src/components/Button/types.ts`](<../../../Button/types.ts.md>), [`src/components/ModalNew/types.ts`](<../../types.ts.md>)

## Исходная типизация

```typescript
import { Type } from "../../../Button/types";
import { Button } from "../../types";

export type ActionButtonProps = {
  defaultType: Type;
  dataTestId: string;
  fullWidth: boolean;
  button: Button;
  onClick?: () => void;
};

```
