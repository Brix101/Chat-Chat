import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import RoomModel, { Room } from "./room.model";

export async function getAllRoom() {
  return await RoomModel.find().lean();
}

export async function findRoom(
  query: FilterQuery<Room>,
  options: QueryOptions = { lean: true }
) {
  return await RoomModel.findOne(query, {}, options).populate("messages");
}

export async function createRoom(
  room: DocumentDefinition<Omit<Room, "createdAt" | "updatedAt">>
) {
  return await RoomModel.create(room);
}

export async function updateRoom(
  query: FilterQuery<Room>,
  update: UpdateQuery<Omit<Room, "createdAt" | "updatedAt" | "createdBy">>,
  options: QueryOptions
) {
  return await RoomModel.findByIdAndUpdate(query, update, options);
}

export async function deleteRoom(query: FilterQuery<Room>) {
  return await RoomModel.deleteOne(query);
}
