let mongoose = require('mongoose');

export async function connectMongoose() {
    const username = process.env.NOTIFICATION_DB_USERNAME || "localhost";
    const password = process.env.NOTIFICATION_DB_PASSWORD || "admin";
    const networkName = process.env.NOTIFICATION_DB_HOST || "admin";
    let isConnected = false;
    do {
        console.log("Try connecting to mongodb...");
        console.log(`mongodb://${username.trim()}:${password}@${networkName}`);
        try {
            await mongoose.connect(`mongodb://${username.trim()}:${password}@${networkName}`);
            console.log("Mongo is connected");
            isConnected = true
        }catch (e) {
            console.log("Failed to connect to mongodb, retry in 5 secondes...");
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    } while (!isConnected);
}
