import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export type UserModel = Document & {
  githubId: string;
  email: string;
  password: string;
  username: string;
  comparePassword: (attempt: string, next?: any) => Promise<any>;
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

// before saving a model, this function will run
userSchema.pre<UserModel>("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

// This must be fixed causing error when logging in
userSchema.methods.comparePassword = async function (attempt, next) {
  try {
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    return next(err);
  }
};

const User = model<UserModel>("User", userSchema);

export default User;
