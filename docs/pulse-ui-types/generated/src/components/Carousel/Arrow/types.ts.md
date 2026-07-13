<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Carousel/Arrow/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `Carousel`
- Строк кода: 7
- Экспорты: `ArrowDirection`, `ArrowProps`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export type ArrowDirection = "left" | "right";

export interface ArrowProps {
  $direction?: ArrowDirection;
  $hidden?: boolean;
  "data-testid"?: string;
}

```
