import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CreateRoomBody, GetRoomBody, UpdateRoomBody } from "./room.schema";
import {
  createRoom,
  deleteRoom,
  findRoom,
  getAllRoom,
  updateRoom,
} from "./room.service";

const createRoomHandler = async (
  req: Request<{}, {}, CreateRoomBody>,
  res: Response
) => {
  try {
    const { name } = req.body;
    const userId = res.locals.user._id;
    const newRoom = await createRoom({ name, createdBy: userId });

    return res.status(StatusCodes.CREATED).send(newRoom);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
  }
};

const getAllRoomHandler = async (req: Request, res: Response) => {
  try {
    const rooms = await getAllRoom();

    return res.status(StatusCodes.ACCEPTED).send(rooms);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
  }
};

const getRoomHandler = async (req: Request<GetRoomBody>, res: Response) => {
  try {
    const roomId = req.params.roomId;
    const room = await findRoom({ id: roomId });

    if (!room) {
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }

    return res.status(StatusCodes.ACCEPTED).send(room);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
  }
};

const updateRoomHandler = async (
  req: Request<{}, {}, UpdateRoomBody>,
  res: Response
) => {
  const userId = res.locals.user._id;
  const { name, roomId } = req.body;

  const room = await findRoom({ id: roomId });

  if (!room) {
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }

  if (String(room.createdBy) !== userId) {
    return res.sendStatus(StatusCodes.FORBIDDEN);
  }

  try {
    const updatedRoom = await updateRoom(
      { id: roomId },
      {
        $set: { name },
      },
      {
        new: true,
      }
    );

    return res.status(StatusCodes.ACCEPTED).send(updatedRoom);
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
  }
};

const deleteRoomHandler = async (req: Request<GetRoomBody>, res: Response) => {
  try {
    const userId = res.locals.user._id;
    const roomId = req.params.roomId;
    const room = await findRoom({ id: roomId });

    if (!room) {
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }

    if (String(room.createdBy) !== userId) {
      return res.sendStatus(StatusCodes.FORBIDDEN);
    }

    await deleteRoom({ id: roomId });

    return res
      .status(StatusCodes.ACCEPTED)
      .send({ message: "Room deleted successfully" });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
  }
};

export {
  createRoomHandler,
  getAllRoomHandler,
  getRoomHandler,
  updateRoomHandler,
  deleteRoomHandler,
};
