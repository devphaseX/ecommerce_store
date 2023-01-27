type ProductData = typeof import('../../assets/data/products').default[number];

type InferUserReview<ProductData> = ProductData extends {
  reviews: Array<infer Review>;
}
  ? Review
  : never;
export type { ProductData, InferUserReview };
