import User from "../model/User";
import RegisterUserPayload from "../types/user/RegisterUserPayload";

export async function userExists(email: string, password: string) {
    const userCount = await User.count({ where: { email, password } });
    return !!userCount;
}

export async function getUser(email: string, password: string) {
    return await User.findOne({ where: { email, password } })
}

export async function createUser(payload: RegisterUserPayload) {
    const addedUser = await User.create(payload);
    return addedUser;
} 
