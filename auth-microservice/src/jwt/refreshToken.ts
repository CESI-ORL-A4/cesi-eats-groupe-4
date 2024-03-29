import jwt from "jsonwebtoken";
import TokenPayload from "../types/jwt/TokenPayload";

export function signRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, process.env.AUTH_JWT_REFRESH_SECRET!, {
       expiresIn: process.env.AUTH_JWT_ACCESS_TOKEN_LIFE!
    });
}

export function verifyRefreshToken(token: string): boolean {
    try {
        return !!jwt.verify(token, process.env.AUTH_JWT_REFRESH_SECRET!);
    } catch {
        return false;
    }
}

export function decodeRefreshToken(token: string) {
    try {
        return jwt.verify(token, process.env.AUTH_JWT_REFRESH_SECRET!) as TokenPayload;
    } catch {
        return undefined;
    }
}
