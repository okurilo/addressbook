import { Text } from '@pulse/ui/components/Text';
import { useTheme } from 'styled-components';
import { Wrapper } from './styled';

type PagePlaceholderProps = {
  title: string;
  description: string;
};

export const PagePlaceholder = ({ title, description }: PagePlaceholderProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Wrapper>
      <Text variant="h4Semibold">{title}</Text>
      <Text variant="body2Regular" color={theme.tokens.current.text.secondary}>
        {description}
      </Text>
    </Wrapper>
  );
};
