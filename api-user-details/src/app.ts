import "dotenv/config"

import bodyParser from "body-parser";
import express from "express";
import userRouter from "./routers/userRouter";

const app: express.Express = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
