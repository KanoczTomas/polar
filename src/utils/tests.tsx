import React from 'react';
import { render } from '@testing-library/react';
import { StoreProvider } from 'easy-peasy';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { createReduxStore } from 'store';
import { Network, Status } from 'types';

export const getNetwork = (networkId?: number, name?: string): Network => ({
  id: networkId || 0,
  name: name || 'my-test',
  status: Status.Stopped,
  nodes: {
    bitcoin: [
      {
        id: 1,
        name: 'bitcoind-1',
        type: 'bitcoin',
        implementation: 'bitcoind',
        status: Status.Stopped,
      },
    ],
    lightning: [
      {
        id: 1,
        name: 'lnd-1',
        type: 'lightning',
        implementation: 'LND',
        status: Status.Stopped,
        backendName: 'bitcoind1',
      },
      {
        id: 2,
        name: 'lnd-2',
        type: 'lightning',
        implementation: 'LND',
        status: Status.Stopped,
        backendName: 'bitcoind1',
      },
    ],
  },
});

/**
 * Renders a component inside of the redux provider for state and
 * routing contexts. Some imported components such as <Link /> will
 * not render without this
 * @param cmp the component under test to render
 * @param options configuration options for providers
 */
export const renderWithProviders = (
  component: React.ReactElement,
  config?: { route?: string; initialState?: any },
) => {
  const options = config || {};
  // use in-memory history for testing
  const history = createMemoryHistory();
  if (options.route) {
    history.push(options.route);
  }
  // provide initial state if any
  const initialState = options.initialState || {};
  // injections allow you to mock the dependencies of actions in the store
  const injections = {
    networkManager: {
      create: jest.fn(),
    },
  };
  const store = createReduxStore({ initialState, injections, history });
  const result = render(
    <StoreProvider store={store}>
      <Provider store={store as any}>
        <ConnectedRouter history={history}>{component}</ConnectedRouter>
      </Provider>
    </StoreProvider>,
  );

  return { ...result, history, injections };
};