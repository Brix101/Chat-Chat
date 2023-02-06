import config from "config";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import { createServer } from "http";
import morgan from "morgan";
import { Server } from "socket.io";
import deserializeUser from "./middleware/deserializeUser";
import modules from "./modules";
import { connectToDatabase } from "./utils/connect";

dotenv.config();
const app = express();
const PORT = config.get<number>("port");

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: config.get("origin"),
    credentials: true,
  })
);
app.use(helmet());
app.use(deserializeUser);
app.use(morgan("dev"));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: config.get("origin"),
    credentials: true,
  },
});

const connections = new Set();
app.set("socket", io);
modules(app);

io.on("connection", async (socket) => {
  connections.add(socket);
  console.log("connected", socket.id);

  socket.on("disconnect", () => {
    connections.delete(socket);
  });
});

httpServer.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`App is running at http://localhost:${PORT}`);
});
