<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/templates/Approvals/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `templates`
- Компонент/группа: `templates`
- Строк кода: 88
- Экспорты: `IApprovalsProps`, `ISortedStep`, `IStep`, `SuggestionPayload`
- Импорты: `../../types`, `../types`
- Зависимости внутри выгрузки: [`src/templates/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import { AnyValue } from "../../types";
import { TemplateProps } from "../types";

interface IUser {
  fullName: string;
  avatarUrl?: string;
  position?: string;
}

type ApprovalStatus = "in_progress" | "completed" | "rejected";

export interface IStep {
  /**
   * ID шага
   */
  id: string;
  /**
   * Заголовок шага
   */
  title: string;
  /**
   * Статус шага
   */
  status: ApprovalStatus;
  /**
   * Данные ответсвенного лица
   */
  user: IUser;
  /**
   * Дата начала шага
   */
  date?: string;
  /**
   * Порядковый номер шага
   */
  order?: number;
}

interface IButton {
  type: "primary" | "secondary";
  text: string;
  prompt?: string;
  agentId?: string;
  additionalProperties?: Record<string, string | number>;
}

export interface IApprovalsProps extends TemplateProps {
  /**
   * Заголовок
   */
  title: string;
  /**
   * Подзаголовок
   */
  subtitle?: string;
  /**
   * ID процесса
   */
  requestId?: string;
  /**
   * Дата начала процесса
   */
  requestDate?: string;
  /**
   * Текущий статус процесса
   */
  status: ApprovalStatus;
  /**
   * Массив шагов процесса
   */
  items: IStep[];
  /**
   * Данные для кнопок
   */
  buttons?: IButton[];
}

export interface ISortedStep {
  type: "step" | "placeholder";
  key: string;
  step?: IStep;
}

export interface SuggestionPayload {
  prompt: string;
  agentId: string;
  additionalProperties: Record<string, AnyValue>;
}

```
