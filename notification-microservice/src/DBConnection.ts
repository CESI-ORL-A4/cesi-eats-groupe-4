const username = process.env.NOTIFICATION_DB_USERNAME;
const password = process.env.NOTIFICATION_DB_PASSWORD;
const networkName = process.env.NOTIFICATION_DB_HOST;
let mongoose = require('mongoose');

export async function connectMongoose() {
    console.log("Connect to mongodb...");
    console.log(`mongodb://${username}:${password}@${networkName}`);
    let isConnected = false;
    do {
        console.log("Try connecting to mongodb...");
        try {
            await mongoose.connect(`mongodb://${username}:${password}@${networkName}`);
            console.log("Mongo is connected");
            isConnected = true
        }catch (e) {
            console.log("Failed to connect to mongodb, retry in 5 secondes...");
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    } while (!isConnected);
}
