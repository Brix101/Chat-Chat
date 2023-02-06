import express from "express";
import requireUser from "../../middleware/requireUser";
import {
  createRoomHandler,
  deleteRoomHandler,
  getAllRoomHandler,
  getRoomHandler,
  updateRoomHandler,
} from "./room.controller";

const router = express.Router();

router.post("/", [requireUser], createRoomHandler);
router.get("/:roomId", getRoomHandler);
router.get("/", getAllRoomHandler);
router.put("/", updateRoomHandler);
router.delete("/:projectId", [requireUser], deleteRoomHandler);

export default router;
