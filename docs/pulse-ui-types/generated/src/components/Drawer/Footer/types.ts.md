<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Drawer/Footer/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Drawer`
- Строк кода: 20
- Экспорты: `FooterProps`
- Импорты: `../types`
- Зависимости внутри выгрузки: [`src/components/Drawer/types.ts`](<../types.ts.md>)

## Исходная типизация

```typescript
import type { DrawerButtonProps } from "../types";

export interface FooterProps {
  /**
   * Основные параметры кнопки, включая надпись, действие при нажатии и дополнительные атрибуты.
   */
  buttonPrimary?: DrawerButtonProps;
  /**
   * Основные параметры кнопки, включая надпись, действие при нажатии и дополнительные атрибуты.
   */
  buttonSecondary?: DrawerButtonProps;
  /**
   * Основные параметры кнопки, включая надпись, действие при нажатии и дополнительные атрибуты.
   */
  buttonExtra?: DrawerButtonProps;
  /**
   * Отображается ли borderTop над кнопками.
   */
  isBorderVisible?: boolean;
}

```
