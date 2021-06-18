import {
  AnyAction, Dispatch, Middleware
} from 'redux';
import configureStore, { MockStoreCreator } from 'redux-mock-store';
import {
  decrement, increment
} from '../../../redux/reducers/counter.slice';
import {
  fireEvent, render, screen
} from '@testing-library/react';
import {
  QueryClient, QueryClientProvider
} from 'react-query';
import Example from '.';
import { Provider } from 'react-redux';
import { RepositoryIocProvider } from '../../../services/configuration/context';

const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] = [];
const mockStore: MockStoreCreator<unknown, {}> = configureStore(middlewares);

describe('Test in example component', () => {
  const initialState = { counter: { value: 0 } };

  const queryClient = new QueryClient();

  const store = mockStore(initialState);

  store.dispatch = jest.fn();

  test('Should render the component', () => {
    const { asFragment } = render(
      <RepositoryIocProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Example />
          </QueryClientProvider>
        </Provider>
      </RepositoryIocProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('should dispatch increment on click on increment button', () => {
    render(
      <RepositoryIocProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Example />
          </QueryClientProvider>
        </Provider>
      </RepositoryIocProvider>
    );

    const incrementButton = screen.getByText(/Increment/);

    fireEvent.click(incrementButton);

    expect(store.dispatch).toHaveBeenCalledWith(increment());
  });
  test('should dispatch decrement on click on decrement button', () => {
    render(
      <RepositoryIocProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <Example />
          </QueryClientProvider>
        </Provider>
      </RepositoryIocProvider>
    );

    const decrementButton = screen.getByText(/Decrement/);

    fireEvent.click(decrementButton);

    expect(store.dispatch).toHaveBeenCalledWith(decrement());
  });
});
