import { RequestHandler } from 'express';
import {
  category,
  CategoryEntry,
  PopulatedProductStatDoc,
  Product,
  ProductCategory,
  ProductData,
  ProductFormData,
  productFormSchema,
  ProductStat,
} from '../model';
import { prepareError } from '../util/error';

import { imageUpload } from './file/upload';
import { SortOrder } from 'mongoose';

interface ProductQuery extends ParsedQueryBase {
  stat?: 'trending' | 'best-sales' | 'newly';
  category?: CategoryEntry;
  review?: `${boolean}`;
  order?: `${Exclude<SortOrder, 'asc' | 'desc'>}`;
}

type GetAllProductHandler = RequestHandler<
  null,
  ServerResponse<Array<ProductData>, any, ACTIVE_ON_DEV>,
  null,
  ProductQuery
>;

function getProductByStats(
  field: string,
  order: SortOrder,
  query?: ProductQuery
) {
  let productQuery = getClientProductStatQuery(query);
  return productQuery
    .sort([[field, order]])
    .populate('product')
    .transform((stats) =>
      stats.map((stat) => (stat.toObject() as PopulatedProductStatDoc).product)
    ) as unknown as Promise<Array<ProductData>>;
}

function getClientProductStatQuery(query?: ProductQuery) {
  let productQuery = ProductStat.find();

  if (query) {
    if (query.limit) {
      productQuery = productQuery.limit(+query.limit);
    }

    if (query.review !== 'true') {
      productQuery = productQuery.select('-reviews');
    }

    if (
      query.order &&
      ['ascending', 'descending', '1', '-1'].includes(query.order)
    ) {
      productQuery = productQuery.sort([
        ['createdAt', query.order as SortOrder],
      ]);
    }
  }

  return productQuery;
}

function getClientProductQuery(query?: ProductQuery) {
  let productQuery = query?.category
    ? Product.find({ category: query.category })
    : Product.find();

  if (query) {
    if (query.limit) {
      productQuery = productQuery.limit(+query.limit);
    }

    if (query.review !== 'true') {
      productQuery = productQuery.select('-reviews');
    }

    if (
      query.order &&
      ['ascending', 'descending', '1', '-1'].includes(query.order)
    ) {
      productQuery = productQuery.sort([
        ['createdAt', query.order as SortOrder],
      ]);
    }
  }

  return productQuery;
}

const getTrendingProducts = (query?: ProductQuery) =>
  getProductByStats('yearlyTotalSoldUnits', 'descending', query);

const getBestSalesProducts = (query?: ProductQuery) =>
  getProductByStats('yealySalesTotal', 'descending', query);

const getAllProduct: GetAllProductHandler = async (req, res) => {
  try {
    const selectOption = req.query.stat;
    let products!: Array<ProductData>;

    switch (selectOption) {
      case 'trending': {
        products = await getTrendingProducts(req.query);
        break;
      }

      case 'best-sales': {
        products = await getBestSalesProducts(req.query);
        break;
      }

      default: {
        const query = { ...req.query };
        if (selectOption === 'newly') {
          req.query.order = 'descending';
        }

        let productQuery = getClientProductQuery(query);
        products = await productQuery;
      }
    }

    return res.status(200).json({ status: 'success', data: products });
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      status: 'failed',
      error: prepareError(
        'something went wrong while trying to fetch products',
        e
      ),
    });
  }
};

type CreateProductHandler = RequestHandler<
  any,
  ServerResponse<DataWithId<ProductData>, any, ACTIVE_ON_DEV>,
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

    await ProductStat.create({
      product: product._id,
      year: new Date().getFullYear(),
      yearlyTotalSoldUnits: 0,
      yealySalesTotal: 0,
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

type GetSupportProductCategoryHandler = RequestHandler<
  null,
  SuccessCase<ProductCategory>
>;

const getSupportProductCatory: GetSupportProductCategoryHandler = (_, res) =>
  res.status(201).json({ status: 'success', data: category });

export { getAllProduct, createProduct, getSupportProductCatory };
