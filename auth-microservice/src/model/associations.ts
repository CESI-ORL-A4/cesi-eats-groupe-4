import AccessToken from "./AccessToken";
import RefreshToken from "./RefreshToken";
import User from "./User";

export function setupAssociations() {
    User.hasOne(AccessToken, { 
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
        sourceKey: "userId",
        onDelete: "CASCADE"
    });

    User.hasOne(RefreshToken, { 
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
        sourceKey: "userId",
        onDelete: "CASCADE"
    });
}
