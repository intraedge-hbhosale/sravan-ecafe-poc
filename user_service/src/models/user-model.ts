import mongoose from "mongoose";

type userModel = {
  email: string;
  password: string;
  phone: string;
  salt: string;
};
export type userDoc = mongoose.Document & userModel;

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    phone: String,
    salt: String,
    name: String,
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

const users =
  mongoose.models.users || mongoose.model<userDoc>("users", userSchema);

export { users };
