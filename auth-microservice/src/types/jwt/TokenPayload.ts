import Role from "../../model/Role";

type TokenPayload = {
    email: string;
    role: Role;
}

export default TokenPayload;
