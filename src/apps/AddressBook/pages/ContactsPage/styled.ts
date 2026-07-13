import styled from 'styled-components';

export const Section = styled.section(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
}));

export const SectionHeader = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 16,
}));

export const Surface = styled.div(({ theme }) => ({
  background: theme.tokens.current.layer['01'],
  borderRadius: 20,
}));

export const CenteredState = styled.div(({ theme }) => ({
  minHeight: 220,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 32,
}));

