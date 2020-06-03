import { Schema, model, Document } from "mongoose";
import { UserModel } from "./user";

export type PinModel = Document & {
  user: UserModel;
  imgLink: string;
  imgDescription: string;
  savedBy: { [key: string]: boolean };
};

const pinSchema = new Schema(
  {
    // user 프로퍼티는 내가 만들었다는 택을 붙인 것임 따라서 내가 만든것을 나의 아이디를(몽고디비에 의해 자동 생성된 아이디) 조회해서 찾을 수 있게 됨
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    imgLink: String,
    imgDescription: String,
    savedBy: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

const Pin = model<PinModel>("Pin", pinSchema);
export default Pin;
