import express from 'express';
import { getImage } from '../controller/image';

const imageRoute = express.Router();

imageRoute.use(getImage);

export { imageRoute };
