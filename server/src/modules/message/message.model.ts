import mongoose from "mongoose";
import { User } from "../user/user.model";

export interface Message extends mongoose.Document {
  createdBy: User["_id"];
  message: String;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model<Message>("Message", messageSchema);

export default MessageModel;
