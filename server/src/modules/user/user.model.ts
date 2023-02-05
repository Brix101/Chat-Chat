import argon2 from "argon2";
import config from "config";
import mongoose from "mongoose";

export interface User extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as unknown as User;

  if (!user.isModified("password")) {
    return next();
  }

  const hash = await argon2.hash(user.password);

  user.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as User;
  //return false if password not correct
  return argon2.verify(candidatePassword, user.password).catch(() => false);
};

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
