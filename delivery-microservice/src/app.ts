import "dotenv/config"

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { connectMongoDB } from "./DBConnection";
import deliveriesRouter from "./routers/deliveriesRouter";
import deliverersRouter from "./routers/deliverersRouter";

const app: express.Express = express();
const port = process.env.DELIVERY_SERVICE_API_PORT || 8080;

connectMongoDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/deliveries", deliveriesRouter);
app.use("/deliverers", deliverersRouter);

app.listen(port, () => {
  console.log(`[server]: Delivery microservice API is running at https://localhost:${port}`);
});
