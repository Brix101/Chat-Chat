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
router.get("/", [requireUser], getAllRoomHandler);
router.get("/:roomId", [requireUser], getRoomHandler);
router.put("/", [requireUser], updateRoomHandler);
router.delete("/:roomId", [requireUser], deleteRoomHandler);

export default router;
