import express from 'express';
import {
  createProduct,
  getAllProduct,
  getProduct,
  getSupportProductCatory,
} from '../controller/product';
import { upload } from '../controller/file/upload';

const productRoute = express.Router();

productRoute
  .route('/product')
  .get(getAllProduct)
  .post(upload, createProduct as any);

productRoute.get('/product/category', getSupportProductCatory);
productRoute.get('/product/:productName/:productId', getProduct);

export { productRoute };
