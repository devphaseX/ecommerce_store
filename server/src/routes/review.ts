import express from 'express';
import { createReview, getAllReview } from '../controller/review';

const reviewRoute = express.Router();

reviewRoute.route('/review/:productId').get(getAllReview).post(createReview);

export { reviewRoute };
