import mongoose from "mongoose";

export async function connectMongoDB() {
    const dbHost = process.env.ORDER_SERVICE_DB_HOST || "localhost";
    const dbUsername = process.env.ORDER_SERVICE_DB_USERNAME || "admin";
    const dbPassword = process.env.ORDER_SERVICE_DB_PASSWORD || "admin";
    console.log("Connect to mongodb...");
    await mongoose.connect(`mongodb://${dbUsername}:${dbPassword}@${dbHost}:27018`);
    console.log("Mongo is connected");
}
