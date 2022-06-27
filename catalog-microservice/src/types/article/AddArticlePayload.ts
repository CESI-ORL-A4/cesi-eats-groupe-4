import {Types} from "mongoose";

type AddArticlePayload = {
    _id: Types.ObjectId|undefined;
    name: string;
    type: string;
    price: string|undefined;
    currency: string|undefined;
    description: string|undefined;
    imageName: string|undefined;
    imageData: {}|undefined;
}

export default AddArticlePayload;
