import express from "express";
import Role from "../auth/Role";
import authCheck from "../auth/secure";
import { getServiceProxy } from "../utils/services";

function setupCatalogRoutes(app: express.Express) {
  const catalogProxy = getServiceProxy(
    process.env.CATALOG_SERVICE_API_HOST,
    process.env.CATALOG_SERVICE_API_PORT
  );

  app.get("/catalog/restaurants/", catalogProxy);
  app.get("/catalog/restaurants/:restaurantId/", catalogProxy);
  app.get(
    "/catalog/restaurants/ownerId/:ownerId",
    authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]),
    catalogProxy
  );
  app.post(
    "/catalog/restaurants/",
    authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]),
    catalogProxy
  );
  app.put(
    "/catalog/restaurants/:restaurantId/",
    authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]),
    catalogProxy
  );
  app.delete(
    "/catalog/restaurants/:restaurantId/",
    authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]),
    catalogProxy
  );

  app.get("/catalog/restaurants/:restaurantId/articles/", catalogProxy);
  app.get(
    "/catalog/restaurants/:restaurantId/articles/:articleId/",
    catalogProxy
  );
  app.post(
    "/catalog/restaurants/:restaurantId/articles/",
    authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]),
    catalogProxy
  );
  app.put(
    "/catalog/restaurants/:restaurantId/articles/:articleId/",
    authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]),
    catalogProxy
  );
  app.delete(
    "/catalog/restaurants/:restaurantId/articles/:articleId/",
    authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]),
    catalogProxy
  );

  app.get("/catalog/restaurants/:restaurantId/menus/", catalogProxy);
  app.get("/catalog/restaurants/:restaurantId/menus/:menuId/", catalogProxy);
  app.post(
    "/catalog/restaurants/:restaurantId/menus/",
    authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]),
    catalogProxy
  );
  app.put(
    "/catalog/restaurants/:restaurantId/menus/:menuId/",
    authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]),
    catalogProxy
  );
  app.delete(
    "/catalog/restaurants/:restaurantId/menus/:menuId/",
    authCheck([Role.COMMERCIAL, Role.TECHNIC, Role.OWNER]),
    catalogProxy
  );
}

export default setupCatalogRoutes;
