import mongoose, { InferSchemaType } from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, require: true },
    imgUrl: { type: String, require: true },
    category: { type: String, require: true },
    shortDesc: { type: String, require: true },
    reviews: { type: [String] },
    avgRating: Number,
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
type ProductData = InferSchemaType<typeof Product.schema>;
type ProductFormData = Omit<
  ProductData,
  ServerGenField | 'reviews' | 'avgRating'
>;

enum Category {}

export { Category, Product };
export type { ProductData, ProductFormData };
