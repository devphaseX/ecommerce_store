import type { Express } from 'express';
import { productRoute } from '../routes/product';
import { imageRoute } from '../routes/image';

function mountRoutes(app: Express) {
  app.use(imageRoute);
  app.use(productRoute);
}

export { mountRoutes };
