import { useEffect, useState } from 'react';
import { Text } from '@pulse/ui/components/Text';
import { Button } from '@pulse/ui/components/Button';
import { useTheme } from 'styled-components';
import { getMockScenario, setMockScenario } from '../../api/mockScenario';
import type { MockScenario } from '../../mocks/types';
import { Panel, ButtonList } from './styled';

const panelScenarios: MockScenario[] = ['success', 'loading', 'empty', 'error'];

export const MockScenarioPanel = (): JSX.Element => {
  const theme = useTheme();
  const [scenario, setScenario] = useState<MockScenario>(getMockScenario);

  useEffect(() => {
    const handleScenarioChange = (event: Event): void => {
      const customEvent = event as CustomEvent<MockScenario>;
      setScenario(customEvent.detail);
    };

    window.addEventListener('mock-scenario-change', handleScenarioChange);

    return () => {
      window.removeEventListener('mock-scenario-change', handleScenarioChange);
    };
  }, []);

  return (
    <Panel>
      <Text variant="body1Semibold">Mock-сценарии</Text>
      <Text variant="body2ParagraphRegular" color={theme.tokens.current.core.text.secondary}>
        Служебная панель отделена от продуктовой области и управляет ответами локального fetch-mock.
      </Text>
      <ButtonList>
        {panelScenarios.map((item) => (
          <Button
            key={item}
            $type={scenario === item ? 'primary' : 'secondary'}
            onClick={() => {
              setMockScenario(item);
            }}
          >
            {item}
          </Button>
        ))}
      </ButtonList>
    </Panel>
  );
};

