import { ProductShowCase } from '../';
import { useGetTrendingProductQuery } from '../../../store/api/product';

const Trend = () => {
  const { data, isLoading } = useGetTrendingProductQuery({ limit: 20 });

  return (
    <ProductShowCase
      title="Trending products"
      type="all"
      products={data}
      isLoading={isLoading}
    />
  );
};

export { Trend };
