import { Actions, ActionButton } from './styled';
import { TableStar } from '../../../../Components/Adressbook/common/ConnectCell/TableStar/TableStar';

import { TableMail } from '../../../../Components/Adressbook/common/ConnectCell/Mail';
import { TablePhone } from '../../../../Components/Adressbook/common/ConnectCell/Phone';

type ExtraAction = {
  label: string;
  onClick: () => void;
};

type EmployeeActionsProps = {
  personId: string;
  phone: string | null;
  email: string;
  isFavorite: boolean;
  isFavoriteLoading?: boolean;
  groupId?: string;
  onToggleFavorite: () => void;
  emailLabel?: string;
  extraActions?: ExtraAction[];
};

export const EmployeeActions = ({
  personId,
  phone,
  email,
  isFavorite,
  isFavoriteLoading,
  groupId,
  extraActions = [],
}: EmployeeActionsProps): JSX.Element => {
  return (
    <Actions
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {phone && <TablePhone phone={phone} pid={personId} />}
      {email && (
        <a href={`mailto:${email}`}>
          <TableMail />
        </a>
      )}

      <TableStar
        pid={personId}
        isFavorite={isFavorite}
        isFavoriteLoading={isFavoriteLoading}
        groupId={groupId}
      />
      {extraActions.map((action) => (
        <ActionButton
          key={action.label}
          type="button"
          onClick={() => {
            action.onClick();
          }}
        >
          {action.label}
        </ActionButton>
      ))}
    </Actions>
  );
};
