import mongoose, { InferSchemaType } from 'mongoose';

const ImageSchema = new mongoose.Schema({
  name: { type: String, require: true },
  data: { data: Buffer, contentType: String },
});

type ImageData = InferSchemaType<typeof ImageSchema>;

const Image = mongoose.model('image', ImageSchema);
export { Image };
export type { ImageData };
