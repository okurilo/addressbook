import type { RouteComponentProps } from '@reach/router';
import { PagePlaceholder } from '../components/PagePlaceholder';

export const FavoritesPage = (_props: RouteComponentProps): JSX.Element => (
  <PagePlaceholder
    title="Избранное"
    description="Временный placeholder контента для итерации 1. Кнопка в header уже ведёт на этот маршрут."
  />
);
