import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize/types";
import sequelize from "../DBConnection";

class User extends Model<InferAttributes<User>, InferCreationAttributes<Model>> {
    declare id: number | undefined;
    declare email: string;
    declare password: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize: sequelize,
        tableName: "USERS"
    }
);

export default User;
