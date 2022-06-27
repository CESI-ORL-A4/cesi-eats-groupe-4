const username = process.env.CATALOG_DB_USERNAME;
const password = process.env.CATALOG_DB_PASSWORD;
const networkName = process.env.CATALOG_DB_NETWORK_NAME;
const port = process.env.CATALOG_DB_PORT;
let mongoose = require('mongoose');

export async function connectMongoose() {
    console.log("Connect to mongodb...");
    await mongoose.connect(`mongodb://${username}:${password}@${networkName}:${port}`);
    console.log("connected");
}
