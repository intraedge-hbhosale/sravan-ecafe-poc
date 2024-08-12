import mongoose from "mongoose";

type shoppingCartModel = {
  cart_id: string;
  user_id: string;
  created_at: Date;
};

export type userDoc = mongoose.Document & shoppingCartModel;

const shoppingCartSchema = new mongoose.Schema(
  {
    cart_id: String,
    user_id: String,
    created_at: Date,
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

const shoppingcart =
  mongoose.models.shoppingcart ||
  mongoose.model<userDoc>("shoppingcart", shoppingCartSchema);

export { shoppingcart };
