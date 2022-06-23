import Role from "../../model/Role";

type UserAttributesPayload = {
    email: string;
    password: string;
    role: Role;
}

export default UserAttributesPayload;
