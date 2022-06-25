import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import cors from "cors"
require('dotenv').config()

//List Router
import authRouter from "./src/routes/auth";

const app: express.Express = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());



app.use('/auth',authRouter);

app.get('/',  (req: Request, res: Response) => {
    return res.status(200).json({ message: `perfect` });
});

app.post('/auth/create',  (req: Request, res: Response,next:any) => {
  return res.status(200).json({ message: `perfect` });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
