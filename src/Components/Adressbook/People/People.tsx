import { useEffect, useState } from 'react';
import { Table } from '../common/Table';
import { MainContainerStyled } from './styled';
import { useGetPeople } from './hooks/useGetPeople';
import { useGetColumns } from './hooks/useGetColumns';
import { Profile } from '../Profile/Profile';
import type { AdressbookPerson } from '../types';

type PeopleProps = {
  people: AdressbookPerson[];
  isLoading?: boolean;
  initialExpandedPersonId?: string | null;
  favoritePersonIds?: string[];
  onToggleFavorite?: (personId: string) => void;
};

export const People = ({
  people: sourcePeople,
  isLoading = false,
  initialExpandedPersonId,
  favoritePersonIds = [],
  onToggleFavorite,
}: PeopleProps): JSX.Element | null => {
  const { people } = useGetPeople(sourcePeople, isLoading, favoritePersonIds);
  const [expandedPersonId, setExpandedPersonId] = useState<string | null | undefined>(
    initialExpandedPersonId
  );

  useEffect(() => {
    setExpandedPersonId(initialExpandedPersonId);
  }, [initialExpandedPersonId]);

  const columns = useGetColumns(onToggleFavorite);

  if (isLoading) {
    return null;
  }

  return (
    <MainContainerStyled>
      <Table
        columns={columns}
        data={people}
        getRowKey={(person) => person.pid}
        renderExpanded={(person) => <Profile person={person._profile} pid={person.pid} />}
        expandedRowKey={expandedPersonId}
        onRowClick={(_person, personId) => {
          setExpandedPersonId((currentPersonId) =>
            currentPersonId === personId ? null : String(personId)
          );
        }}
      />
    </MainContainerStyled>
  );
};
