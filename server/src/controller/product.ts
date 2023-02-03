import { RequestHandler } from 'express';
import {
  Product,
  ProductData,
  ProductFormData,
  productFormSchema,
} from '../model';
import { prepareError } from '../util/error';

import { imageUpload } from './file/upload';

type GetAllProductResponse = ServerResponse<
  Array<ProductData>,
  any,
  ACTIVE_ON_DEV
>;
type GetAllProductHandler = RequestHandler<null, GetAllProductResponse>;

const getAllProduct: GetAllProductHandler = async (_, res) => {
  try {
    const products = await Product.find().select('-reviews');
    return res.status(200).json({ status: 'success', data: products });
  } catch (e) {
    return res.status(401).json({
      status: 'failed',
      error: prepareError(
        'something went wrong while trying to fetch products',
        e
      ),
    });
  }
};

type CreateProductResponse = ServerResponse<
  DataWithId<ProductData>,
  any,
  ACTIVE_ON_DEV
>;

type CreateProductHandler = RequestHandler<
  any,
  CreateProductResponse,
  ProductFormData
>;

const createProduct: CreateProductHandler = async (req, res) => {
  try {
    const image = await imageUpload(req);
    const productData = await productFormSchema.parse(req.body);

    const product = await Product.create({
      ...productData,
      imgUrl: `${req.headers.host}/${image.name}`,
    });
    return res.status(201).json({ status: 'success', data: product.toJSON() });
  } catch (e) {
    return res.status(400).json({
      status: 'failed',
      error: prepareError(
        'something went wrong while creating a new product',
        e
      ),
    });
  }
};

export { getAllProduct, createProduct };
