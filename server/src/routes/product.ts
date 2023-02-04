import express from 'express';
import {
  createProduct,
  getAllProduct,
  getSupportProductCatory,
} from '../controller/product';
import { upload } from '../controller/file/upload';

const productRoute = express.Router();

productRoute
  .route('/product')
  .get(getAllProduct)
  .post(upload, createProduct as any);

productRoute.get('/product/category', getSupportProductCatory);

export { productRoute };
