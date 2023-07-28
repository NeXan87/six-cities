import { useState } from 'react';
import PlaceCard from '../../components/place-card/place-card';
import Map from '../../components/map/map';
import { Card, CityNames } from '../../types';

type CitiesProps = {
  activeCity: CityNames;
  offers: Card[];
};

function Cities({ activeCity, offers }: CitiesProps): JSX.Element {
  const [cardId, setCardId] = useState<string>('');

  const offersLocation = offers.map((offer) => ({
    id: offer.id,
    location: offer.location,
  }));

  const handlePlaceCardMouseOver = (id: string) => setCardId(id);
  const handlePlaceCardMouseLeave = () => setCardId('');

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offers.length} places to stay in {activeCity}
        </b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex={0}>
            Popular
            <svg className="places__sorting-arrow" width={7} height={4}>
              <use xlinkHref="#icon-arrow-select" />
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex={0}>
              Popular
            </li>
            <li className="places__option" tabIndex={0}>
              Price: low to high
            </li>
            <li className="places__option" tabIndex={0}>
              Price: high to low
            </li>
            <li className="places__option" tabIndex={0}>
              Top rated first
            </li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          {offers.map((offer) => (
            <PlaceCard
              card={offer}
              className="cities"
              key={offer.id}
              handlePlaceCardMouseOver={handlePlaceCardMouseOver}
              handlePlaceCardMouseLeave={handlePlaceCardMouseLeave}
            />
          ))}
        </div>
      </section>
      <div className="cities__right-section">
        <Map
          className="cities"
          height="100%"
          cityInfo={offers[0].city}
          offers={offersLocation}
          cardId={cardId}
        />
      </div>
    </div>
  );
}

export default Cities;
