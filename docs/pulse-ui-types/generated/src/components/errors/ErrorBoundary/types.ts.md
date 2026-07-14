<!-- Этот файл сгенерирован командой npm run docs:pulse-types. Не редактировать вручную. -->
# `src/components/errors/ErrorBoundary/types.ts`

- Источник: [types-context.part-1.md](<../../../../../raw/types-context.part-1.md>)
- Раздел: `components`
- Компонент/группа: `errors`
- Строк кода: 16
- Экспорты: `ErrorBoundaryProps`, `ErrorBoundaryState`, `FallbackProps`
- Импорты: `react`
- Зависимости внутри выгрузки: нет разрешённых зависимостей внутри выгрузки

## Исходная типизация

```typescript
import { ErrorInfo, ComponentType } from "react";

export interface FallbackProps {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

export interface ErrorBoundaryProps {
  onReset?: (...args: Array<unknown>) => void;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  fallbackComponent?: ComponentType<FallbackProps>;
}

export interface ErrorBoundaryState {
  error: Error | null;
}

```
