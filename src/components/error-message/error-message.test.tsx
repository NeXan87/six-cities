import { render, screen } from '@testing-library/react';
import { CITIES, NameSpace, SortName } from '../../constants';
import { witchStore } from '../../utils/mocks/mock-component';
import ErrorMessage from './error-message';

describe('Component: ErrorMessage', () => {
  it('should render correctly with an error', () => {
    const errorText = 'Error Message';

    const { witchStoreComponent } = witchStore(<ErrorMessage />, {
      [NameSpace.App]: {
        activeCity: CITIES[0],
        activeSort: SortName.Popular,
        error: errorText,
      },
    });

    render(witchStoreComponent);

    expect(screen.getByText(errorText)).toBeInTheDocument();
  });
});
