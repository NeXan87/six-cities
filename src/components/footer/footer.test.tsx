import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { witchHistory } from '../../utils/mocks/mock-component';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const footerContainerTestId = 'footer-container';
    const logoAltText = '6 cities logo';
    const prepareComponent = witchHistory(<Footer />);

    render(prepareComponent);

    const footerContainer = screen.getByTestId(footerContainerTestId);

    expect(footerContainer).toBeInTheDocument();
    expect(screen.getByAltText(logoAltText)).toBeInTheDocument();
  });
});
