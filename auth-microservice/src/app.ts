import "dotenv/config"

import bodyParser from "body-parser";
import express from "express";
import authRouter from "./routers/authRouter";
import setupDB from "./db/setupDB";

const app: express.Express = express();
const port = process.env.AUTH_SERVICE_API_PORT || 8080;

setupDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
