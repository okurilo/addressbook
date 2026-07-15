import { FC } from 'react';
import { Table } from '../common/Table';
import { MainContainerStyled } from './styled';
import { useGetPeople } from './hooks/useGetPeople';
import { useGetColumns } from './hooks/useGetColumns';
import { Profile } from '../Profile/Profile';

// Сделать отдельный виджетом
export const People: FC = () => {
  const { people, isLoading } = useGetPeople();

  const columns = useGetColumns();

  if (!isLoading)
    return (
      <MainContainerStyled>
        <Table
          columns={columns}
          data={people || []}
          getRowKey={(u) => u.pid}
          renderExpanded={(u) => <Profile person={u._profile} pid={u.pid} />}
          onRowClick={(u) => {}}
        />
      </MainContainerStyled>
    );
  return null;
};

