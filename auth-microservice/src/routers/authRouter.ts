import { Router, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { createTokens, removeTokens, validateAccessToken, validateRefreshToken } from "../controllers/authController";
import { createUser, deleteUser, getAllUsers, getUser, userExists, validateUserPassword } from "../controllers/userController";
import Role from "../model/Role";
import { ReqWithBody } from "../types/expressTypes";
import TokenPayload from "../types/jwt/TokenPayload";
import LoginUserPayload from "../types/user/LoginUserPayload";
import RegisterUserPayload from "../types/user/RegisterUserPayload";

const authRouter = Router();

authRouter.post("/register", 
    body("email").isEmail(),
    body("password").isString(),
    body("role").isIn(Object.values(Role)),
    async (req: ReqWithBody<RegisterUserPayload>, res: Response) => {
        validateInputData(req, res, async () => {
            const payload = req.body;
            if (!await userExists(payload.email)) {
                const addedUser = await createUser(payload);
                return res.status(201).json({ status: "User registered", user: addedUser });
            } 
            return res.status(409).json({ error: "User already exists" });
        })
});

authRouter.post("/login",
    body("email").isEmail(),
    body("password").isString(),
    async (req: ReqWithBody<LoginUserPayload>, res: Response) => {
        validateInputData(req, res, async () => {
            const payload = req.body;
            const user = await getUser(payload.email);
            if (user && await validateUserPassword(user, payload.password)) {
                const [accessToken, refreshToken] = await createTokens(user.email, user.role);
                return res.status(200).json({ status: "Logged in", accessToken, refreshToken });
            } 
            return res.status(401).json({ error: "Wrong credentials" });
        })
});

authRouter.get("/secure", async (req: Request, res: Response) => {
    verifyAuthToken(req, res, async (isTokenValid: boolean, tokenPayload?: TokenPayload) => {
        if (isTokenValid) {
            return res.status(200).json({ status: "Authentified", role: tokenPayload?.role });
        }
        return res.status(401).json({ error: "Unauthorized" });
    })
});

authRouter.delete("/logout", async (req: Request, res: Response) => {
    verifyAuthToken(req, res, async (isTokenValid: boolean, tokenPayload?: TokenPayload) => {
        if (isTokenValid) {
            await removeTokens(tokenPayload!.email);
            return res.status(200).json({ status: "Logged out" });
        } 
        return res.status(200).json({ status: "Already logged out" });
    })
});

authRouter.post("/refresh",
    body("refreshToken").isString(),
    async (req: ReqWithBody<{ refreshToken: string }>, res: Response) => {
        validateInputData(req, res, async () => {
            const payload = req.body;
            const [isTokenValid, tokenPayload] = await validateRefreshToken(payload.refreshToken);
            if (isTokenValid && tokenPayload?.email && tokenPayload?.role) {
                const [accessToken, refreshToken] = await createTokens(tokenPayload.email, tokenPayload.role);
                return res.status(200).json({ status: "Logged in", accessToken, refreshToken });
            }
            res.status(400).json({ error: "Invalid refresh token" });
        })
});

authRouter.get("/users", async (_: Request, res: Response) => {
    const users = await getAllUsers();
    return res.status(200).json({ users });
});

authRouter.delete("/user", body("email").isEmail(), async (req: ReqWithBody<{ email: string }>, res: Response) => {
    validateInputData(req, res, async () => {
        const email = req.body.email;
        if (await userExists(email)) {
            await deleteUser(email);
            return res.status(204).send();
        }
        return res.status(404).json({ error: "User not found" });
    });
});

async function verifyAuthToken(
    req: Request, res: Response, callback: (isTokenValid: boolean, payload?: TokenPayload) => void) {
    let token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ error: "No authentification token provided" });
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    } else {
      return res.status(401).json({ error: "Token should be sent following the HTTP Bearer authentification scheme" });
    }

    const [isTokenValid, tokenPayload] = await validateAccessToken(token);
    callback(isTokenValid, tokenPayload);
}

function validateInputData(req: Request | ReqWithBody<any>, res: Response, callback: () => void) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        callback();
    }
}

export default authRouter;
