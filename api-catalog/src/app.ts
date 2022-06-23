import "dotenv/config"
import bodyParser from "body-parser";
import express from "express";
import restaurantRouter from "./routers/restaurantRouter";
import {connectMongoose} from "./DBConnection";


const app: express.Express = express();
const port = process.env.CATALOG_API_PORT;
connectMongoose();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/catalog/restaurant", restaurantRouter);
app.use("/catalog/restaurant/menu", restaurantRouter);
app.use("/catalog/restaurant/article", restaurantRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});