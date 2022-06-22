import {DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model, NonAttribute} from "sequelize";
import sequelize from "../DBConnection";

class User extends Model<InferAttributes<User>, InferCreationAttributes<Model>> {
    declare id: number | undefined;
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare phone: string;
    declare birthdate: Date;
    declare address : string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize: sequelize,
        tableName: "Users"
    }
);

User.sync({ force: false });

export default User;
