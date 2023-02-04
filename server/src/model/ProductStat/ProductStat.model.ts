import mongoose, { InferSchemaType } from 'mongoose';
import { ProductData } from '../product';

const ProductStatSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  yealySalesTotal: Number,
  yearlyTotalSoldUnits: Number,
  year: Number,
  monthlyData: [
    {
      month: String,
      totalSales: Number,
      totalUnits: Number,
    },
  ],
  dailyData: {
    day: String,
    totalSales: Number,
    totalUnits: Number,
  },
});

const ProductStat = mongoose.model('productStat', ProductStatSchema);
type ProductStatDoc = InferSchemaType<typeof ProductStatSchema>;
type PopulatedProductStatDoc = ProductStatDoc & {
  product: ProductData;
};
export type { ProductStatDoc, PopulatedProductStatDoc };
export { ProductStat };
