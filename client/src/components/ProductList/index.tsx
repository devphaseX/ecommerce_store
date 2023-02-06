import { ShowCaseProductData } from '../../store/api/product';
import { ProductCard } from './ProductCard';

type ProductListProps = {
  productsData: Array<ShowCaseProductData>;
};
const ProductList = ({ productsData }: ProductListProps) => {
  return (
    <>
      {productsData.map((productData) => (
        <ProductCard key={productData._id} data={productData} />
      ))}
    </>
  );
};

export { ProductList };
