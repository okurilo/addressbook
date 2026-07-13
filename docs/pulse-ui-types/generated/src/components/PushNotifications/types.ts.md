<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/PushNotifications/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `PushNotifications`
- Строк кода: 14
- Экспорты: `ContainerProps`, `PushNotificationsProps`
- Импорты: `react-transition-group`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { TransitionStatus } from "react-transition-group";

export interface PushNotificationsProps {
  /**
   * Флаг видимости.
   * Переключает состояние с плавной fade-анимацией.
   * @default true
   */
  $visible?: boolean;
}

export interface ContainerProps {
  state?: TransitionStatus;
}

```
