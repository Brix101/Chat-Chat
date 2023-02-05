import { Express } from "express";
import authRoutes from "./auth/auth.route";
import userRoutes from "./user/user.route";

export default function (app: Express) {
  app.use("/api/users", userRoutes);
  app.use("/api/auth", authRoutes);
}
