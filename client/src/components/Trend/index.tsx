import './style.css';
import { ProductList } from '../ProductList';

const Trend = () => {
  return (
    <section className="trend">
      <div className="trend__container section-width">
        <div className="trend__row">
          <div>
            <h2 className="section__title trend-title">Trending Products</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Trend };
