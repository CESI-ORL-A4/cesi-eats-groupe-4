import User from "../model/User";
import RegisterUserPayload from "../types/user/RegisterUserPayload";

export async function userExists(email: string, password: string) {
    const userCount = await User.count({ where: { email: email, password: password } });
    return !!userCount;
}

export async function createUser(payload: RegisterUserPayload) {
    const addedUser = await User.create(payload);
    return addedUser;
} 
