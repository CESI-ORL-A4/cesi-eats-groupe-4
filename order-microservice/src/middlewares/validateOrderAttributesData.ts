import { body } from "express-validator";
import { isValidObjectId } from "mongoose";
import OrderState from "../model/OrderState";
import validateMongoObjectId from "./validateMongoObjectId";

export default function(optional?: boolean) {
    if (optional) {
        return [
            body("restaurantId").optional().custom(validateMongoObjectId),
            body("userId").optional().custom(validateMongoObjectId),
            body("menuIds").optional().isArray().custom(value => {
                if (!value.every((value: any) => isValidObjectId(value))) {
                    throw new Error('Array should only contains mongo ObjectID values');
                }
                return true;
            }),
            body("state").optional().isIn(Object.values(OrderState))
        ]
    }

    return [
        body("restaurantId").exists().custom(validateMongoObjectId),
        body("userId").exists().custom(validateMongoObjectId),
        body("menuIds").isArray().custom(value => {
            if (!value.every((value: any) => isValidObjectId(value))) {
                throw new Error('Array should only contains mongo ObjectID values');
            }
            return true;
        })
    ]
}
