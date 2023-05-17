import User from "../model/user";
import UserAttributes from "../types/user/UserAttributes";
import userValidator from "../validator/userValidator";
import RabbitMQ from "../rabbitmq/RabbitMQ";
import QueueName from "../rabbitmq/Queues";

export async function userExistsByMail(email: string) {
    const userCount = await User.count({ where: { email: email} });
    return userCount>0;
}

export async function userExistsById(id: number) {
    const userCount = await User.count({ where: { id } });
    return userCount>0;
}

export async function updateUser(payload: any) {
    const [updatedUser, created] = await User.upsert(payload);
    RabbitMQ.getInstance().then(rabbit => rabbit.send(QueueName.UPDATE_USER, JSON.stringify({
        userId: updatedUser.id,
        ...payload
    })));
    return [updatedUser, created];
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

export async function createUser(payload: UserAttributes) {
    const user = await User.create(payload);
    RabbitMQ.getInstance().then(rabbit => rabbit.send(QueueName.NEW_USER, JSON.stringify({
        userId: user.id,
        email: user.email,
        password: payload.password,
        role: payload.role
    })));
    return user;
}

export function isUserGoodFormat(payload: UserAttributes) {
    return userValidator.validate(payload);
}

export async function deleteUser(id: number) {
    const deletedUser = await User.destroy({ where: { id } });
    RabbitMQ.getInstance().then(rabbit => rabbit.send(QueueName.DELETE_USER, JSON.stringify({
        userId: id
    })));
    return deletedUser;
}
