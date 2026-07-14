<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/utils/fullscreen/types.ts`

- Источник: [types-context.part-2.md](<../../../../raw/types-context.part-2.md>)
- Раздел: `utils`
- Компонент/группа: `utils`
- Строк кода: 14
- Экспорты: `DivElementWithPrefixes`, `DocumentWithPrefixes`
- Импорты: нет импортов
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
export interface DocumentWithPrefixes {
  fullscreenElement: Element | null;
  msFullscreenElement?: Element;
  webkitFullscreenElement?: Element;
  msExitFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
  webkitFullscreenEnabled?: boolean;
  msFullscreenEnabled?: boolean;
}

export interface DivElementWithPrefixes {
  msRequestFullscreen?: () => void;
  webkitRequestFullscreen?: () => void;
}

```
