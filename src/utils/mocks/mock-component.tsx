import { HelmetProvider } from 'react-helmet-async';
import { MemoryHistory, createMemoryHistory } from 'history';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { Action } from '@reduxjs/toolkit';
import HistoryRouter from '../../components/history-route/history-route';
import { State } from '../../types';
import { AppThunkDispatch } from './app-thunk-dispatch';

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
}));

vi.mock('../../store/root-reducer', () => ({ rootReducer: vi.fn() }));

vi.mock('axios', async (importActual) => {
  const actual = await importActual<typeof import('axios')>();

  const mockAxios = {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        get: mocks.get,
        post: mocks.post,
      })),
    },
  };

  return mockAxios;
});

export function witchHistory(
  component: JSX.Element,
  history?: MemoryHistory
): JSX.Element {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>{component}</HelmetProvider>
    </HistoryRouter>
  );
}

type ComponentWitchMockStore = {
  witchStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export function witchStore(
  component: JSX.Element,
  initialState: Partial<State> = {}
): ComponentWitchMockStore {
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    witchStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  };
}
