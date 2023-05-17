import mongoose from "mongoose";

type UpdateArticlePayload = {
    name: string|undefined;
    address: string|undefined;
    _id: mongoose.Types.ObjectId|undefined;
    description: string|undefined;
    imageName: string|undefined;
    imageData: {}|undefined;
    image: string|undefined;
}


export default UpdateArticlePayload;
