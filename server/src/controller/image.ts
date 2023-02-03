import { RequestHandler } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { Image } from '../model/index';

type GetImageResponse = ServerResponse<any, any, ACTIVE_ON_DEV>;
type GetImageHandler = RequestHandler<any, GetImageResponse>;

const getImage: GetImageHandler = async (req, res, next) => {
  let match;
  match: if ((match = req.url.match(/\/(?<filename>.*?\.(?<ext>.*))/))) {
    const image = await Image.findOne({ name: match.groups?.filename });
    if (image) {
      const imageFilePath = path.join(__dirname, 'file', 'images', match[0]);
      await fs.writeFile(imageFilePath, image.data!.data!);
      return res
        .set('Content-Type', image.data!.contentType!)
        .sendFile(imageFilePath, async () => await fs.rm(imageFilePath));
    }

    if (['jpg', 'png', 'jpeg'].includes(match?.groups?.ext as any)) {
      break match;
    }

    return res.status(404).end();
  }
  next();
};

export { getImage };
