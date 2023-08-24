import { Status } from '../../constants';
import { makeFakeActiveOffer } from '../../utils/mocks/active-offer';
import { makeFakeOffers } from '../../utils/mocks/offers';
import {
  fetchActiveOfferAction,
  fetchOffersAction,
  fetchOffersNearbyAction,
} from '../api-actions';
import { offersData } from './offers-data';

vi.mock('../root-reducer', () => ({ rootReducer: vi.fn() }));

describe('OffersData Slice', () => {
  const OFFER_ID = 'adg65b45ek3j3l45fd6d';
  const mockOffers = makeFakeOffers();
  const mockActiveOffer = makeFakeActiveOffer();

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      activeOffer: null,
      offersNearby: [],
      statusAll: Status.Success,
      statusOffer: Status.Loading,
    };
    const result = offersData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offers: [],
      activeOffer: null,
      offersNearby: [],
      statusAll: Status.Idle,
      statusOffer: Status.Idle,
    };

    const result = offersData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('At the time of sending the request, the status of the offers should be changed to "Status.Loading" witch fetchOffersAction.pending', () => {
    const expectedState = {
      offers: [],
      activeOffer: null,
      offersNearby: [],
      statusAll: Status.Loading,
      statusOffer: Status.Idle,
    };

    const result = offersData.reducer(undefined, fetchOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('After an unsuccessful request, the status of the offers should be changed to "Status.Success" and upload an array with offers witch fetchOffersAction.fulfilled', () => {
    const expectedState = {
      offers: mockOffers,
      activeOffer: null,
      offersNearby: [],
      statusAll: Status.Success,
      statusOffer: Status.Idle,
    };

    const result = offersData.reducer(
      undefined,
      fetchOffersAction.fulfilled(mockOffers, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('After an unsuccessful request, the status of the offers should be changed to "Status.Error" witch fetchOffersAction.rejected', () => {
    const expectedState = {
      offers: [],
      activeOffer: null,
      offersNearby: [],
      statusAll: Status.Error,
      statusOffer: Status.Idle,
    };

    const result = offersData.reducer(undefined, fetchOffersAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('At the time of sending the request, the status of the offers should be changed to "Status.Loading" witch fetchActiveOfferAction.pending', () => {
    const expectedState = {
      offers: [],
      activeOffer: null,
      offersNearby: [],
      statusAll: Status.Idle,
      statusOffer: Status.Loading,
    };

    const result = offersData.reducer(
      undefined,
      fetchActiveOfferAction.pending
    );

    expect(result).toEqual(expectedState);
  });

  it('After an unsuccessful request, the status of the active offer should be changed to "Status.Success" and upload an array with active offer witch fetchActiveOfferAction.fulfilled', () => {
    const expectedState = {
      offers: [],
      activeOffer: mockActiveOffer,
      offersNearby: [],
      statusAll: Status.Idle,
      statusOffer: Status.Success,
    };

    const result = offersData.reducer(
      undefined,
      fetchActiveOfferAction.fulfilled(mockActiveOffer, '', OFFER_ID)
    );

    expect(result).toEqual(expectedState);
  });

  it('After an unsuccessful request, the status of the offers should be changed to "Status.Error" witch fetchActiveOfferAction.rejected', () => {
    const expectedState = {
      offers: [],
      activeOffer: null,
      offersNearby: [],
      statusAll: Status.Idle,
      statusOffer: Status.Error,
    };

    const result = offersData.reducer(
      undefined,
      fetchActiveOfferAction.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('After a successful request, upload an array with offers nearby witch fetchOffersNearbyAction.fulfilled', () => {
    const expectedState = {
      offers: [],
      activeOffer: null,
      offersNearby: [mockActiveOffer],
      statusAll: Status.Idle,
      statusOffer: Status.Idle,
    };

    const result = offersData.reducer(
      undefined,
      fetchOffersNearbyAction.fulfilled([mockActiveOffer], '', OFFER_ID)
    );

    expect(result).toEqual(expectedState);
  });
});
