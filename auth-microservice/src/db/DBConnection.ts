import { Sequelize } from "sequelize";

const sequelize = new Sequelize("AUTH_DB", "sa", process.env.AUTH_SERVICE_DB_PASSWORD, {
    host: process.env.AUTH_SERVICE_DB_HOST || "auth-service-db",
    dialect: "mssql"
})

export default sequelize;
