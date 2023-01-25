import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="nav">
      <div className="nav__wrapper">
        <div className="logo">
          <img />
          <div></div>
        </div>
        <nav className="main-link-navigation">
          <ul className="menu">
            <li className="nav__item">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/product">Shop</NavLink>
            </li>
            <li className="nav__item">
              <NavLink to="/chart">Chart</NavLink>
            </li>
          </ul>
        </nav>

        <div className="nav__action"></div>
      </div>
    </header>
  );
};

export { Header };
