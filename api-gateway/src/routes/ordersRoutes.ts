import express from "express";
import Role from "../auth/Role";
import authCheck from "../auth/secure";
import { getServiceProxy } from "../utils/services";

function setupOrdersRoutes(app: express.Express) {
    const ordersProxy = getServiceProxy(
        process.env.ORDER_SERVICE_API_HOST,
        process.env.ORDER_SERVICE_API_PORT
    )
    app.get("/orders/ready-to-ship", authCheck([Role.DELIVERER, Role.TECHNIC, Role.COMMERCIAL]), ordersProxy);
    app.get("/orders/:id", authCheck(), ordersProxy);
    app.get("/users/:id/orders", authCheck(), ordersProxy);
    app.get("/restaurants/:id/orders",
            authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]),
            ordersProxy);
    app.get("/restaurants/:id/orders/in-process",
            authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]),
            ordersProxy);
    app.get("/restaurants/:id/orders/history",
        authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]),
        ordersProxy);

    app.put("/orders/:id", authCheck(), ordersProxy);

    app.post("/orders", authCheck(), ordersProxy);
    app.get("/orders",authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]), ordersProxy);

    app.delete("/orders/:id", authCheck([Role.COMMERCIAL, Role.TECHNIC]), ordersProxy);
}

export default setupOrdersRoutes;
