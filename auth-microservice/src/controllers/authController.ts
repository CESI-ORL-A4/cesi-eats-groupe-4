import { decodeAccessToken, signAccessToken } from "../jwt/accessToken";
import { decodeRefreshToken, signRefreshToken, verifyRefreshToken } from "../jwt/refreshToken";
import AccessToken from "../model/AccessToken";
import RefreshToken from "../model/RefreshToken";
import TokenPayload from "../types/jwt/TokenPayload";

export async function createTokens(email: string, role: string):
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
