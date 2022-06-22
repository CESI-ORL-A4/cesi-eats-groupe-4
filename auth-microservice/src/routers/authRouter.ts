import { Router, Response } from "express";
import { body, validationResult } from "express-validator";
import { createTokens } from "../controllers/authController";
import { createUser, getUser, userExists } from "../controllers/userController";
import Role from "../model/Role";
import { ReqWithBody } from "../types/expressTypes";
import LoginUserPayload from "../types/user/LoginUserPayload";
import RegisterUserPayload from "../types/user/RegisterUserPayload";

const authRouter = Router();

authRouter.post("/register", 
    body("email").isEmail(),
    body("password").isString(),
    body("role").isIn(Object.values(Role)),
    async (req: ReqWithBody<RegisterUserPayload>, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const payload = req.body;
        if (!await userExists(payload.email, payload.password)) {
            const addedUser = await createUser(payload);
            return res.status(201).json({ status: "User registered", user: addedUser });
        } 
        return res.status(409).json({ error: "User already exists" });
});

authRouter.post("/login",
    body("email").isEmail(),
    body("password").isString(),
    async (req: ReqWithBody<LoginUserPayload>, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const payload = req.body;
        const user = await getUser(payload.email, payload.password);
        if (user) {
            const [accessToken, refreshToken] = await createTokens(user.email, user.role);
            return res.status(200).json({ status: "Logged in", accessToken, refreshToken });
        } 
        return res.status(401).json({ error: "Wrong credentials" });
});

export default authRouter;
