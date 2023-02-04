import { RequestHandler } from 'express';
import mongooose from 'mongoose';
import {
  Product,
  Review,
  ReviewDoc,
  ReviewFormData,
  reviewFormSchema,
} from '../model';
import { ParamsDictionary } from 'express-serve-static-core';
import { prepareError } from '../util/error';

interface ReviewParams extends ParamsDictionary {
  productId: string;
}

type GetAllReviewHandler = RequestHandler<
  ReviewParams,
  ServerResponse<Array<ReviewDoc>, any, ACTIVE_ON_DEV>,
  ReviewFormData
>;

const getAllReview: GetAllReviewHandler = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    return res.status(200).json({ status: 'success', data: reviews });
  } catch (e) {
    return res
      .status(401)
      .json({ status: 'failed', error: prepareError(e as any) });
  }
};

type CreateReviewHandler = RequestHandler<
  ReviewParams,
  ServerResponse<ReviewDoc, any, ACTIVE_ON_DEV>,
  ReviewFormData
>;

const createReview: CreateReviewHandler = async (req, res) => {
  try {
    if (
      !(await Product.findOne({
        _id: new mongooose.Types.ObjectId(req.params.productId),
      }))
    ) {
      throw new Error(
        'Cannot not find any product associated with this product id'
      );
    }

    const review = await Review.create({
      ...reviewFormSchema.parse(req.body),
      productId: req.params.productId,
    });

    return res.status(201).json({ status: 'success', data: review.toJSON() });
  } catch (e) {
    return res.status(404).json({ status: 'failed', error: e as any });
  }
};
export { getAllReview, createReview };
