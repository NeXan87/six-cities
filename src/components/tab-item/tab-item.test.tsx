import { render, screen } from '@testing-library/react';
import { CITIES, NameSpace, SortName } from '../../constants';
import { witchHistory, witchStore } from '../../utils/mocks/mock-component';
import TabItem from './tab-item';

describe('Component: TabItem', () => {
  it('should render correctly', () => {
    const city = 'Amsterdam';

    const prepareComponent = witchHistory(<TabItem city={city} />);
    const { witchStoreComponent } = witchStore(prepareComponent, {
      [NameSpace.App]: {
        activeCity: CITIES[0],
        activeSort: SortName.Popular,
        error: null,
      },
    });

    render(witchStoreComponent);

    expect(screen.getByText(city)).toBeInTheDocument();
  });
});
