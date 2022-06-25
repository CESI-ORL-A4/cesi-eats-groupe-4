import proxy from "express-http-proxy";

export function getServiceProxy(host: string, port: string) {
    return proxy(`${host}:${port}`);
}
