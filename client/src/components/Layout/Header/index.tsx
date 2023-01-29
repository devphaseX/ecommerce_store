import { useRef } from 'react';
import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../../assets/images/eco-logo.png';
import user_profile from '../../../assets/images/user-icon.png';
import './style.css';
import { pathLink } from '../../../router/route';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useState } from 'react';

const Header = () => {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const matchMobileScreen = useMediaQuery('(max-width: 768px)');
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    if (!headerRef.current) return;
    const headerEl = headerRef.current;

    const abort = new AbortController();
    function stickNavToViewPort() {
      const headerHeight = headerEl.getBoundingClientRect().height;
      const shouldAttachNavToViewPort =
        document.body.scrollTop > headerHeight ||
        document.documentElement.scrollTop > headerHeight;
      headerEl.classList.toggle('sticky--header', shouldAttachNavToViewPort);
    }

    document.addEventListener('scroll', stickNavToViewPort, {
      signal: abort.signal,
    });

    return () => {
      abort.abort();
    };
  }, []);

  useEffect(() => {
    if (!matchMobileScreen && toggleMenu) setToggleMenu(false);
  }, [matchMobileScreen]);

  useEffect(() => {
    document.documentElement.toggleAttribute('toggle-menu', toggleMenu);
  }, [toggleMenu]);

  return (
    <>
      <div className="backdrop" onClick={() => setToggleMenu(false)}></div>
      <header className="nav" ref={headerRef}>
        <div className="nav__wrapper section-width">
          <div className="logo">
            <Link to="/" className="logo__wrapper">
              <img src={logo} alt="brand logo" />
              <div>
                <h1>Multimart</h1>
                <p>since 1995</p>
              </div>
            </Link>
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
            <span onClick={() => setToggleMenu(matchMobileScreen)}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>

        <aside className="mobile-nav-panel">
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
        </aside>
      </header>
    </>
  );
};

export { Header };
