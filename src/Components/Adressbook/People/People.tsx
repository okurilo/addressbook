import { FC } from 'react';
import { Table } from '../common/Table';
import { MainContainerStyled } from './styled';
import { useGetPeople } from './hooks/useGetPeople';
import { useGetColumns } from './hooks/useGetColumns';
import { Profile } from '../Profile/Profile';
import { useAdressbookContext } from '../provider';

// Сделать отдельный виджетом
export const People: FC = () => {
  const { people, isLoading } = useGetPeople();
  const { onPersonOpen } = useAdressbookContext();

  const columns = useGetColumns();

  if (!isLoading)
    return (
      <MainContainerStyled>
        <Table
          columns={columns}
          data={people || []}
          getRowKey={(u) => u.pid}
          renderExpanded={(u) => <Profile person={u._profile} pid={u.pid} />}
          onRowClick={(person) => onPersonOpen?.(person.pid)}
        />
      </MainContainerStyled>
    );
  return null;
};
