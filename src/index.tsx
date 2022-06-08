import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import Loader from './components/Loader/Loader';

import './index.css';

const App = lazy(() => import('./App'));
const container = document.getElementById('root');
const root = createRoot(container as HTMLDivElement);

root.render(
  <StrictMode>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </StrictMode>
);
