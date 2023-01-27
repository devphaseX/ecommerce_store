import { ProductCard } from './ProductCard';
import type { InferUserReview, ProductData } from './type';

type UserReview = InferUserReview<ProductData>;
type ProductListProps = {
  productsData: Array<ProductData>;
};
const ProductList = ({ productsData }: ProductListProps) => {
  return (
    <>
      {productsData
        .sort(
          (a, b) =>
            getReviewAggregate(b.reviews) - getReviewAggregate(a.reviews)
        )
        .slice(0, 4)
        .map((productData) => (
          <ProductCard key={productData.id} data={productData} />
        ))}
    </>
  );
};

const getReviewAggregate = (reviews: Array<UserReview>) =>
  reviews.reduce((curTotalRate, { rating }) => curTotalRate + rating, 0);

export { ProductList };
