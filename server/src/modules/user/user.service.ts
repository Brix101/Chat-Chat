import { DocumentDefinition } from "mongoose";
import UserModel, { User } from "./user.model";

export async function createUser(
  user: DocumentDefinition<Omit<User, "comparePassword">>
) {
  return UserModel.create(user);
}

export async function findUserByEmail(email: User["email"]) {
  return UserModel.findOne({ email });
}
