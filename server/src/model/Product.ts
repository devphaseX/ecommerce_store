import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  productName: { type: String, require: true },
  imgUrl: { type: String, require: true },
  category: { type: String, require: true },
  shortDesc: { type: String, require: true },
  reviews: { type: [String] },
});

export const Product = mongoose.model('Product', ProductSchema);
