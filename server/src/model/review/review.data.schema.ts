import { z } from 'zod';
import { ReviewFormData } from './review.model';

type ReviewFormSchema = ExtensibleZodShape<ReviewFormData>;
const reviewFormSchema = z.object<ReviewFormSchema>({
  text: z.string(),
  rating: z.number({ coerce: true }).min(0).max(5),
});
export { reviewFormSchema };
