import { FC, useEffect, useState } from 'react';
import { Table } from '../common/Table';
import { MainContainerStyled } from './styled';
import { useGetPeople } from './hooks/useGetPeople';
import { useGetColumns } from './hooks/useGetColumns';
import { Profile } from '../Profile/Profile';
import type { AdressbookPerson } from '../types';

// Сделать отдельный виджетом
type PeopleProps = {
  people: AdressbookPerson[];
  isLoading?: boolean;
  initialExpandedPersonId?: string | null;
  favoritePersonIds?: string[];
  onToggleFavorite?: (personId: string) => void;
};

export const People: FC<PeopleProps> = ({
  people: sourcePeople,
  isLoading = false,
  initialExpandedPersonId,
  favoritePersonIds = [],
  onToggleFavorite,
}) => {
  const { people } = useGetPeople(sourcePeople, isLoading);
  const [expandedPersonId, setExpandedPersonId] = useState<string | null | undefined>(
    initialExpandedPersonId
  );

  useEffect(() => {
    setExpandedPersonId(initialExpandedPersonId);
  }, [initialExpandedPersonId]);

  const columns = useGetColumns();

  if (!isLoading)
    return (
      <MainContainerStyled>
        <Table
          columns={columns}
          data={people || []}
          getRowKey={(u) => u.pid}
          renderExpanded={(u) => (
            <Profile
              person={u._profile}
              pid={u.pid}
              isFavorite={favoritePersonIds.includes(u.pid)}
              onToggleFavorite={onToggleFavorite}
            />
          )}
          expandedRowKey={expandedPersonId}
          onRowClick={(_person, personId) => {
            setExpandedPersonId((currentPersonId) =>
              currentPersonId === personId ? null : String(personId)
            );
          }}
        />
      </MainContainerStyled>
    );
  return null;
};
