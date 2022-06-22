import jwt from "jsonwebtoken";
import TokenPayload from "../types/jwt/TokenPayload";

export function signAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, process.env.AUTH_JWT_ACCESS_SECRET!, {
       expiresIn: process.env.AUTH_JWT_ACCESS_TOKEN_LIFE!
    });
}

export function verifyAccessToken(token: string): boolean {
    try {
        return !!jwt.verify(token, process.env.AUTH_JWT_ACCESS_SECRET!);
    } catch {
        return false;
    }
}

export function decodeToken(token: string) {
    try {
        return jwt.verify(token, process.env.AUTH_JWT_ACCESS_SECRET!) as TokenPayload;
    } catch {
        return undefined;
    }
}
