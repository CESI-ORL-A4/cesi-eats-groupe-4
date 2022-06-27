import express from "express";
import { getServiceProxy } from "../utils/services";

function setupAuthRoutes(app: express.Express) {
    const authProxy = getServiceProxy(
        process.env.AUTH_SERVICE_API_HOST,
        process.env.AUTH_SERVICE_API_PORT
    )

    app.post("/auth/login", authProxy);
    app.delete("/auth/logout", authProxy);
    app.post("/auth/refresh", authProxy);
}

export default setupAuthRoutes;
