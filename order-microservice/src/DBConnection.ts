import mongoose from "mongoose";

export async function connectMongoDB() {
    const dbHost = process.env.ORDER_SERVICE_DB_HOST || "localhost";
    const dbUsername = process.env.ORDER_SERVICE_DB_USERNAME || "admin";
    const dbPassword = process.env.ORDER_SERVICE_DB_PASSWORD || "admin";
    let isConnected = false;
    do {
        console.log("Try connecting to mongodb...");
        console.log(`mongodb://${dbUsername.trim()}:${dbPassword}@${dbHost}`);
        try {
            await mongoose.connect(`mongodb://${dbUsername.trim()}:${dbPassword}@${dbHost}`);
            console.log("Mongo is connected");
            isConnected = true
        }catch (e) {
            console.log("Failed to connect to mongodb, retry in 5 secondes...");
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    } while (!isConnected);
}
