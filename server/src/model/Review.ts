import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  rating: { type: Number, require: true },
  feedback: String,
  productId: { type: String, require: true },
});

export const Review = mongoose.model('Product', ReviewSchema);
