import { Clock } from '../Clock';
import './style.css';
import counterImg from '../../assets/images/counter-timer-img.png';
import { Link } from 'react-router-dom';

const Offer = () => {
  return (
    <section className="offer">
      <div className="section-width">
        <div className="offer__row">
          <div className="offer__col">
            <div className="clock_top-content">
              <h3 className="top-content__title">Limited Offer</h3>
              <h4 className="top-content__type">Quality Armchair</h4>

              <Link to="/product" className="store__button-link">
                <button className="buy_button store__button">Visit shop</button>
              </Link>
            </div>
            <Clock />
          </div>
          <div className="offer__col offer_col-image">
            <div>
              <img src={counterImg} alt="counter image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Offer };
