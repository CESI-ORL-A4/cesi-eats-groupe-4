import User from "../model/user";
import RegisterUserPayload from "../types/user/RegisterUserPayload";
import userValidator from "../validator/userValidator";
import GetUserPayload from "../types/user/GetUserPayload";

export async function userExistsByMail(email: string) {
    const userCount = await User.count({ where: { email: email} });
    return userCount>0;
}

export async function userExistsById(id: number) {
    const userCount = await User.count({ where: { id } });
    return userCount>0;
}

export async function updateUser(payload: GetUserPayload) {
    return await User.upsert(payload);
}

export async function getAllUsers() {
    return await User.findAll();
}

export async function getUserByMail(email: string) {
    return await User.findOne({where: {email: email}});
}

export async function getUserById(id: number) {
    return await User.findOne({where: { id }});
}

export async function createUser(payload: RegisterUserPayload) {
    return await User.create(payload);
}

export function isUserGoodFormat(payload: RegisterUserPayload) {
    return userValidator.validate(payload);
}

export async function deleteUser(id: number) {
    return await User.destroy({ where: { id } });
}
