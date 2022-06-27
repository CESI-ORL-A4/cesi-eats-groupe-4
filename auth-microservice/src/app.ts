import "dotenv/config"

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import authRouter from "./routers/authRouter";
import setupDB from "./db/setupDB";
import registerRabbitMQListeners from "./rabbitmq/listeners";

const app: express.Express = express();
const port = process.env.AUTH_SERVICE_API_PORT || 8080;

setupDB();
registerRabbitMQListeners();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
