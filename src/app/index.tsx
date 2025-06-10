import React from 'react';

import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import ErrorBoundary from '@/shared/components/common/ErrorBoundary';
import { PrimaryLoader } from '@/shared/components/common/Loader';

import { setupAxios } from '../shared/utils/functions';
import Routing from './routes';

import ThemeProvider from '@/styles/config';

setupAxios();

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 0
    }
  }
});

const App = () => (
  <ThemeProvider>
    <ErrorBoundary>
      <QueryClientProvider client={client}>
        <React.Suspense fallback={<PrimaryLoader />}>
          <BrowserRouter>
            <Routing />
          </BrowserRouter>
        </React.Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  </ThemeProvider>
);

export default App;
