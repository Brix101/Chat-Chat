import express from "express";
import { processRequestBody } from "zod-express-middleware";
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

router.get("/refreshToken", requireUser, newTokenHandler);

export default router;
