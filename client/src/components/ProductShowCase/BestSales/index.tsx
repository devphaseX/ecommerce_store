import { useMemo } from 'react';
import { ProductShowCase } from '../';
import products from '../../../assets/data/products';

const BestSales = () => {
  return <ProductShowCase title="Best Sales" products={products.slice(-8)} />;
};

export { BestSales };
