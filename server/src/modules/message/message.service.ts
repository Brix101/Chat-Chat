import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import MessageModel, { Message } from "./message.model";

export async function createMessage(
  message: DocumentDefinition<Omit<Message, "createdAt" | "updatedAt">>
) {
  return await MessageModel.create(message);
}

export async function findMessage(
  query: FilterQuery<Message>,
  options: QueryOptions = { lean: true }
) {
  return await MessageModel.findOne(query, {}, options).populate("messages");
}

export async function updateMessage(
  query: FilterQuery<Message>,
  update: UpdateQuery<Omit<Message, "createdAt" | "updatedAt" | "createdBy">>,
  options: QueryOptions
) {
  return MessageModel.findOne(query, update, options);
}

export async function deleteMessage(query: FilterQuery<Message>) {
  return MessageModel.deleteOne(query);
}
