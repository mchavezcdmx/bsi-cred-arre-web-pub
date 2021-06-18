import '../styles/styles.scss';
import {
  QueryClient,
  QueryClientProvider
} from 'react-query';
import type { AppProps } from 'next/app';
import { Hydrate } from 'react-query/hydration';
import { Provider } from 'react-redux';
import { RepositoryIocProvider } from '../services/configuration/context';
import store from '../redux/store';

const queryClient = new QueryClient();

function MyApp({
  Component, pageProps
}: AppProps) {
  return (
    <Provider store={store}>
      <RepositoryIocProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </RepositoryIocProvider>
    </Provider>

  );
}
export default MyApp;
