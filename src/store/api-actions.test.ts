import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from 'redux';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { AuthData, State } from '../types';
import {
  AppThunkDispatch,
  extractActionsTypes,
} from '../utils/mocks/app-thunk-dispatch';
import {
  changeFavoriteStatusAction,
  checkAuthAction,
  fetchActiveOfferAction,
  fetchFavoritesAction,
  fetchOffersAction,
  fetchOffersNearbyAction,
  fetchReviewsAction,
  loginAction,
  logoutAction,
} from './api-actions';
import { APIRoute } from '../constants';
import axios from 'axios';
import { makeFakeOffers } from '../utils/mocks/offers';
import { redirectToRoute } from './action';
import * as tokenStorage from '../services/token';
import { makeFakeActiveOffer } from '../utils/mocks/active-offer';
import { makeFakeReviews } from '../utils/mocks/reviews';

const mocks = vi.hoisted(() => ({
  get: vi.fn(),
  post: vi.fn(),
}));

vi.mock('./root-reducer', () => ({ rootReducer: vi.fn() }));

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

describe('Async actions', () => {
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ OFFERS: { offers: [] } });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled", when server response 200', async () => {
      const mockOffers = makeFakeOffers();
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchOffersAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchActiveOfferAction', () => {
    it('should dispatch "fetchActiveOfferAction.pending", "fetchActiveOfferAction.fulfilled", when server response 200', async () => {
      const offerId = 'dsf569ghr6g4';
      const mockOffer = makeFakeActiveOffer({ id: offerId });
      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/${offerId}`)
        .reply(200, mockOffer);

      await store.dispatch(fetchActiveOfferAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchActiveOfferActionFulfilled = emittedActions.at(
        1
      ) as ReturnType<typeof fetchActiveOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchActiveOfferAction.pending.type,
        fetchActiveOfferAction.fulfilled.type,
      ]);

      expect(fetchActiveOfferActionFulfilled.payload).toEqual(mockOffer);
    });

    it('should dispatch "fetchActiveOfferAction.pending", "fetchActiveOfferAction.rejected" when server response 404', async () => {
      const offerId = 'dsf569ghr6g4';
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${offerId}`).reply(404, null);

      await store.dispatch(fetchActiveOfferAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchActiveOfferAction.pending.type,
        fetchActiveOfferAction.rejected.type,
      ]);
    });
  });

  describe('fetchOffersNearbyAction', () => {
    it('should dispatch "fetchOffersNearbyAction.pending", "fetchOffersNearbyAction.fulfilled", when server response 200', async () => {
      const offerId = 'dsf569ghr6g4';
      const mockOffers = makeFakeOffers();
      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`)
        .reply(200, mockOffers);

      await store.dispatch(fetchOffersNearbyAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersNearbyActionFulfilled = emittedActions.at(
        1
      ) as ReturnType<typeof fetchOffersNearbyAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersNearbyAction.pending.type,
        fetchOffersNearbyAction.fulfilled.type,
      ]);

      expect(fetchOffersNearbyActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersNearbyAction.pending", "fetchOffersNearbyAction.rejected" when server response 404', async () => {
      const offerId = 'dsf569ghr6g4';
      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`)
        .reply(404, []);

      await store.dispatch(fetchOffersNearbyAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersNearbyAction.pending.type,
        fetchOffersNearbyAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.fulfilled", when server response 200', async () => {
      const mockOffers = makeFakeOffers();
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockOffers);

      await store.dispatch(fetchFavoritesAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoritesActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchFavoritesAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);

      expect(fetchFavoritesActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.rejected" when server response 404', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(404, []);

      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type,
      ]);
    });
  });

  describe('changeFavoriteStatusAction', () => {
    it('should dispatch "changeFavoriteStatusAction.pending", "changeFavoriteStatusAction.fulfilled", when server response 200', async () => {
      const offerId = 'dsf569ghr6g4';
      const status = 1;
      const mockOffer = makeFakeActiveOffer({ id: offerId, isFavorite: false });
      mockAxiosAdapter
        .onPost(`${APIRoute.Favorite}/${offerId}/${status}`)
        .reply(200, mockOffer);

      await store.dispatch(changeFavoriteStatusAction({ offerId, status }));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const changeFavoriteStatusActionFulfilled = emittedActions.at(
        1
      ) as ReturnType<typeof changeFavoriteStatusAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatusAction.fulfilled.type,
      ]);

      expect(changeFavoriteStatusActionFulfilled.payload).toEqual(mockOffer);
    });

    it('should dispatch "changeFavoriteStatusAction.pending", "changeFavoriteStatusAction.rejected" when server response 404', async () => {
      const offerId = 'dsf569ghr6g4';
      const status = 1;
      mockAxiosAdapter
        .onPost(`${APIRoute.Favorite}/${offerId}/${status}`)
        .reply(404, []);

      await store.dispatch(changeFavoriteStatusAction({ offerId, status }));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteStatusAction.pending.type,
        changeFavoriteStatusAction.rejected.type,
      ]);
    });
  });

  describe('fetchReviewsAction', () => {
    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.fulfilled", when server response 200', async () => {
      const offerId = 'dsf569ghr6g4';
      const mockReviews = makeFakeReviews();
      mockAxiosAdapter
        .onGet(`${APIRoute.Reviews}/${offerId}`)
        .reply(200, mockReviews);

      await store.dispatch(fetchReviewsAction(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchReviewsAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload).toEqual(mockReviews);
    });

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected" when server response 404', async () => {
      const offerId = 'dsf569ghr6g4';
      mockAxiosAdapter.onGet(`${APIRoute.Reviews}/${offerId}`).reply(404, []);

      await store.dispatch(fetchReviewsAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthActions', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        fetchFavoritesAction.pending.type,
        checkAuthAction.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute", "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });
});
