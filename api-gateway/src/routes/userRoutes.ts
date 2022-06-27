import express from "express";
import Role from "../auth/Role";
import authCheck from "../auth/secure";
import { getServiceProxy } from "../utils/services";

function setupUserRoutes(app: express.Express) {
    const userProxy = getServiceProxy(
        process.env.USER_SERVICE_API_HOST,
        process.env.USER_SERVICE_API_PORT
    )

    app.get("/users", authCheck([Role.COMMERCIAL, Role.TECHNIC]), userProxy);
    app.get("/users/:id", authCheck([Role.COMMERCIAL, Role.TECHNIC]), userProxy);
    app.get("/users/sponsorship/:id", userProxy);

    app.put("/users", userProxy);

    app.post("/users/register", userProxy);
    app.post("/users/sponsorship/:id", userProxy);

    app.delete("/users/:id", authCheck([Role.COMMERCIAL, Role.TECHNIC]), userProxy);
}

export default setupUserRoutes;
