import jwt from "jsonwebtoken";

export function signRefreshToken(email: string, role: string): string {
    const payload = {email, role};
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
