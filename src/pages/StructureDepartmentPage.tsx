import type { RouteComponentProps } from '@reach/router';
import { PagePlaceholder } from '../components/PagePlaceholder';

type StructureDepartmentPageProps = RouteComponentProps & {
  departmentId?: string;
};

export const StructureDepartmentPage = ({
  departmentId,
}: StructureDepartmentPageProps): JSX.Element => (
  <PagePlaceholder
    title="Подразделение"
    description={`Временный placeholder дочернего маршрута структуры. Текущий departmentId: ${departmentId ?? 'не указан'}.`}
  />
);
