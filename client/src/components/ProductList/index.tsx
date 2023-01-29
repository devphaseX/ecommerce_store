import { ProductCard } from './ProductCard';
import type { ProductData } from './type';

type ProductListProps = {
  productsData: Array<ProductData>;
};
const ProductList = ({ productsData }: ProductListProps) => {
  return (
    <>
      {productsData.map((productData) => (
        <ProductCard key={productData.id} data={productData} />
      ))}
    </>
  );
};

export { ProductList };
