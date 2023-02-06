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

  const sessionId = get(req, "cookies.sessionId");

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
  }

  if (expired && sessionId) {
    const newAccessToken = await reIssueAccessToken({ sessionId });

    if (newAccessToken) {
      const result = verifyJwt(newAccessToken);

      res.locals.user = result.decoded;
    }
    return next();
  }

  return next();
}

export default deserializeUser;
