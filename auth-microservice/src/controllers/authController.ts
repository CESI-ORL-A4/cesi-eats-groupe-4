import { decodeAccessToken, signAccessToken } from "../jwt/accessToken";
import { decodeRefreshToken, signRefreshToken } from "../jwt/refreshToken";
import AccessToken from "../model/AccessToken";
import RefreshToken from "../model/RefreshToken";
import Role from "../model/Role";
import TokenPayload from "../types/jwt/TokenPayload";
import {Request, Response} from "express";

export async function createTokens(email: string, role: Role):
    Promise<[accessToken: string, refreshToken: string]>
{
    const signedAccessToken = signAccessToken({ email, role });
    const signedRefreshToken = signRefreshToken({ email, role });

    const [accessToken, _] = await AccessToken.upsert({ email, token: signedAccessToken });
    const [refreshToken, __] = await RefreshToken.upsert({ email, token: signedRefreshToken });
    return [accessToken.token, refreshToken.token];
} 

export async function validateAccessToken(token: string):
    Promise<[isValid: boolean, tokenPayload?: TokenPayload]>
{
    const decodedToken = decodeAccessToken(token);
    if (!!decodedToken) {
        const dbToken = await AccessToken.findOne({ where: { email: decodedToken.email, token } });
        const isValid = !!dbToken;
        return [isValid, decodedToken];
    }
    return [false, undefined];
}

export async function validateRefreshToken(token: string):
    Promise<[isValid: boolean, tokenPayload?: TokenPayload]>
{
    const decodedToken = decodeRefreshToken(token);
    if (decodedToken) {
        const dbRefreshToken = await RefreshToken.findOne({ where: { email: decodedToken.email, token } });
        const isValid = !!dbRefreshToken;
        return [isValid, decodedToken]; 
    }
    return [false, undefined];
}

export async function removeTokens(email: string) {
    await AccessToken.destroy({ where: { email } });
    await RefreshToken.destroy({ where: { email } });
}

export async function verifyAuthToken(
    req: Request, res: Response, callback: (isTokenValid: boolean, payload?: TokenPayload) => void)
{
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
