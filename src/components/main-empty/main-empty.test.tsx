import { render, screen } from '@testing-library/react';
import { MainEmpty } from './main-empty';
import { witchHistory, witchStore } from '../../utils/mocks/mock-component';
import { CITIES, NameSpace, SortName } from '../../constants';

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    const textStatus = 'No places to stay available';
    const textDescription =
      'We could not find any property available at the moment in Paris';

    const prepareComponent = witchHistory(<MainEmpty />);
    const { witchStoreComponent } = witchStore(prepareComponent, {
      [NameSpace.App]: {
        activeCity: CITIES[0],
        activeSort: SortName.Popular,
        error: null,
      },
    });

    render(witchStoreComponent);

    expect(screen.getByText(textStatus)).toBeInTheDocument();
    expect(screen.getByText(textDescription)).toBeInTheDocument();
  });
});
