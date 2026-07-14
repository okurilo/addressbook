import { EmployeeActions } from '../../../../apps/AddressBook/components/EmployeeActions';

type ConnectCellProps = {
  employeeId: string;
  phone: string | null;
  email: string;
  isFavorite: boolean;
  onToggleFavorite: (employeeId: string) => void;
};

export const ConnectCell = ({
  employeeId,
  phone,
  email,
  isFavorite,
  onToggleFavorite,
}: ConnectCellProps): JSX.Element => (
  <EmployeeActions
    email={email}
    isFavorite={isFavorite}
    onToggleFavorite={() => {
      onToggleFavorite(employeeId);
    }}
    phone={phone}
  />
);
