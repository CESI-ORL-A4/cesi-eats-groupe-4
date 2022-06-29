import { createUser, userExistsByMail } from "./controllers/userController";
import { initUser } from "./model/user";

async function createDefaultTechnicAccount() {
    if (process.env.DEFAULT_USER_TECHNIC_EMAIL && process.env.DEFAULT_USER_TECHNIC_PASS) {
        if (!await userExistsByMail(process.env.DEFAULT_USER_TECHNIC_EMAIL)) {
            await createUser({
                email: process.env.DEFAULT_USER_TECHNIC_EMAIL,
                password: process.env.DEFAULT_USER_TECHNIC_PASS,
                role: "TECHNIC",
                firstName: "Technic",
                lastName: "CesiEat",
                birthdate: new Date("01/01/2000"),
                address: "CesiEat, France",
                phone: "0000000",
            })
            console.log("Default technic account created");
        }
    }
}

export default async function() {
    await initUser();
    await createDefaultTechnicAccount();
}
