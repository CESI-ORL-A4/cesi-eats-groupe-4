import Role from "../../model/Role";

type RegisterUserPayload = {
    email: string;
    password: string;
    role: Role;
}

export default RegisterUserPayload;
