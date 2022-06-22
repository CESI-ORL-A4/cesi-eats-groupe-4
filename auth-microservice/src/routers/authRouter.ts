import { Router, Request, Response } from "express";
import { ReqWithBody } from "../types/expressTypes";

const authRouter = Router();


type RegisterPayload = {
    email: string;
    password: string;
}

authRouter.post("/register", (req: ReqWithBody<RegisterPayload>, res: Response) => {
    const checkUse
});

