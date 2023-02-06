import { ParamsDictionary } from 'express-serve-static-core';
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
import { FilterQuery, SortOrder } from 'mongoose';
import { query } from 'express';
import { z } from 'zod';

interface ProductQuery extends ParsedQueryBase {
  stat?: 'trending' | 'best-sales' | 'newly';
  category?: CategoryEntry;
  review?: `${boolean}`;
  order?: `${Exclude<SortOrder, 'asc' | 'desc'>}`;
  search?: string;
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

const clientQuerySchema = z.object<ExtensibleZodShape<ProductQuery>>({
  limit: z.number({ coerce: true }).optional(),
  category: z.nativeEnum(category).optional(),
  order: z
    .enum(['ascending', 'descending'] as ['ascending', 'descending'])
    .optional(),
  search: z.string().optional(),
  skip: z.number({ coerce: true }).optional(),
  stat: z
    .enum(['trending', 'best-sales', 'newly'] as [
      'trending',
      'best-sales',
      'newly'
    ])
    .optional(),
});

function getClientProductQuery(query?: ProductQuery) {
  query = query ? clientQuerySchema.parse(query) : query;
  let filterQuery: FilterQuery<ProductData> = {
    ...(query?.search
      ? { productName: { $regex: new RegExp(query.search, 'i') } }
      : null),
    ...(query?.category
      ? { category: { $regex: new RegExp(query.category, 'i') } }
      : null),
  };

  let productQuery = Product.find(filterQuery);

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
      console.log('query by order');
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
          query.order = 'descending';
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

const getProductQuerySchema = z.object<ExtensibleZodShape<GetProductQuery>>({
  productName: z.string(),
  productId: z.string(),
});
interface GetProductQuery extends ParamsDictionary {
  productName: string;
  productId: string;
}
type GetProductResponse = ServerResponse<
  ProductData | null,
  any,
  ACTIVE_ON_DEV
>;
type GetProductHandler = RequestHandler<GetProductQuery, GetProductResponse>;

const getProduct: GetProductHandler = async (req, res) => {
  try {
    const params = getProductQuerySchema.parse(req.params) as GetProductQuery;
    const product = await Product.findOne({ _id: params.productId });
    return res.status(201).json({ status: 'success', data: product });
  } catch (e) {
    return res
      .status(402)
      .json({ status: 'failed', error: prepareError(e as any) });
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
    const productData = productFormSchema.parse(req.body);
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
    console.log(e);
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

export { getAllProduct, createProduct, getSupportProductCatory, getProduct };
