import { Express } from "express";
import userRoutes from "./user/user.route";

export default function (app: Express) {
  app.use("/api/users", userRoutes);
}
