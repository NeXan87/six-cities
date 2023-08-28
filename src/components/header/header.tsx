import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../constants';
import HeaderNav from '../header-nav/header-nav';

type HeaderProps = {
  isUserNav?: boolean;
};

function Header({ isUserNav = false }: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <NavLink
              to={AppRoute.Root}
              className={({ isActive }) =>
                cn('header__logo-link', {
                  'header__logo-link--active': isActive,
                })
              }
            >
              <img
                className="header__logo"
                src="/img/logo.svg"
                alt="6 cities logo"
                width={81}
                height={41}
              />
            </NavLink>
          </div>
          {isUserNav && <HeaderNav />}
        </div>
      </div>
    </header>
  );
}

export default Header;
