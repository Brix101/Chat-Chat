import config from "config";
import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import omit from "../../helpers/omit";
import { signJwt, verifyJwt } from "../../utils/jwt.util";
import { findUserById } from "../user/user.service";
import SessionModel, { Session } from "./session.model";

// TODO move and create session on usermodel
const createSession = async (userId: String, userAgent: String) => {
  const newSession = await SessionModel.create({
    user: userId,
    userAgent: userAgent,
  });

  const session = await newSession.populate("user");

  const user = omit(session.user.toJSON(), ["password", "__v"]);

  const accessToken = signJwt(
    { ...user, session: newSession._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  return accessToken;
};

const inValidateSession = async ({ sessionId }: { sessionId: string }) => {
  console.log(sessionId);
  return await SessionModel.findByIdAndUpdate(sessionId, {
    $set: { valid: false },
  });
};

const reIssueAccessToken = async ({ sessionId }: { sessionId: string }) => {
  if (!sessionId) return false;

  const session = await SessionModel.findById(sessionId).populate("user");

  if (!session || !session.valid || !session.user) return false;

  const user = omit(session.user.toJSON(), ["password", "__v"]);

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 minutes
  );

  return accessToken;
};

export { createSession, inValidateSession, reIssueAccessToken };
