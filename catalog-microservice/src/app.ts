import "dotenv/config"
import bodyParser from "body-parser";
import express from "express";
import restaurantRouter from "./routers/restaurantRouter";
import {connectMongoose} from "./DBConnection";
import cors from "cors";
import articleRouter from "./routers/articleRouter";
import menuRouter from "./routers/menuRouter";

const app: express.Express = express();
const port = process.env.CATALOG_SERVICE_API_PORT;
connectMongoose();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/catalog/restaurants", restaurantRouter);
app.use("/catalog/restaurants/:restaurantId/articles", articleRouter);
app.use("/catalog/restaurants/:restaurantId/menus", menuRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
