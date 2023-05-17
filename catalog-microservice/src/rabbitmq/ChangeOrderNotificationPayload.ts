type ChangeOrderNotificationPayload = {
    restaurantId: string;
    userId: string,
    ownerId: string|null;
    state: string,
}

export default ChangeOrderNotificationPayload;
