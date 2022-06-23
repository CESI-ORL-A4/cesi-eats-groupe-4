import User from "../model/user";
import AddUserPayload from "../types/user/AddUserPayload";
import userValidator from "../validator/userValidator";
import GetUserPayload from "../types/user/GetUserPayload";

export async function userExists(email: string) {
    const userCount = await User.count({ where: { email: email} });
    console.log("userCount exists :" + userCount);
    return userCount>0;
}

export async function updateUser(payload: GetUserPayload) {
    let user = await getUser(payload.email);
    if (user)
    {
        user.set(payload);
        user = await user.save();
    }
    return user;
}

export async function getUser(email: string) {
    return await User.findOne({where: {email: email}});
}

export async function createUser(payload: AddUserPayload) {
    return await User.create(payload);
}

export function isUserGoodFormat(payload: AddUserPayload) {
    return userValidator.validate(payload);
}

export async function deleteUser(email: string) {
    let user = await getUser(email);
    if (user)
    {
        await user.destroy();
        return "delete with success"
    }

}
