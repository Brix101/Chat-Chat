import mongoose from "mongoose";
import { User } from "../user/user.model";

export interface Room extends mongoose.Document {
  name: String;
  createdBy: User["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const roomSchema = new mongoose.Schema(
  {
    name: { type: String },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const RoomModel = mongoose.model<Room>("Room", roomSchema);

export default RoomModel;
