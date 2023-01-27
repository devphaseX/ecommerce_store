import { NavLink } from 'react-router-dom';
import logo from '../../../assets/images/eco-logo.png';
import user_profile from '../../../assets/images/user-icon.png';
import './style.css';
import { pathLink } from '../../../router/route';

const Header = () => {
  return (
    <header className="nav">
      <div className="nav__wrapper">
        <div className="logo">
          <img src={logo} alt="brand logo" />
          <div>
            <h1>Multimart</h1>
            <p>since 1995</p>
          </div>
        </div>
        <nav className="main-link-navigation">
          <ul className="menu">
            {[pathLink.home, pathLink.product, pathLink.cart].map(
              ({ name, path }, i) => (
                <li className="nav__item" key={`${i}{${name}`}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive ? 'nav__active' : ''
                    }
                  >
                    {name}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="nav__icons">
          <div className="action-wrapper">
            <span className="fav__icon">
              <i className="ri-heart-line"></i>
              <span className="badge">1</span>
            </span>
          </div>
          <div className="action-wrapper">
            <span className="cart__icon">
              <i className="ri-shopping-bag-line"></i>
              <span className="badge">10</span>
            </span>
          </div>

          <div className="action-wrapper">
            <span
              onMouseDown={({ target }) =>
                (target as HTMLSpanElement).classList.toggle(
                  'cart__icon--image',
                  true
                )
              }
              onMouseUp={({ target }) =>
                (target as HTMLSpanElement).classList.toggle(
                  'cart__icon--image',
                  false
                )
              }
            >
              <img src={user_profile} alt="profile image" />
            </span>
          </div>
        </div>

        <div className="mobile__menu">
          <i className="ri-menu-line"></i>
          <span></span>
        </div>
      </div>
    </header>
  );
};

export { Header };
