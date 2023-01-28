import './style.css';
import { ProductList } from '../ProductList';
import products from '../../assets/data/products';
import { ProductData } from '../ProductList/type';

interface ProductShowCaseProps {
  title: string;
  products: Array<ProductData>;
}

const ProductShowCase = ({ title, products }: ProductShowCaseProps) => {
  return (
    <section className="showcase section-block-padding">
      <div className="showcase__container section-width">
        <div className="showcase__row">
          <div>
            <h2 className="section__title showcase-title">{title}</h2>
          </div>
          <div className="showcase__products">
            <ProductList productsData={products} />
          </div>
        </div>
      </div>
    </section>
  );
};

export { ProductShowCase };
