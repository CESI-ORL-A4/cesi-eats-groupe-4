import {Router} from "express";
import {body} from "express-validator";
import Role from "../model/Role";

export default function (limitedRoles?: string[]) {
    const router = Router();
    router.use(body("email").isEmail());
    router.use(body("password").isString());
    const rolesList = limitedRoles ? limitedRoles : Object.values(Role);
    router.use(body("role").isIn(rolesList));
    return router;
};