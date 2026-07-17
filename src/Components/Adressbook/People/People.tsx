import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { Table } from '../common/Table';
import { MainContainerStyled } from './styled';
import { useGetPeople } from './hooks/useGetPeople';
import { useGetColumns } from './hooks/useGetColumns';
import { Profile } from '../Profile/Profile';
import { useAdressbookContext } from '../provider';

const FAVOURITE_GROUP_NAME = 'Избранное';

export const People: FC = () => {
  const { people, isLoading } = useGetPeople();

  const { setFavoritePersons, setFavoriteGroupId } = useAdressbookContext();

  const columns = useGetColumns();
  const [expandedRowKey, setExpandedRowKey] = useState<string | number | null>(null);

  // Fetch favorite group + members once
  useEffect(() => {
    let cancelled = false;

    const fetchFavorites = async () => {
      try {
        const res = await fetch('/api-web/srv/v7/people/teams', {
          headers: { Accept: 'application/json' },
        });
        const data = (await res.json()) as {
          data: Array<{ id: string; isCustom: boolean; type: string; name: string }>;
        };
        const groups = data?.data ?? [];
        const group = groups.find(
          (g) => g.isCustom && g.type === 'группа' && g.name === FAVOURITE_GROUP_NAME
        );

        if (!group) {
          if (!cancelled) setFavoritePersons(new Set());
          if (!cancelled) setFavoriteGroupId(undefined);
          return;
        }

        const groupId = group.id;

        const membersRes = await fetch(
          `/api-web/srv/v7/people/teams/${group.id}?page=0&size=60&isCustom=true`,
          { headers: { Accept: 'application/json' } }
        );
        const membersData = (await membersRes.json()) as {
          data: { content: Array<{ personId: string }> };
        };
        const members = membersData?.data?.content ?? [];

        if (!cancelled) {
          setFavoritePersons(new Set(members.map((m) => m.personId)));
          setFavoriteGroupId(groupId);
        }
      } catch (e) {
        console.error('fetchFavorites error', e);
        if (!cancelled) setFavoritePersons(new Set());
      }
    };

    fetchFavorites();
    return () => {
      cancelled = true;
    };
  }, [setFavoritePersons]);

  if (!isLoading)
    return (
      <MainContainerStyled>
        <Table
          columns={columns}
          data={people || []}
          getRowKey={(u) => u.pid}
          expandedRowKey={expandedRowKey}
          onRowClick={(person) => setExpandedRowKey(person.pid)}
          renderExpanded={(u) => (
            <Profile person={u._profile} pid={u.pid} onClose={() => setExpandedRowKey(null)} />
          )}
        />
      </MainContainerStyled>
    );
  return null;
};
