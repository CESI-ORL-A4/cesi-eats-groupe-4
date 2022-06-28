import express from "express";
import Role from "../auth/Role";
import authCheck from "../auth/secure";
import { getServiceProxy } from "../utils/services";

function setupUsersRoutes(app: express.Express) {
    const usersProxy = getServiceProxy(
        process.env.USER_SERVICE_API_HOST,
        process.env.USER_SERVICE_API_PORT
    )

    app.get("/users", authCheck([Role.COMMERCIAL, Role.TECHNIC]), usersProxy);
    app.get("/users/:id", authCheck([Role.COMMERCIAL, Role.TECHNIC]), usersProxy);
    app.get("/users/sponsorship/:id", usersProxy);

    app.put("/users/:id", usersProxy);

    app.post("/users/register", usersProxy);
    app.post("/users/sponsorship/:id", usersProxy);

    app.delete("/users/:id", authCheck([Role.COMMERCIAL, Role.TECHNIC]), usersProxy);
}

export default setupUsersRoutes;
