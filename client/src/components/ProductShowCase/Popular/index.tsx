import { ProductShowCase } from '..';
import products from '../../../assets/data/products';

const PopularProducts = () => (
  <ProductShowCase
    title="Popular Products"
    type="all"
    products={products.filter(
      ({ category }) => category.toLowerCase() === 'watch'
    )}
  />
);

export { PopularProducts };
