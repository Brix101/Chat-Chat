import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { updateRoom } from "../room/room.service";
import {
  CreateMessageBody,
  GetMessageBody,
  UpdateMessageBody,
} from "./message.schema";
import {
  createMessage,
  deleteMessage,
  findMessage,
  updateMessage,
} from "./message.service";

const createMessageHandler = async (
  req: Request<{}, {}, CreateMessageBody>,
  res: Response
) => {
  try {
    const socket = req.app.get("socket");
    const { message, roomId } = req.body;

    const userId = res.locals.user._id;

    const newMessage = await createMessage({ message, createdBy: userId });

    await updateRoom(
      { id: roomId },
      {
        $addToSet: { messages: newMessage },
      },
      {}
    );

    return res.status(StatusCodes.CREATED).send(newMessage);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
  }
};

const updateMessageHandler = async (
  req: Request<{}, {}, UpdateMessageBody>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const { message, messageId } = req.body;

  const existMessage = await findMessage({ id: messageId });

  if (!existMessage) {
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }

  if (String(existMessage.createdBy) !== userId) {
    return res.sendStatus(StatusCodes.FORBIDDEN);
  }

  try {
    const updatedMessage = await updateMessage(
      { id: messageId },
      {
        $set: { message },
      },
      {
        new: true,
      }
    );

    return res.status(StatusCodes.ACCEPTED).send(updatedMessage);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
  }
};

const deleteMessageHandler = async (
  req: Request<GetMessageBody>,
  res: Response
) => {
  try {
    const userId = res.locals.user._id;
    const messageId = req.params.messageId;
    const message = await findMessage({ id: messageId });

    if (!message) {
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }

    if (String(message.createdBy) !== userId) {
      return res.sendStatus(StatusCodes.FORBIDDEN);
    }

    await deleteMessage({ id: messageId });

    return res
      .status(StatusCodes.ACCEPTED)
      .send({ message: "Message Deleted deleted successfully" });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
  }
};

export { createMessageHandler, updateMessageHandler, deleteMessageHandler };
