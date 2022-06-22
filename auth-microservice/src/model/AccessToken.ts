import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../DBConnection";

class AccessToken extends Model<InferAttributes<AccessToken>, InferCreationAttributes<Model>> {
    declare id: number | undefined;
    declare email: string;
    declare token: string;
}

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

AccessToken.sync({ force: true });

export default AccessToken;
