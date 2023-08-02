import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from '../../pages/loading/loading';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import NotFound from '../../pages/not-found/not-found';
import { AppRoute } from '../../constants';
import PrivateRoute from '../private-route/private-route';
import { AuthorizationStatus } from '../../constants';
import { Card, OfferCard, Review } from '../../types';
import { useAppSelector } from '../../hooks';

type AppProps = {
  cardList: Card[];
  offerList: OfferCard[];
  reviewList: Review[];
  favoriteList: Card[];
};

function App({
  cardList,
  offerList,
  reviewList,
  favoriteList,
}: AppProps): JSX.Element {
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus
  );
  const isOffersLoading = useAppSelector((state) => state.isOffersLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersLoading) {
    return <Loading />;
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route index element={<Main />} />
          <Route
            path={AppRoute.Login}
            element={<Login authorizationStatus={authorizationStatus} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <Favorites favoriteList={favoriteList} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={
              <Offer
                cardList={cardList}
                offerList={offerList}
                reviewList={reviewList}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
