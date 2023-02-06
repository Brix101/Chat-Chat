import express from "express";
import { processRequestBody } from "zod-express-middleware";
import requiredSession from "../../middleware/requireSession";
import requireUser from "../../middleware/requireUser";

import {
  loginHandler,
  logOutHandler,
  newTokenHandler,
} from "./auth.controller";
import { loginSchema } from "./auth.schema";

const router = express.Router();

router.post("/login", processRequestBody(loginSchema.body), loginHandler);

router.post("/logout", requireUser, logOutHandler);

router.get("/refreshToken", requiredSession, newTokenHandler);

export default router;
