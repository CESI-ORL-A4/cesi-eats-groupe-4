import mongoose from "mongoose";

export async function connectMongoDB() {
    const dbHost = process.env.DELIVERY_SERVICE_DB_HOST || "localhost";
    const dbUsername = process.env.DELIVERY_SERVICE_DB_USERNAME || "admin";
    const dbPassword = process.env.DELIVERY_SERVICE_DB_PASSWORD || "admin";
    console.log(`mongodb://${dbUsername}:${dbPassword}@${dbHost}`);
    let isConnected = false;
    do {
        console.log("Try connecting to mongodb...");
        try {
            await mongoose.connect(`mongodb://${dbUsername}:${dbPassword}@${dbHost}`);
            console.log("Mongo is connected");
            isConnected = true
        }catch (e) {
            console.log("Failed to connect to mongodb, retry in 5 secondes...");
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    } while (!isConnected);
}
