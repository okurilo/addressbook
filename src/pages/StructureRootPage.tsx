import type { RouteComponentProps } from '@reach/router';
import { PagePlaceholder } from '../components/PagePlaceholder';

export const StructureRootPage = (_props: RouteComponentProps): JSX.Element => (
  <PagePlaceholder
    title="Кадровая структура"
    description="Временный placeholder корневого экрана структуры для итерации 1."
  />
);
