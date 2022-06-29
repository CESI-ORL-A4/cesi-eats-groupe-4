import mongoose from "mongoose";

export type MongoID = mongoose.Types.ObjectId;

export function mongoIDFromString(id: string) {
    return new mongoose.Types.ObjectId(id);
}
