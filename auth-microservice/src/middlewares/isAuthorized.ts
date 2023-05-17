import Role from "../model/Role";
import {NextFunction, Request, Response} from "express";
import TokenPayload from "../types/jwt/TokenPayload";
import {verifyAuthToken} from "../controllers/authController";

export default function (strictRoles?: Role[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        await verifyAuthToken(req, res, (isTokenValid: boolean, tokenPayload?: TokenPayload) => {
            if (isTokenValid && tokenPayload) {
                if (strictRoles && !(Object.values(strictRoles).includes(tokenPayload.role))) {
                    return res.status(403).json({ error: "Forbidden" });
                }
                return next();
            }
            return res.status(401).json({ error: "Unauthorized" });
        });
    }
}