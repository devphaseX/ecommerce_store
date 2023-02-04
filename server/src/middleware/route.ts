import type { Express } from 'express';
import { productRoute } from '../routes/product';
import { imageRoute } from '../routes/image';
import { reviewRoute } from '../routes/review';

function mountRoutes(app: Express) {
  app.use(imageRoute);
  app.use(productRoute);
  app.use(reviewRoute);
}

export { mountRoutes };
