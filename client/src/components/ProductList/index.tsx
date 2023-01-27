import { useMemo } from 'react';
import { ProductCard } from './ProductCard';
import type { ProductData } from './type';

type ProductListProps = {
  productsData: Array<ProductData>;
};
const ProductList = ({ productsData }: ProductListProps) => {
  const sortedProduct = useMemo(
    () => productsData.sort((a, b) => b.avgRating - a.avgRating),
    [productsData, productsData.length]
  );

  return (
    <>
      {sortedProduct.slice(0, 4).map((productData) => (
        <ProductCard key={productData.id} data={productData} />
      ))}
    </>
  );
};

export { ProductList };
