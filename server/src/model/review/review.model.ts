import mongoose, { InferSchemaType } from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    rating: { type: Number, require: true },
    text: { type: String, require: true },
    productId: { type: String, require: true },
  },
  { timestamps: true }
);

const Review = mongoose.model('review', ReviewSchema);

type ReviewDoc = InferSchemaType<typeof ReviewSchema>;
type ReviewFormData = Omit<ReviewDoc, SharedServerGenField>;
export type { ReviewDoc, ReviewFormData };
export { Review };
