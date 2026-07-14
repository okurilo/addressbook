<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Backdrop/types.ts`

- Источник: [types-context.part-1.md](<../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Backdrop`
- Строк кода: 17
- Экспорты: `BackdropProps`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export interface BackdropProps {
  /**
   * Выравнивание модального окна по вертикали (только для мобильных экранов)
   * @default false
   */
  $stickToBottomMobile?: boolean;
  /**
   * Если `true`, то скролл будет автоматически заблокирован при первом рендере компонента
   * @default true
   */
  lockScroll?: boolean;
  /**
   * Если `true`, то бэкдроп будет прозрачным
   * @default false
   */
  transparent?: boolean;
}

```
