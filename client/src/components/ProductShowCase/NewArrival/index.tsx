import { ProductShowCase } from '..';
import { useGetNewArrivalProductQuery } from '../../../store/api/product';

const NewArrival = () => {
  const { data, isLoading } = useGetNewArrivalProductQuery({ limit: 12 });
  return (
    <ProductShowCase
      isLoading={isLoading}
      title="New Arrivals"
      type="all"
      products={data}
    />
  );
};

export { NewArrival };
