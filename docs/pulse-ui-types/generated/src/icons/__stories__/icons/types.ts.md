<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/icons/__stories__/icons/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `icons`
- Компонент/группа: `icons`
- Строк кода: 76
- Экспорты: `AllType`, `ColoredType`, `IconCategory`, `IconsValue`, `IconType`, `NoneType`, `sections`
- Импорты: `./constants`, `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import type { FC, SVGProps } from "react";
import {
  ALL,
  NONE,
  OUTLINE,
  FILLED,
  COLORED,
  SERVICES,
  SERVICES_PULSE_PRO,
  STATUS,
  GENERAL,
  USER,
  ARROWS,
  ALERTS_FEEDBACK,
  FILES,
  SOCIAL,
  MY_INCOME_AND_BENEFITS,
  MY_DAY,
  EDUCATION,
  HEALTH,
  GOALS,
  GRATITUDE,
  REACTIONS,
  OTHER,
} from "./constants";

export type AllType = typeof ALL;
export type ColoredType = typeof COLORED;
export type NoneType = typeof NONE;

export type IconType = typeof OUTLINE | typeof FILLED | typeof COLORED;

export type IconCategory =
  | typeof SERVICES
  | typeof SERVICES_PULSE_PRO
  | typeof STATUS
  | typeof GENERAL
  | typeof GOALS
  | typeof GRATITUDE
  | typeof USER
  | typeof ARROWS
  | typeof ALERTS_FEEDBACK
  | typeof FILES
  | typeof SOCIAL
  | typeof MY_INCOME_AND_BENEFITS
  | typeof MY_DAY
  | typeof EDUCATION
  | typeof OTHER
  | typeof REACTIONS
  | typeof HEALTH;

export interface IconsValue {
  type: IconType;
  category: IconCategory;
  Svg: FC<SVGProps<SVGSVGElement>>;
}

export const sections: IconCategory[] = [
  GRATITUDE, // благодарности
  OTHER, // другие
  HEALTH, // здоровье
  SOCIAL, // медиа
  MY_DAY, // мой день
  MY_INCOME_AND_BENEFITS, // мой доход и льготы
  GENERAL, // общее
  USER, // пользователь
  EDUCATION, // развитие
  REACTIONS, // реакции
  SERVICES, // сервисы
  SERVICES_PULSE_PRO, // сервисы ПульсПро
  STATUS, // статус
  ALERTS_FEEDBACK, // уведомления
  ARROWS, // управление
  FILES, // файлы
  GOALS, // цели
];

```
