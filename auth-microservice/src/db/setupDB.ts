import { initAccessToken, syncAccessToken } from "../model/AccessToken";
import { setupAssociations } from "../model/associations";
import { initRefreshToken, syncRefreshToken } from "../model/RefreshToken";
import { initUser, syncUser } from "../model/User";

export default function() {
    initUser();
    initAccessToken();
    initRefreshToken();
    setupAssociations();
    syncUser();
    syncAccessToken();
    syncRefreshToken();
}
