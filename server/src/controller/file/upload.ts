import type { Request } from 'express';
import multer from 'multer';
import { Image } from '../../model';

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

async function imageUpload(req: Request<any, any, any>) {
  if (!req.file) {
    throw new Error('Image file cannot be found on the request object');
  }

  const uniqueNameComponents = req.file.originalname.split('.');
  uniqueNameComponents.splice(-1, 0, Math.random().toString(32).slice(3, 8));
  return Image.create({
    name: uniqueNameComponents.join('.'),
    data: { contentType: req.file.mimetype, data: req.file.buffer },
  });
}

export { upload, imageUpload };
