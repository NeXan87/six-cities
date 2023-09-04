import { render, screen } from '@testing-library/react';
import { witchHistory, witchStore } from '../../utils/mocks/mock-component';
import NotFound from './not-found';
import { AuthorizationStatus, NameSpace, Status } from '../../constants';

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    const textTitle = 'Ошибка 404. Страница не найдена!';
    const textDescription =
      'Страница не найдена! Попробуйте воспользоваться поиском.';
    const textLink = 'Перейти на главную страницу.';

    const prepareComponent = witchHistory(<NotFound />);
    const { witchStoreComponent } = witchStore(prepareComponent, {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        user: null,
        statusLogin: Status.Idle,
      },
    });

    render(witchStoreComponent);

    expect(screen.getByText(textTitle)).toBeInTheDocument();
    expect(screen.getByText(textDescription)).toBeInTheDocument();
    expect(screen.getByText(textLink)).toBeInTheDocument();
  });
});
