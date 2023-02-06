import { object, string, TypeOf } from "zod";

export const createMessageSchema = {
  body: object({
    roomId: string({
      required_error: "roomId is required",
    }),
    message: string({
      required_error: "message is required",
    }),
  }),
};

export const updateMessageSchema = {
  body: object({
    messageId: string({
      required_error: "messageId is required",
    }),
    message: string({
      required_error: "message is required",
    }),
  }),
};

export const getMessageSchema = {
  body: object({
    messageId: string({
      required_error: "messageId is required",
    }),
  }),
};

export type CreateMessageBody = TypeOf<typeof createMessageSchema.body>;

export type UpdateMessageBody = TypeOf<typeof updateMessageSchema.body>;

export type GetMessageBody = TypeOf<typeof getMessageSchema.body>;
