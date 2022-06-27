import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";

export interface ReqWithBody<T> extends Request {
    body: T;
}

export interface ReqWithBodyAndParams<P extends ParamsDictionary, B> extends ReqWithBody<B> {
    params: P;
}
