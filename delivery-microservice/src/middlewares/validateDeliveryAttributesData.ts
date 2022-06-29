import { body } from "express-validator";
import { isValidObjectId } from "mongoose";
import validateMongoObjectId from "./validateMongoObjectId";

export default function(optional?: boolean) {
    return [
        body("delivererId").exists().isNumeric(),
        body("orderId").exists().custom(validateMongoObjectId)
    ]
}
