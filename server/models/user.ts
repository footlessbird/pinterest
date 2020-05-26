import { Schema, model, Document } from "mongoose";

export type UserModel = Document & {
  githubId: string;
  email: string;
  password: string;
  username: string;
};

const userSchema = new Schema({
  githubId: {
    type: String,
    required: false,
  },
  email: String,
  password: String,
  username: String,
});

const User = model<UserModel>("User", userSchema);

export default User;
