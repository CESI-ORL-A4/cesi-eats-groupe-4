import "dotenv/config"

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { connectMongoDB } from "./DBConnection";
import deliveriesRouter from "./routers/deliveriesRouter";

const app: express.Express = express();
const port = process.env.DELIVERY_SERVICE_API_HOST || 8080;

connectMongoDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/deliveries", deliveriesRouter);

app.listen(port, () => {
  console.log(`[server]: Delivery microservice API is running at https://localhost:${port}`);
});
