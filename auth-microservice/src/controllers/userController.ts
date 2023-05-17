import { compare, hash } from "bcrypt";
import User from "../model/User";
import UserAttributesPayload from "../types/user/UserAttributesPayload";

export async function userExistsByEmail(email: string) {
    const userCount = await User.count({ where: { email } });
    return !!userCount;
}

export async function userExistsById(userId: number) {
    const userCount = await User.count({ where: { userId } });
    return !!userCount;
}

export async function getUserByEmail(email: string) {
    return await User.findOne({ where: { email } })
}

export async function createUser(payload: UserAttributesPayload) {
    payload.password = await hash(payload.password, 10);
    const addedUser = await User.create(payload);
    return addedUser;
} 

export async function updateUser(payload: UserAttributesPayload) {
    if (payload.password) {
        payload.password = await hash(payload.password, 10);
    }
    return await User.upsert(payload);
}

export async function validateUserPassword(user: User, password: string) {
    return await compare(password, user.password);
}

export async function getAllUsers() {
    return await User.findAll();
}
 
export async function deleteUser(userId: number) {
    await User.destroy({ where: { userId } });
}
