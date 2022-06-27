import "dotenv/config"
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";
import setupAuthRoutes from "./routes/authRoutes";
import setupUserRoutes from "./routes/userRoutes";

const swaggerFile = require("../swagger_output.json");

const app: express.Express = express();
const port = process.env.API_GATEWAY_PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

setupAuthRoutes(app);
setupUserRoutes(app);

app.listen(port, () => {
  console.log(`[server]: API-Gateway is running at https://localhost:${port}`);
});