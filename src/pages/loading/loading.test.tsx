import { render, screen } from '@testing-library/react';
import Loading from './loading';

describe('Component: Loading', () => {
  it('should render correctly', () => {
    const loadingTestId = 'loading';

    render(<Loading />);

    const loadingContainer = screen.getByTestId(loadingTestId);

    expect(loadingContainer).toBeInTheDocument();
  });
});
