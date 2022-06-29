import "dotenv/config"

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { connectMongoDB } from "./DBConnection";
import ordersRouter from "./routers/ordersRouter";
import restaurantsRouter from "./routers/restaurantsRouter";
import usersRouter from "./routers/usersRouter";

const app: express.Express = express();
const port = process.env.ORDER_SERVICE_API_PORT || 8080;

connectMongoDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/orders", ordersRouter);
app.use("/restaurants", restaurantsRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`[server]: Orders microservice API is running at https://localhost:${port}`);
});
