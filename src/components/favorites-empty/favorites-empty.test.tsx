import { render, screen } from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('Component: FavoritesEmpty', () => {
  it('should render correctly', () => {
    const favoritesTitle = 'Favorites (empty)';
    const favoritesStatus = 'Nothing yet saved.';
    const favoritesDescription =
      'Save properties to narrow down search or plan your future trips.';

    render(<FavoritesEmpty />);

    expect(screen.getByText(favoritesTitle)).toBeInTheDocument();
    expect(screen.getByText(favoritesStatus)).toBeInTheDocument();
    expect(screen.getByText(favoritesDescription)).toBeInTheDocument();
  });
});
