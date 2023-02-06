import express from "express";
import requireUser from "../../middleware/requireUser";
import {
  createMessageHandler,
  deleteMessageHandler,
  updateMessageHandler,
} from "./message.controller";

const router = express.Router();

router.post("/", [requireUser], createMessageHandler);
router.put("/", [requireUser], updateMessageHandler);
router.delete("/:projectId", [requireUser], deleteMessageHandler);

export default router;
