import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import omit from "../../helpers/omit";
import { createSession, inValidateSession } from "../session/session.service";
import { findUserByEmail } from "../user/user.service";
import { LoginBody } from "./auth.schema";

export async function loginHandler(
  req: Request<{}, {}, LoginBody>,
  res: Response
) {
  const { email, password } = req.body;

  // find the user by email
  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).send("User not found");
  }
  if (!user.comparePassword(password)) {
    return res.status(StatusCodes.UNAUTHORIZED).send("Incorrect password");
  }

  const accessToken = await createSession(
    user._id,
    req.get("user-agent") || ""
  );

  return res.status(StatusCodes.OK).send({ accessToken });
}

export async function logOutHandler(
  req: Request<{}, {}, LoginBody>,
  res: Response
) {
  const sessionId = res.locals.user.decoded.session;

  await inValidateSession({ sessionId });

  return res.status(StatusCodes.OK).send();
}
