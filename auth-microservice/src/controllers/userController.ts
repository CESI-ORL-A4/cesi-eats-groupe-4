import { compare, hash } from "bcrypt";
import User from "../model/User";
import RegisterUserPayload from "../types/user/RegisterUserPayload";

export async function userExists(email: string) {
    const userCount = await User.count({ where: { email } });
    return !!userCount;
}

export async function getUser(email: string) {
    return await User.findOne({ where: { email } })
}

export async function createUser(payload: RegisterUserPayload) {
    payload.password = await hash(payload.password, 10);
    const addedUser = await User.create(payload);
    return addedUser;
} 

export async function validateUserPassword(user: User, password: string) {
    return await compare(password, user.password);
}

export async function getAllUsers() {
    return await User.findAll();
}
 
export async function deleteUser(email: string) {
    await User.destroy({ where: { email } });
}
