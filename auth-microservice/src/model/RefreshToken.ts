
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../DBConnection";

class RefreshToken extends Model<InferAttributes<RefreshToken>, InferCreationAttributes<Model>> {
    declare id: number | undefined;
    declare email: string;
    declare token: string;
}

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

RefreshToken.sync({ force: true });

export default RefreshToken;
