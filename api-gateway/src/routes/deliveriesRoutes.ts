import express from "express";
import Role from "../auth/Role";
import authCheck from "../auth/secure";
import { getServiceProxy } from "../utils/services";

function setupDeliveriesRoutes(app: express.Express) {
    const deliveriesProxy = getServiceProxy(
        process.env.DELIVERY_SERVICE_API_HOST,
        process.env.DELIVERY_SERVICE_API_PORT
    )

    app.get("/deliveries", authCheck([Role.DELIVERER, Role.COMMERCIAL, Role.TECHNIC]), deliveriesProxy);
    app.get("/deliveries/:id", authCheck([Role.DELIVERER, Role.COMMERCIAL, Role.TECHNIC]), deliveriesProxy);
    app.get("/deliverers/:id/deliveries", authCheck([Role.DELIVERER, Role.COMMERCIAL, Role.TECHNIC]), deliveriesProxy);
    app.get("/deliverers/:id/deliveries/under-shipment", authCheck([Role.DELIVERER, Role.COMMERCIAL, Role.TECHNIC]), deliveriesProxy);
    app.get("/deliverers/:id/deliveries/delivered", authCheck([Role.DELIVERER, Role.COMMERCIAL, Role.TECHNIC]), deliveriesProxy);
    app.get("/deliverers/:id/deliveries/picked-up", authCheck([Role.DELIVERER, Role.COMMERCIAL, Role.TECHNIC]), deliveriesProxy);

    app.post("/deliveries", authCheck([Role.DELIVERER]), deliveriesProxy);
    app.post("/deliveries/:id/delivered", authCheck([Role.DELIVERER]), deliveriesProxy);

    app.delete("/deliveries/:id", authCheck([Role.DELIVERER, Role.COMMERCIAL, Role.TECHNIC]), deliveriesProxy);
}

export default setupDeliveriesRoutes;
