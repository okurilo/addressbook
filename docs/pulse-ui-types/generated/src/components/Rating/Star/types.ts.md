<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Rating/Star/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Rating`
- Строк кода: 8
- Экспорты: `StarProps`, `StarStyledProps`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export interface StarProps extends Record<string, unknown> {
  $isActive?: boolean;
  onChange: () => void;
}

export interface StarStyledProps {
  $isActive: StarProps["$isActive"];
}

```
