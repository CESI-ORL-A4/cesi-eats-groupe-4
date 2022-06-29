import { isValidObjectId } from "mongoose";

export default function(value: any) {
    if (!isValidObjectId(value)) {
        throw new Error("The value should be a valid mongo ObjectID");
    }
    return true;
}
