import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../db/DBConnection";
import User from "./User";

class AccessToken extends Model<InferAttributes<AccessToken>, InferCreationAttributes<Model>> {
    declare id: number | undefined;
    declare email: ForeignKey<User["email"]>;
    declare token: string;
}

export function initAccessToken() {
    AccessToken.init(
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
            token: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize: sequelize,
            tableName: "AccessTokens"
        }
    );
}

export function syncAccessToken(force?: boolean) {
    AccessToken.sync({ force: !!force });
}

export default AccessToken;
