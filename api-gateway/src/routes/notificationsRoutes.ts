import express from "express";
import { getServiceProxy } from "../utils/services";

function setupNotificationsRoutes(app: express.Express) {
    const notificationsProxy = getServiceProxy(
        process.env.NOTIFICATION_SERVICE_API_HOST,
        process.env.NOTIFICATION_SERVICE_API_PORT
    )

    app.get("/users/:userId/notifications/", notificationsProxy);
    app.post("/users/:userId/notifications/makeread/", notificationsProxy);
    app.delete("/users/:userId/notifications/", notificationsProxy);

    app.get("/notifications/:notificationId/", notificationsProxy);
    app.delete("/notifications/:notificationId/", notificationsProxy);
    app.post("/:notificationId/makeread/", notificationsProxy);
    app.post("/notifications/", notificationsProxy);
}

export default setupNotificationsRoutes;
