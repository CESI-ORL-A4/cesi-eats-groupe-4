import { Router, Request, Response } from "express";
import { body } from "express-validator";
import {
    createTokens,
    removeTokens,
    validateRefreshToken,
    verifyAuthToken
} from "../controllers/authController";
import { createUser, deleteUser, getAllUsers, getUser, updateUser, userExists, validateUserPassword } from "../controllers/userController";
import Role from "../model/Role";
import { ReqWithBody } from "../types/expressTypes";
import TokenPayload from "../types/jwt/TokenPayload";
import LoginUserPayload from "../types/user/LoginUserPayload";
import UserAttributesPayload from "../types/user/UserAttributesPayload";
import isAuthorized from "../middlewares/isAuthorized";
import validateInputData from "../middlewares/validateInputData";
import validateUserAttributesPayload from "../middlewares/validateUserAttributesPayload";

const authRouter = Router();

authRouter.post("/register",
    validateUserAttributesPayload(["BASIC", "OWNER", "DELIVERER"]),
    validateInputData(),
    async (req: ReqWithBody<UserAttributesPayload>, res: Response) => {
        await registerUser(req, res);
});

authRouter.post("/register-admin", 
    validateUserAttributesPayload(),
    validateInputData(),
    async (req: ReqWithBody<UserAttributesPayload>, res: Response) => {
        await registerUser(req, res);
});

async function registerUser(req: ReqWithBody<UserAttributesPayload>, res: Response) {
    const payload = req.body;
    if (!await userExists(payload.email)) {
        const addedUser = await createUser(payload);
        return res.status(201).json({ status: "User registered", user: addedUser });
    }
    return res.status(409).json({ error: "User already exists" });
}

authRouter.post("/login",
    body("email").isEmail(),
    body("password").isString(),
    validateInputData(),
    async (req: ReqWithBody<LoginUserPayload>, res: Response) => {
        const payload = req.body;
        const user = await getUser(payload.email);
        if (user && await validateUserPassword(user, payload.password)) {
            const [accessToken, refreshToken] = await createTokens(user.email, user.role);
            return res.status(200).json({ status: "Logged in", accessToken, refreshToken });
        }
        return res.status(401).json({ error: "Wrong credentials" });
});

authRouter.get("/secure", async (req: Request, res: Response) => {
    await verifyAuthToken(req, res, async (isTokenValid: boolean, tokenPayload?: TokenPayload) => {
        if (isTokenValid) {
            return res.status(200).json({ status: "Authentified", role: tokenPayload?.role });
        }
        return res.status(401).json({ error: "Unauthorized" });
    })
});

authRouter.delete("/logout", async (req: Request, res: Response) => {
    await verifyAuthToken(req, res, async (isTokenValid: boolean, tokenPayload?: TokenPayload) => {
        if (isTokenValid) {
            await removeTokens(tokenPayload!.email);
            return res.status(200).json({ status: "Logged out" });
        } 
        return res.status(200).json({ status: "Already logged out" });
    })
});

authRouter.post("/refresh",
    body("refreshToken").isString(),
    validateInputData(),
    async (req: ReqWithBody<{ refreshToken: string }>, res: Response) => {
        const payload = req.body;
        const [isTokenValid, tokenPayload] = await validateRefreshToken(payload.refreshToken);
        if (isTokenValid && tokenPayload?.email && tokenPayload?.role) {
            const [accessToken, refreshToken] = await createTokens(tokenPayload.email, tokenPayload.role);
            return res.status(200).json({ status: "Logged in", accessToken, refreshToken });
        }
        res.status(400).json({ error: "Invalid refresh token" });
});

authRouter.get("/users", async (_: Request, res: Response) => {
    const users = await getAllUsers();
    return res.status(200).json({ users });
});

authRouter.put("/user",
    validateUserAttributesPayload(),
    isAuthorized([Role.TECHNIC, Role.COMMERCIAL]),
    validateInputData(),
    async (req: ReqWithBody<UserAttributesPayload>, res: Response) => {
        const [updatedUser, created] = await updateUser(req.body);
        if (created) {
            return res.status(201).json({ status: "User created", user: updatedUser });
        }
        return res.status(200).json({ status: "User updated", user: updatedUser })
});

authRouter.delete("/user",
    body("email").isEmail(),
    validateInputData(),
    async (req: ReqWithBody<{ email: string }>, res: Response) => {
        const email = req.body.email;
        if (await userExists(email)) {
            await deleteUser(email);
            return res.status(204).send();
        }
        return res.status(404).json({ error: "User not found" });
});

export default authRouter;
