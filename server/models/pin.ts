import { Schema, model, Document } from "mongoose";
import { UserModel } from "./user";

export type PinModel = Document & {
  user: UserModel;
  imgLink: string;
  imgDescription: string;
  savedBy: Schema.Types.ObjectId[];
};

const pinSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    imgLink: String,
    imgDescription: String,
    savedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const Pin = model<PinModel>("Pin", pinSchema);
export default Pin;
