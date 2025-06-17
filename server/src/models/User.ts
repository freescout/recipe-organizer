import mongoose, { Schema, model, HydratedDocument, Model } from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  favoriteRecipes: mongoose.Types.ObjectId[];
}

export type IUserDocument = HydratedDocument<IUser>;

export type IUserModel = Model<IUserDocument>;

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    favoriteRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

export default model<IUser>("User", UserSchema);
