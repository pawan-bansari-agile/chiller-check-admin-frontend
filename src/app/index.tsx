import React, { useEffect } from 'react';

import { BrowserRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { notification } from 'antd';

import ErrorBoundary from '@/shared/components/common/ErrorBoundary';
import { PrimaryLoader } from '@/shared/components/common/Loader';
import { APP_ENV, ENVIRONMENT } from '@/shared/constants';
import { onMessageListener } from '@/shared/constants/firebase';

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

const App = () => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (APP_ENV !== ENVIRONMENT['LOCAL']) {
      onMessageListener(api);
    }
  }, [api]);

  return (
    <>
      {contextHolder}
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
    </>
  );
};

export default App;
