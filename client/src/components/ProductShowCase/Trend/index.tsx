import { ProductShowCase } from '../';
import { useGetTrendingProductQuery } from '../../../store/api/product';

const Trend = () => {
  const { data, isLoading } = useGetTrendingProductQuery({ limit: 4 });
  return (
    <ProductShowCase
      title="Trending products"
      type="all"
      isLoading={isLoading}
      products={data}
    />
  );
};

export { Trend };
