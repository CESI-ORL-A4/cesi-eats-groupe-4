import { initAccessToken, syncAccessToken } from "../model/AccessToken";
import { setupAssociations } from "../model/associations";
import { initRefreshToken, syncRefreshToken } from "../model/RefreshToken";
import { initUser, syncUser } from "../model/User";

export default async function() {
    initUser();
    initAccessToken();
    initRefreshToken();
    setupAssociations();
    await syncUser();
    await syncAccessToken();
    await syncRefreshToken();
}
