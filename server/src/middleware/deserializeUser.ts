import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../modules/session/session.service";
import { verifyJwt } from "../utils/jwt.util";

async function deserializeUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = (
    req.headers.authorization ||
    req.cookies.accessToken ||
    ""
  ).replace(/^Bearer\s/, "");

  if (!accessToken) {
    return next();
  }

  const { decoded } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
  }

  return next();
}

export default deserializeUser;
