import "dotenv/config"
import bodyParser from "body-parser";
import express from "express";
import userNotificationRouter from "./routers/userNotificationRouter";
import {connectMongoose} from "./DBConnection";
import cors from "cors";
import notificationRouter from "./routers/notificationRouter";
import registerRabbitMQListeners from "./rabbitmq/listeners";

const app: express.Express = express();
const port = process.env.NOTIFICATION_SERVICE_API_PORT;

registerRabbitMQListeners();
connectMongoose();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/users/:userId/notifications", userNotificationRouter);
app.use("/notifications", notificationRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
