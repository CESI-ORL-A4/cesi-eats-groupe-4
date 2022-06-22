import AccessToken from "./AccessToken";
import RefreshToken from "./RefreshToken";
import User from "./User";

export function setupAssociations() {
    User.hasOne(AccessToken, { 
        foreignKey: {
            name: "email",
            allowNull: false,
        },
        sourceKey: "email",
        onDelete: "CASCADE"
    });

    User.hasOne(RefreshToken, { 
        foreignKey: {
            name: "email",
            allowNull: false,
        },
        sourceKey: "email",
        onDelete: "CASCADE"
    });
}
