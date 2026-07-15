import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    min-height: 100%;
  }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.typography.body1Regular.fontFamily};
    background: ${({ theme }) => theme.tokens.current.core.background.default};
    color: ${({ theme }) => theme.tokens.current.core.text.primary};
  }

  button,
  input {
    font: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  [role='button']:focus-visible {
    outline: 2px solid ${({ theme }) => theme.tokens.current.core.accent.primary};
    outline-offset: 2px;
  }
`;

