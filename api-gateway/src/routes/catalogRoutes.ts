import express from "express";
import Role from "../auth/Role";
import authCheck from "../auth/secure";
import { getServiceProxy } from "../utils/services";

function setupCatalogRoutes(app: express.Express) {
    const ordersProxy = getServiceProxy(
        process.env.CATALOG_SERVICE_API_HOST,
        process.env.CATALOG_SERVICE_API_PORT
    )

    app.get("/catalog/restaurants/", ordersProxy);
    app.get("/catalog/restaurants/:restaurantId/", ordersProxy);
    app.get("/catalog/restaurants/ownerId/:ownerId",authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]), ordersProxy);
    app.post("/catalog/restaurants/", authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]), ordersProxy);
    app.put("/catalog/restaurants/:restaurantId/", authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]), ordersProxy);
    app.delete("/catalog/restaurants/:restaurantId/", authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]), ordersProxy);

    app.get("/catalog/restaurants/restaurantId/articles/", ordersProxy);
    app.get("/catalog/restaurants/:restaurantId/articles/:articleId/", ordersProxy);
    app.post("/catalog/restaurants/:restaurantId/articles/", authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]), ordersProxy);
    app.put("/catalog/restaurants/:restaurantId/articles/:articleId/", authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]), ordersProxy);
    app.delete("/catalog/restaurants/:restaurantId/articles/:articleId/", authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]), ordersProxy);

    app.get("/catalog/restaurants/restaurantId/menus/", ordersProxy);
    app.get("/catalog/restaurants/:restaurantId/menus/:menuId/", ordersProxy);
    app.post("/catalog/restaurants/:restaurantId/menus/", authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]), ordersProxy);
    app.put("/catalog/restaurants/:restaurantId/menus/:menuId/", authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]), ordersProxy);
    app.delete("/catalog/restaurants/:restaurantId/menus/:menuId/", authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]), ordersProxy);

}

export default setupCatalogRoutes;
