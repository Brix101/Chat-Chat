import { Express } from "express";
import authRoutes from "./auth/auth.route";
import messageRoutes from "./message/message.route";
import roomRoutes from "./room/room.route";
import userRoutes from "./user/user.route";

export default function (app: Express) {
  app.use("/api/users", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/room", roomRoutes);
  app.use("/api/message", messageRoutes);
}
