<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/LayoutGrid/Layout/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `LayoutGrid`
- Строк кода: 11
- Экспорты: `AsideProps`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export interface AsideProps {
  /**
   * Если `true`, то дополнительный контент будет расположен внизу,
   * под основным контентом (только для mobile и tablet)
   */
  $stickToBottom?: boolean;
  /**
   * Ширина дополнительного контента (только для desktop)
   */
  $width?: number;
}

```
