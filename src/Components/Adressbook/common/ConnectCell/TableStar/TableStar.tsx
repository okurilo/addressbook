import { useState, useRef, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { toast } from 'react-toastify';
import { Content, Text } from '@pulse/ui/components/Snackbar';
import { Success } from '@pulse/ui/components/Snackbar/icons';
import { SkeletonRect } from '@pulse/ui/components/Skeleton';
import { IconButton } from '../../IconButton';
import { ReactComponent as StarIcon } from '../../../Profile/assets/star.svg';

interface ITableStarProps {
  pid: string;
  isFavorite?: boolean;
  isFavoriteLoading?: boolean;
  groupId?: string;
}

export const TableStar = ({ pid, isFavorite, isFavoriteLoading, groupId }: ITableStarProps) => {
  const { tokens } = useTheme();
  const [isAdded, setIsAdded] = useState(isFavorite);
  const [isLoading, setIsLoading] = useState(false);
  const starBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isFavorite !== undefined) {
      setIsAdded(isFavorite);
    }
  }, [isFavorite]);

  const handleStarClick = async () => {
    if (isLoading || !groupId) return;
    setIsLoading(true);

    const prevAdded = isAdded;
    setIsAdded(!isAdded); // optimistic toggle

    try {
      if (isAdded) {
        await fetch('/api-web/srv/v7/people/custom-groups/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            groupId,
            name: 'Избранное',
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
        await fetch('/api-web/srv/v7/people/custom-groups/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            groupId,
            name: 'Избранное',
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
      setIsAdded(prevAdded); // revert on error
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div style={{ position: 'relative' }}>
      {isFavoriteLoading ? (
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
