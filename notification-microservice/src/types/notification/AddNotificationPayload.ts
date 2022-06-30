type AddNotificationPayload = {
    createdAt: Date|null;
    userId: string,
    description: string,
    read: boolean|null,
}

export default AddNotificationPayload;
