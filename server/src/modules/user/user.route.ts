import express from "express";
import { omit } from "lodash";
import { processRequestBody } from "zod-express-middleware";
import requireUser from "../../middleware/requireUser";

import { registerUserHandler } from "./user.controller";
import { registerUserSchema } from "./user.schema";

const router = express.Router();

router.get("/me", requireUser, (req, res) => {
  const session = res.locals.user;
  const user = omit(session, ["createdAt", "updatedAt", "session"]);
  return res.send({ user });
});

router.post(
  "/register",
  processRequestBody(registerUserSchema.body),
  registerUserHandler
);

export default router;
