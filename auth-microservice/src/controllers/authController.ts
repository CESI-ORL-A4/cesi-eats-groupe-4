import { signAccessToken } from "../jwt/accessToken";
import { signRefreshToken, verifyRefreshToken } from "../jwt/refreshToken";
import AccessToken from "../model/AccessToken";
import RefreshToken from "../model/RefreshToken";

export async function createTokens(email: string, role: string):
    Promise<[accessToken: string, refreshToken: string]>
{
    const signedAccessToken = signAccessToken(email, role);
    const signedRefreshToken = signRefreshToken(email, role);

    const accessToken = await AccessToken.create({ email, token: signedAccessToken });
    const refreshToken = await RefreshToken.create({ email, token: signedRefreshToken });
    return [accessToken.token, refreshToken.token];
} 

export async function isRefreshTokenValid(email: string, token: string): Promise<boolean> {
    const refreshToken = await RefreshToken.findOne({ where: { email, token } });
    return !!refreshToken && verifyRefreshToken(refreshToken.token);
}
