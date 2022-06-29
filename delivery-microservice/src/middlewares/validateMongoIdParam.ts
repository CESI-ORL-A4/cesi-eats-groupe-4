import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

export default function() {
    return (req: Request, res: Response, next: NextFunction) => {
        if (isValidObjectId(req.params.id)) {
            return next();
        }
        return res.status(400).json({ error: "The given ID format is not correct" });
    }
}
