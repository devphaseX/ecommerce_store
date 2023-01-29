import { useMemo } from 'react';
import { ProductShowCase } from '../';
import products from '../../../assets/data/products';

const Trend = () => {
  const sortedProduct = useMemo(
    () => products.sort((a, b) => b.avgRating - a.avgRating),
    [products, products.length]
  );

  return (
    <ProductShowCase
      title="Trending products"
      type="all"
      products={sortedProduct.slice(0, 4)}
    />
  );
};

export { Trend };
