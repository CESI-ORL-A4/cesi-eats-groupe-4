import "dotenv/config"

import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { connectMongoDB } from "./DBConnection";

const app: express.Express = express();
const port = 8080;

connectMongoDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`[server]: Auth microservice API is running at https://localhost:${port}`);
});
