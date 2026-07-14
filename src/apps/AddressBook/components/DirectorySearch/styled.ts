import styled from 'styled-components';
import { Input } from '@pulse/ui/components/Input';

export const SearchRow = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  gap: 16,
  alignItems: 'center',
}));

export const SearchField = styled.div(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  minHeight: 56,
}));

export const SearchInput = styled(Input)(({ theme }) => ({
  minHeight: 56,
  padding: `0 ${32 + 16}px 0 ${24}px`,
  borderRadius: 20,
  border: `1px solid ${theme.tokens.current.core.border.gentle}`,
  boxShadow: 'none',
  fontSize: 17,
}));

export const SearchAdornment = styled.span(({ theme }) => ({
  position: 'absolute',
  right: 24,
  color: theme.tokens.current.core.text.secondary,
  pointerEvents: 'none',
}));

export const FavoriteButton = styled.button<{ $active: boolean }>(({ theme, $active }) => ({
  minHeight: 56,
  padding: `0 ${24}px`,
  borderRadius: 20,
  border: `1px solid ${
    $active ? theme.tokens.current.core.accent.primary : theme.tokens.current.core.border.gentle
  }`,
  background: $active
    ? theme.tokens.current.core.accent.secondary
    : theme.tokens.current.core.layer['01'],
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  color: $active
    ? theme.tokens.current.core.accent.primary
    : theme.tokens.current.core.text.primary,
  cursor: 'pointer',
}));

export const FavoriteIcon = styled.span<{ $active: boolean }>(({ theme, $active }) => ({
  width: 36,
  height: 36,
  borderRadius: 999,
  border: `1px solid ${
    $active ? theme.tokens.current.core.accent.primary : theme.tokens.current.core.border.gentle
  }`,
  background: $active
    ? theme.tokens.current.core.layer['01']
    : theme.tokens.current.core.layer['02'],
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

