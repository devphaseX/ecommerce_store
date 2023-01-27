import './style.css';
import { ProductList } from '../ProductList';
import products from '../../assets/data/products';

const Trend = () => {
  return (
    <section className="trend">
      <div className="trend__container section-width">
        <div className="trend__row">
          <div>
            <h2 className="section__title trend-title">Trending Products</h2>
          </div>
          <div className="trend__products">
            <ProductList productsData={products} />
          </div>
        </div>
      </div>
    </section>
  );
};

export { Trend };
