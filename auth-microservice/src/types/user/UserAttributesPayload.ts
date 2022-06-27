import Role from "../../model/Role";

type UserAttributesPayload = {
    userId: number;
    email: string;
    password: string;
    role: Role;
}

export default UserAttributesPayload;
