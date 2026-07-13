<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/Videoplayer/SettingsMenu/types.ts`

- Источник: [types-context.part-2.md](<../../../../../raw/types-context.part-2.md>)
- Раздел: `components`
- Компонент/группа: `Videoplayer`
- Строк кода: 13
- Экспорты: `ItemMenuProps`, `SettingsItemProps`, `SettingsMenuProps`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export interface SettingsItemProps {
  $selected?: boolean;
}

export interface SettingsMenuProps {
  $mainMenu?: boolean;
}

export interface ItemMenuProps {
  onClick: () => void;
  title: string;
  value?: string | number;
}

```
