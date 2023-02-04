import mongoose, { InferSchemaType } from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    productName: { type: String, require: true },
    price: { type: Number, require: true },
    imgUrl: { type: String, require: true },
    category: { type: String, require: true },
    shortDesc: { type: String, require: true },
    avgRating: Number,
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
type ProductData = InferSchemaType<typeof Product.schema>;
type ProductServerGenField =
  | SharedServerGenField
  | 'reviews'
  | 'avgRating'
  | 'imgUrl';
type ProductFormData = Omit<ProductData, ProductServerGenField>;

type CategoryEntry = 'wireless' | 'mobile' | 'chair' | 'watch' | 'sofa';
type ProductCategory = { readonly [K in CategoryEntry]: K };

const category: ProductCategory = {
  wireless: 'wireless',
  chair: 'chair',
  mobile: 'mobile',
  watch: 'watch',
  sofa: 'sofa',
};

export { Product, category };
export type { ProductData, ProductFormData, ProductCategory, CategoryEntry };
