import { Router, Request, Response } from "express";
import { body } from "express-validator";
import {
    createTokens,
    removeTokens,
    validateRefreshToken,
    verifyAuthToken
} from "../controllers/authController";
import { getUserByEmail, validateUserPassword } from "../controllers/userController";
import { ReqWithBody } from "../types/expressTypes";
import TokenPayload from "../types/jwt/TokenPayload";
import LoginUserPayload from "../types/user/LoginUserPayload";
import validateInputData from "../middlewares/validateInputData";

const authRouter = Router();

authRouter.post("/login",
    body("email").isEmail(),
    body("password").isString(),
    validateInputData(),
    async (req: ReqWithBody<LoginUserPayload>, res: Response) => {
        const payload = req.body;
        const user = await getUserByEmail(payload.email);
        if (user && await validateUserPassword(user, payload.password)) {
            const [accessToken, refreshToken] = await createTokens(user.userId, user.email, user.role);
            return res.status(200).json({
                status: "Logged in",
                id: user.id,
                role: user.role,
                accessToken,
                refreshToken
            });
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
            await removeTokens(tokenPayload!.id);
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
            const [accessToken, refreshToken] = await createTokens(
                tokenPayload.id, tokenPayload.email, tokenPayload.role
            );
            return res.status(200).json({ status: "Logged in", accessToken, refreshToken });
        }
        res.status(400).json({ error: "Invalid refresh token" });
});

export default authRouter;
