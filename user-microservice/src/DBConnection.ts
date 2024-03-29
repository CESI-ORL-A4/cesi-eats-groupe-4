import { Sequelize } from "sequelize";

const sequelize = new Sequelize("USER_DB", "sa", process.env.USER_SERVICE_DB_PASSWORD, {
    host: process.env.USER_SERVICE_DB_HOST || "user-service-db",
    dialect: "mssql"
})

export default sequelize;
