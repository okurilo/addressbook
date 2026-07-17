import { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from 'styled-components';
import { toast } from 'react-toastify';
import { Content, Text } from '@pulse/ui/components/Snackbar';
import { Success } from '@pulse/ui/components/Snackbar/icons';
import { SkeletonRect } from '@pulse/ui/components/Skeleton';
import { IconButton } from '../../../common/IconButton';
import { ReactComponent as StarIcon } from '../../assets/star.svg';
import type { ICustomGroup } from './types';

const FAVOURITE_GROUP_NAME = 'Избранное';

interface IStarProps {
  pid: string;
}

interface IFavouriteGroup extends ICustomGroup {
  name: 'Избранное';
}

export const Star = ({ pid }: IStarProps) => {
  const { tokens } = useTheme();
  const [, setFavouriteGroup] = useState<IFavouriteGroup | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const starBtnRef = useRef<HTMLButtonElement>(null);

  const checkMembership = useCallback(
    async (groupId: string): Promise<boolean> => {
      try {
        const res = await fetch(
          `/api-web/srv/v7/people/teams/${groupId}?page=0&size=60&isCustom=true`,
          { headers: { Accept: 'application/json' } }
        );
        const data = (await res.json()) as { data: { content: Array<{ personId: string }> } };
        const members = data?.data?.content ?? [];
        return members.some((member) => member.personId === pid);
      } catch (err) {
        console.error('checkMembership error', err);
        return false;
      }
    },
    [pid]
  );

  const ensureFavouriteGroup = useCallback(async (): Promise<IFavouriteGroup | null> => {
    try {
      const res = await fetch('/api-web/srv/v7/people/teams', {
        headers: { Accept: 'application/json' },
      });
      const data = (await res.json()) as { data: ICustomGroup[] };
      const groups = data?.data ?? [];
      const existing = groups.find(
        (g) => g.isCustom && g.type === 'группа' && g.name === FAVOURITE_GROUP_NAME
      ) as IFavouriteGroup | undefined;

      if (existing) {
        setFavouriteGroup(existing);
        // Check membership via list endpoint
        const isUserInGroup = await checkMembership(existing.id);
        setIsAdded(isUserInGroup);
        return existing;
      }

      // Create "Избранное" group
      const createRes = await fetch('/api-web/srv/v7/people/custom-groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: FAVOURITE_GROUP_NAME, persons: [] }),
      });
      const created = (await createRes.json()) as IFavouriteGroup;
      setFavouriteGroup(created);
      return created;
    } catch (err) {
      console.error('ensureFavouriteGroup error', err);
      return null;
    }
  }, [checkMembership]);

  const handleStarClick = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const group = await ensureFavouriteGroup();
      if (!group) {
        setIsLoading(false);
        return;
      }

      if (isAdded) {
        // Remove from "Избранное"
        await fetch('/api-web/srv/v7/people/custom-groups/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            groupId: group.id,
            name: group.name,
            personsToDelete: [pid],
          }),
        });
        setIsAdded(false);
        toast(
          <Content compact>
            <Text>Удалено из группы «Избранное»</Text>
          </Content>,
          { icon: <Success />, closeOnClick: true }
        );
      } else {
        // Add to "Избранное"
        await fetch('/api-web/srv/v7/people/custom-groups/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            groupId: group.id,
            name: group.name,
            personsToAdd: [pid],
          }),
        });
        setIsAdded(true);
        toast(
          <Content compact>
            <Text>Добавлено в группу «Избранное»</Text>
          </Content>,
          { icon: <Success />, closeOnClick: true }
        );
      }
    } catch (err) {
      console.error('handleStarClick error', err);
    } finally {
      setIsLoading(false);
    }
  }, [isAdded, pid, ensureFavouriteGroup, isLoading]);

  // Fetch "Избранное" group on mount to check membership
  useEffect(() => {
    ensureFavouriteGroup().finally(() => {
      setIsInitialLoading(false);
    });
  }, [ensureFavouriteGroup]);

  return (
    <div style={{ position: 'relative' }}>
      {isInitialLoading || isLoading ? (
        <SkeletonRect width={36} height={36} />
      ) : (
        <IconButton
          ref={starBtnRef}
          color={
            isAdded
              ? tokens.current.colors.yellow.solid['60']
              : tokens.current.colors.grey.solid['60']
          }
          onClick={handleStarClick}
        >
          <StarIcon />
        </IconButton>
      )}
    </div>
  );
};
