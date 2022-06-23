import { hash } from "bcrypt";
import { userExists } from "../controllers/userController";
import { initAccessToken, syncAccessToken } from "../model/AccessToken";
import { setupAssociations } from "../model/associations";
import { initRefreshToken, syncRefreshToken } from "../model/RefreshToken";
import User, { initUser, syncUser } from "../model/User";

async function createDefaultTechnicAccount() {
    if (process.env.AUTH_DEFAULT_TECHNIC_EMAIL && process.env.AUTH_DEFAULT_TECHNIC_PASS) {
        if (!await userExists(process.env.AUTH_DEFAULT_TECHNIC_EMAIL)) {
            await User.upsert({ 
                email: process.env.AUTH_DEFAULT_TECHNIC_EMAIL,
                password: await hash(process.env.AUTH_DEFAULT_TECHNIC_PASS, 10),
                role: "TECHNIC"
            })
            console.log("Default technic account created");
        } 
    }
}

export default async function() {
    initUser();
    initAccessToken();
    initRefreshToken();
    setupAssociations();
    syncAccessToken();
    syncRefreshToken();
    syncUser();
    await createDefaultTechnicAccount();
}
