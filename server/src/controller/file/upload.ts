import type { Request } from 'express';
import multer from 'multer';
import { Image } from '../../model';

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

async function imageUpload(req: Request<any, any, any>) {
  if (!req.file) {
    throw new Error('Image file cannot be found on the request object');
  }

  return Image.create({
    name: req.file.originalname,
    data: { contentType: req.file.mimetype, data: req.file.buffer },
  });
}

export { upload, imageUpload };
