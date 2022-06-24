import "dotenv/config"

import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routers/userRouter";
import RabbitMQ from "./rabbitmq/RabbitMQ";
import { ConsumeMessage } from "amqplib";

const app: express.Express = express();
const port = process.env.USER_SERVICE_API_PORT || 8080;

RabbitMQ.getInstance().then(rabbit => rabbit.subscribe("mainQueue", (message: ConsumeMessage, ack: () => void) => {
    console.log("received message", message.content.toString());
    ack();
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
