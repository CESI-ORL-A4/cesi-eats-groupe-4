
import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../db/DBConnection";
import User from "./User";

class RefreshToken extends Model<InferAttributes<RefreshToken>, InferCreationAttributes<Model>> {
    declare id: number | undefined;
    declare userId: ForeignKey<User["userId"]>;
    declare token: string;
}

export function initRefreshToken() {
    RefreshToken.init(
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
            tableName: "RefreshTokens",
            timestamps: false
        }
    );

}

export async function syncRefreshToken(force?: boolean) {
    await RefreshToken.sync({ force: !!force });
}

export default RefreshToken;
