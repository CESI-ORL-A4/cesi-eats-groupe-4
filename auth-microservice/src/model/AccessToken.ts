import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../db/DBConnection";
import User from "./User";

class AccessToken extends Model<InferAttributes<AccessToken>, InferCreationAttributes<Model>> {
    declare id: number | undefined;
    declare userId: ForeignKey<User["userId"]>;
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
            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
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
            tableName: "AccessTokens",
            timestamps: false
        }
    );
}

export async function syncAccessToken(force?: boolean) {
    await AccessToken.sync({ force: !!force });
}

export default AccessToken;
