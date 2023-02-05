import { ProductShowCase } from '../';
import products from '../../../assets/data/products';
import { useGetBestSalesProductQuery } from '../../../store/api/product';

const BestSales = () => {
  const { data, isLoading } = useGetBestSalesProductQuery({ limit: 10 });
  return (
    <ProductShowCase
      title="Best Sales"
      type="all"
      isLoading={isLoading}
      products={data}
    />
  );
};

export { BestSales };
