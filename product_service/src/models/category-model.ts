import mongoose from "mongoose";

export type categoryModel = {
  name: string;
  detail_image: string;
  title: string;
  products: string[];
  subtitle: string;
};
export type categoryDoc = mongoose.Document & categoryModel;

export const categorySchema = new mongoose.Schema(
  {
    name: String,
    detail_image: String,
    title: String,
    products: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "products",
      },
    ],
    subtitle: String,
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

const categories =
  mongoose.models.categories ||
  mongoose.model<categoryDoc>("categories", categorySchema);

export { categories };
