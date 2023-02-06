import { object, string, TypeOf } from "zod";

export const createRoomSchema = {
  body: object({
    name: string({
      required_error: "name is required",
    }),
  }),
};

export const getRoomSchema = {
  body: object({
    roomId: string({
      required_error: "roomId is required",
    }),
  }),
};

export type CreateRoomBody = TypeOf<typeof createRoomSchema.body>;

export type GetRoomBody = TypeOf<typeof getRoomSchema.body>;
