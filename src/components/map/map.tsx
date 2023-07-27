import { useRef, useEffect } from 'react';
import leaflet, { Icon, Marker } from 'leaflet';
import useMap from '../../hooks/useMap';
import { Card, City } from '../../types';
import 'leaflet/dist/leaflet.css';
import { URL_PIN_CURRENT, URL_PIN_DEFAULT, ICON_SIZE } from '../../constants';

type MapProps = {
  className: string;
  cityInfo: City;
  offers: Card[];
  height: string;
  cardId?: string;
};

const defaultCustomPin: Icon = new Icon({
  iconUrl: URL_PIN_DEFAULT,
  iconSize: ICON_SIZE,
  iconAnchor: ICON_SIZE,
});

const currentCustomPin: Icon = new Icon({
  iconUrl: URL_PIN_CURRENT,
  iconSize: ICON_SIZE,
  iconAnchor: ICON_SIZE,
});

function Map({
  className,
  cityInfo,
  offers,
  height,
  cardId,
}: MapProps): JSX.Element {
  const mapRef = useRef<HTMLElement | null>(null);
  const map = useMap(mapRef, cityInfo);

  useEffect(() => {
    const markers = leaflet.layerGroup();

    if (map) {
      offers.forEach((offer) => {
        const { latitude, longitude } = offer.location;

        const marker = new Marker({
          lat: latitude,
          lng: longitude,
        });

        marker.setIcon(
          cardId && cardId === offer.id ? currentCustomPin : defaultCustomPin
        );
        marker.addTo(markers);
      });

      markers.addTo(map);
    }
    return () => {
      markers.clearLayers();
    };
  }, [cardId, map, offers]);

  return (
    <section
      className={`${className}__map map`}
      ref={mapRef}
      style={{ height: height }}
    />
  );
}

export default Map;
