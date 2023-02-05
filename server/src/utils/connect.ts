import config from "config";
import mongoose from "mongoose";

export async function connectToDatabase() {
  const dbUri = config.get<string>("dbUri");
  const dbName = config.get<string>("dbName");

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(dbUri, {
      dbName: dbName,
    });
    console.log("Connected to Db");
  } catch (error) {
    console.error({ error });
    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
  await mongoose.connection.close();

  console.log("Disconnect from database");

  return;
}
