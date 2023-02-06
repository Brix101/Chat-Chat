import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { get } from "lodash";
import { reIssueAccessToken } from "../modules/session/session.service";
import { verifyJwt } from "../utils/jwt.util";

async function requiredSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const sessionId = get(req, "cookies.sessionId");

  if (!sessionId) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
  }

  res.locals.sessionId = sessionId;

  return next();
}

export default requiredSession;
