import styled from 'styled-components';

export const Page = styled.section({
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
});

export const Card = styled.div(({ theme }) => ({
  background: theme.tokens.current.core.layer['01'],
  borderRadius: 20,
  display: 'grid',
  gridTemplateColumns: '1fr 280px',
  gap: 24,
  padding: 32,
}));

export const Hero = styled.div({
  display: 'flex',
  gap: 32,
  alignItems: 'flex-start',
});

export const StatusLine = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  marginTop: 8,
});

export const DefinitionList = styled.dl({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: `${16}px ${24}px`,
  margin: 0,
});

export const DefinitionTerm = styled.dt(({ theme }) => ({
  color: theme.tokens.current.core.text.secondary,
}));

export const DefinitionDescription = styled.dd(({ theme }) => ({
  color: theme.tokens.current.core.text.primary,
  fontWeight: 600,
  margin: 0,
}));

export const CenteredState = styled.div(({ theme }) => ({
  minHeight: 280,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.tokens.current.core.layer['01'],
  borderRadius: 20,
  padding: 32,
}));
