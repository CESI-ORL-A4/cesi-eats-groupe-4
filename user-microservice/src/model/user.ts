import {DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import sequelize from "../DBConnection";

class User extends Model<InferAttributes<User>, InferCreationAttributes<Model>> {
    declare id: number | undefined;
    declare firstName: string;
    declare lastName: string;
    declare email: string;
    declare phone: string;
    declare birthdate: Date;
    declare address : string;
    declare sponsorship: Date | undefined;
}

export async function initUser() {
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
            sponsorship: {
                type: DataTypes.DATE,
                allowNull: true
            },
        },
        {
            sequelize: sequelize,
            tableName: "Users"
        }
    );
    await User.sync({ force: false });
}


export default User;
