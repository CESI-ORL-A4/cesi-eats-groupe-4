import { Request } from "express";

export interface ReqWithBody<T> extends Request {
    body: T;
}

// @ts-ignore
export interface ReqWithParams<T> extends Request {
    params: T;
}
