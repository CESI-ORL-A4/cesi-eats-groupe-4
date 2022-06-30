import proxy from "express-http-proxy";

export function getServiceProxy(host: string, port: string) {
    if (process.env.USE_HOST_AS_FULL_URL) {
        if (host) {
            return proxy(`http://${host}`);
        }
    }
    return proxy(`${host}:${port}`);
}
