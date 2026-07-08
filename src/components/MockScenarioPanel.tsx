import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Text } from '@pulse/ui/Text';
import { Button } from '@pulse/ui/Button';
import { getMockScenario, setMockScenario } from '../api/mockScenario';
import type { MockScenario } from '../mocks/types';

const panelScenarios: MockScenario[] = ['success', 'loading', 'empty', 'error'];

const Panel = styled('aside')(({ theme }) => ({
  width: 240,
  padding: theme.spacing.lg,
  borderRight: `1px solid ${theme.colors.border}`,
  background: theme.colors.surfaceMuted,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.md,
}));

const ButtonList = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.sm,
}));

export const MockScenarioPanel = (): JSX.Element => {
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
      <Text size="lg" weight="semibold">
        Mock-сценарии
      </Text>
      <Text tone="secondary">
        Служебная панель отделена от продуктовой области и управляет ответами локального fetch-mock.
      </Text>
      <ButtonList>
        {panelScenarios.map((item) => (
          <Button
            key={item}
            appearance={scenario === item ? 'primary' : 'secondary'}
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
