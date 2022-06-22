import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../db/DBConnection";
import AccessToken from "./AccessToken";
import Role from "./Role";

class User extends Model<InferAttributes<User>, InferCreationAttributes<Model>> {
    declare id: number | undefined;
    declare email: string;
    declare password: string;
    declare role: Role;
}

export function initUser() {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            role: {
                type: DataTypes.ENUM(...Object.values(Role))
            }
        },
        {
            sequelize: sequelize,
            tableName: "Users"
        }
    );
}

export function syncUser(force?: true) {
    User.sync({ force: !!force })
}

export default User;
