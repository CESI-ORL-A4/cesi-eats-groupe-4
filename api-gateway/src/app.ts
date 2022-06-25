import "dotenv/config"
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import setupAuthRoutes from "./routes/authRoutes";
import setupUserRoutes from "./routes/userRoutes";

const app: express.Express = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

setupAuthRoutes(app);
setupUserRoutes(app);

app.listen(port, () => {
  console.log(`[server]: API-Gateway is running at https://localhost:${port}`);
});
