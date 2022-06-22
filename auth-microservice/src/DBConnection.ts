import { Sequelize } from "sequelize";

const sequelize = new Sequelize("AUTH_DB", "sa", process.env.AUTH_SERVICE_DB_PASSWORD, {
    host: "localhost",
    dialect: "mssql"
})

//sequelize.authenticate().then(() => {
//    console.log("Database connection successful");
//}).catch((error) => console.log("Unable to connect to the database", error));

export default sequelize;
