import notificationValidator from "../validators/notification/notificationValidator";
import notificationModel from "../model/notificationModel";
import AddNotificationPayload from "../types/notification/AddNotificationPayload";
import NotificationType from "../types/notification/NotificationType";

export async function notificationExist(notificationId: string) {
    return await notificationModel.count({ notificationId}) >0;
}

export async function getNotificationByUserId(userId: string): Promise<NotificationType[]> {
    return await notificationModel.find({userId: userId}).exec();
}

export async function getCountNotificationUnread(userId: string): Promise<NotificationType[]> {
    return await notificationModel.count({userId: userId,read:false}).exec();
}

export async function getNotification(notificationId: string) {
    return await notificationModel.find({_id: notificationId});
}

export async function getNotifications() {
    return await notificationModel.find();
}

export async function updateReadNotification(notificationId: string){
    return await notificationModel.updateOne({_id: notificationId}, {$set:{read: true}})
}

export async function createNotification(payload: AddNotificationPayload) {
    if(!payload.read)
        payload.read = false;
    if(!payload.createdAt)
        payload.createdAt = new Date();
    const notification = new notificationModel(payload)
    await notification.save();
    return notification;
}

export function isNotificationGoodFormat(payload: AddNotificationPayload) {
    return notificationValidator.validate(payload);
}

export async function deleteNotification(notificationId: string) {
    await notificationModel.deleteOne({ _id: notificationId });
    return notificationId;
}

export async function deleteNotificationsByUserId(userId: string) {
    await notificationModel.delete({ userId: userId });
    return userId;
}

export async function makeUserNotificationRead(userId: string) {
    const notifications:any = await getNotificationByUserId(userId);
    if (Array.isArray(notifications))
        notifications.forEach(async notification => await updateReadNotification(notification._id));
    else
        await updateReadNotification(notifications._id)

    return userId;
}
