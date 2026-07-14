<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Modal/Alert/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Modal`
- Строк кода: 13
- Экспорты: `ModalAlertProps`
- Импорты: `../Base`, `react`
- Зависимости внутри выгрузки: [`src/components/Modal/Base/types.ts`](<../Base/types.ts.md>)

## Исходная типизация

```typescript
import type { MouseEventHandler, ReactNode } from "react";

import { ModalBaseProps } from "../Base";

export interface ModalAlertProps {
  $onClose?: ModalBaseProps["$onClose"];
  $title?: ReactNode;
  $content?: ReactNode;
  $onCancel?: MouseEventHandler<HTMLButtonElement>;
  $onOk?: MouseEventHandler<HTMLButtonElement>;
  $cancelText?: ReactNode;
  $okText?: ReactNode;
}

```
