import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { installFetchMock } from './mocks/installFetchMock';

installFetchMock();

const container = document.getElementById('root');

if (container === null) {
  throw new Error('Root container was not found');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
