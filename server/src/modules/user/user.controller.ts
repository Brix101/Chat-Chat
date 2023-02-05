import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { MongoError } from "mongodb";
import { RegisterUserBody } from "./user.schema";
import { createUser } from "./user.service";

export async function registerUserHandler(
  req: Request<{}, {}, RegisterUserBody>,
  res: Response
) {
  const { name, email, password } = req.body;
  const socket = req.app.get("socket");
  try {
    await createUser({ name, email, password });

    return res
      .status(StatusCodes.CREATED)
      .send({ message: "User created successfully" });
  } catch (error) {
    if (error instanceof MongoError) {
      if (error.code === 11000) {
        return res
          .status(StatusCodes.CONFLICT)
          .send({ message: "User already exists" });
      }
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
  }
}
