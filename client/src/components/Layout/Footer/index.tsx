import './style.css';
import logo from '../../../assets/images/eco-logo.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  const copyRightYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="section-width">
        <div className="footer__row">
          <div className="footer__col">
            <div className="logo">
              <div>
                <h1 className="logo__brand-name">Multimart</h1>
                <p>since 1995</p>
              </div>
            </div>
            <p className="footer__brand-text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Veritatis quasi obcaecati quae dicta .
            </p>
          </div>
          <div className="footer__col">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Top Categories</h4>
              <nav className="footer__nav">
                <ul className="footer__links">
                  <li className="footer__link-item">
                    <Link to="#">Mobile Phones</Link>
                  </li>
                  <li className="footer__link-item">
                    <Link to="#">Modern Sofa</Link>
                  </li>
                  <li className="footer__link-item">
                    <Link to="#">Arm Chair</Link>
                  </li>
                  <li className="footer__link-item">
                    <Link to="#">Smart Watches</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="footer__col">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Useful Links</h4>
              <nav className="footer__nav">
                <ul className="footer__links">
                  <li className="footer__link-item">
                    <Link to="/product">Shop</Link>
                  </li>
                  <li className="footer__link-item">
                    <Link to="/cart">Cart</Link>
                  </li>
                  <li className="footer__link-item">
                    <Link to="/login">Login</Link>
                  </li>
                  <li className="footer__link-item">
                    <Link to="#">Privacy Policy</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="footer__col">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Contact</h4>
              <nav className="footer__nav">
                <ul className="footer__links footer__contacts">
                  <li className="footer__link-item">
                    <Link to="#" className="footer__icon-wrapper">
                      <span className="footer__contact-icon">
                        <i className="ri-map-pin-line"></i>
                      </span>
                      <p>123, ZindaBazar, Sylhet, Banglesh</p>
                    </Link>
                  </li>
                  <li className="footer__link-item">
                    <Link to="#" className="footer__icon-wrapper">
                      <span className="footer__contact-icon">
                        <i className="ri-phone-line"></i>
                      </span>
                      <p>+2348017318831</p>
                    </Link>
                  </li>
                  <li className="footer__link-item">
                    <Link to="#" className="footer__icon-wrapper">
                      <span className="footer__contact-icon">
                        <i className="ri-mail-line"></i>
                      </span>
                      <p>example123@gmail.com</p>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
        <div>
          <p className="footer__copyright">
            Copyright &copy;{copyRightYear} developed by Lawal Ayomide, All
            right reversed.
          </p>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
