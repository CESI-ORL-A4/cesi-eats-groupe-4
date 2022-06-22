
import { DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../db/DBConnection";
import User from "./User";

class RefreshToken extends Model<InferAttributes<RefreshToken>, InferCreationAttributes<Model>> {
    declare id: number | undefined;
    declare email: ForeignKey<User["email"]>;
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
            tableName: "RefreshTokens"
        }
    );

}

export function syncRefreshToken(force?: boolean) {
    RefreshToken.sync({ force: !!force });
}

export default RefreshToken;
