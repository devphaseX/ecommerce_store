import { ProductShowCase } from '..';
import { useGetPopularProductQuery } from '../../../store/api/product';

const PopularProducts = () => {
  const { data, isLoading } = useGetPopularProductQuery({ limit: 4 });
  return (
    <ProductShowCase
      title="Popular Products"
      type="all"
      products={data}
      isLoading={isLoading}
    />
  );
};

export { PopularProducts };
