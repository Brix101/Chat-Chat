import config from "config";
import mongoose from "mongoose";
import { signJwt } from "../../utils/jwt.util";
import { User } from "../user/user.model";

export interface Session extends mongoose.Document {
  user: User["_id"];
  valid: boolean;
  userAgent: String;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model<Session>("Session", sessionSchema);

export default SessionModel;
