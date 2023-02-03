import { z } from 'zod';
import { Category, type ProductFormData } from './Product.model';

type ProductFormSchema = ExtensibleZodShape<ProductFormData>;

const schema = z.object<ProductFormSchema>({
  productName: z.string(),
  // category: z.nativeEnum(Category),
  shortDesc: z.string(),
});

export { schema as productFormSchema };
