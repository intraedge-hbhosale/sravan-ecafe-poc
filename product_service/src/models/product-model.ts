import { timeStamp } from "console";
import mongoose from "mongoose";

type productModel = {
  name: string;
  description: string;
  categories: string;
  price: number;
  availability: boolean;
  thumbnail_image: string;
  detail_image: string;
};
export type ProductDoc = mongoose.Document & productModel;

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    categories: String,
    price: Number,
    availability: Boolean,
    detail_image: String,
    thumbnail_image: String,
  },
  {
    toJSON: {
      transform(doc, ret, options) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timeStamps: true,
  }
);

const products =
  mongoose.models.products ||
  mongoose.model<ProductDoc>("products", productSchema);

export { products };
