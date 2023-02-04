import { z } from 'zod';
import { category, type ProductFormData } from './Product.model';

type ProductFormSchema = ExtensibleZodShape<ProductFormData>;

const schema = z.object<ProductFormSchema>({
  productName: z.string().min(2),
  category: z.nativeEnum(category),
  shortDesc: z.string(),
});

export { schema as productFormSchema };
