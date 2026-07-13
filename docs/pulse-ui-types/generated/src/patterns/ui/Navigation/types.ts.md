<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/patterns/ui/Navigation/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `patterns`
- Компонент/группа: `patterns`
- Строк кода: 8
- Экспорты: `NavigationProps`, `Section`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export type Section = {
  id: string;
  title: string;
};

export type NavigationProps = {
  data: Section[];
};

```
