import Role from "../../model/Role";

type TokenPayload = {
    id: number;
    email: string;
    role: Role;
}

export default TokenPayload;
