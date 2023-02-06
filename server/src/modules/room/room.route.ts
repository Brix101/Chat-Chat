import express from "express";
import requireUser from "../../middleware/requireUser";
import { createRoomHandler, getRoomHandler } from "./room.controller";
import { deleteRoom, getAllRoom, updateRoom } from "./room.service";

const router = express.Router();

router.post("/", [requireUser], createRoomHandler);
router.get("/:roomId", getRoomHandler);
router.get("/", getAllRoom);

router.put("/:projectId", updateRoom);

router.delete("/:projectId", [requireUser], deleteRoom);

export default router;
