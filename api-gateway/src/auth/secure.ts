import { NextFunction, Request, Response } from "express";
import axios from "axios";
import Role from "./Role";

const authServiceHost = process.env.AUTH_SERVICE_API_HOST;
const authServicePort = process.env.AUTH_SERVICE_API_PORT;
const authServicePrefix = authServiceHost === "localhost" ? "http" : "http";
const authServiceSecureURL = `${authServicePrefix}://${authServiceHost}:${authServicePort}/auth/secure`;

function authCheck(allowedRoles?: Role[]) {
    return async function(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await axios.get(authServiceSecureURL, {
                headers: {
                    "Authorization": req.headers["authorization"]
                }
            });

            const role = response.data.role;
            if (allowedRoles && !allowedRoles.includes(role)) {
                return res.status(403).json({ error: "Forbidden" });
            }

            return next();
        } catch(error) {
            return res.status(error.response.status).json(error.response.data);
        }
    }
}

export default authCheck;
